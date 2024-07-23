<template>
    <div>
        <input type="file" id="upload-file" accept=".docx,application/pdf,image/*">
    </div>
</template>

<script setup lang="ts">
import PizZip from 'pizzip';
import Docxtemplater from 'docxtemplater';
import { PDFDocument } from 'pdf-lib';
import imageCompression from 'browser-image-compression';
import { nextTick } from 'vue'

nextTick(() => {
    document.getElementById('upload-file')?.addEventListener('change', async (event:any) => {
        const file = event.target.files[0];
        console.log(file);
        const fileType = file.type;

        if (fileType.startsWith('image/')) {
            // 压缩图像文件
            const options = {
                maxSizeMB: 1,
                maxWidthOrHeight: 1920,
                useWebWorker: true
            };
            try {
                const compressedFile = await imageCompression(file, options);
                console.log(compressedFile);
            } catch (error) {
                console.error(error);
            }
        } else if (fileType === 'application/pdf') {
            // 压缩PDF文件
            const arrayBuffer = await file.arrayBuffer();
            console.log(arrayBuffer);
            const pdfDoc = await PDFDocument.load(arrayBuffer);
            console.log(pdfDoc)
            const pdfBytes = await pdfDoc.save({ useObjectStreams: false });
            console.log(pdfBytes);

            const compressedFile = new Blob([pdfBytes], { type: 'application/pdf' });
            console.log(compressedFile);
        } else if (fileType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            // 压缩Word文件
            const reader = new FileReader();
            
            reader.onload = function (e:any) {
                const content = e.target.result;
                const zip = new PizZip(content);
                const doc = new Docxtemplater(zip);
                
                const out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                });

                console.log(out);
            };
            
            reader.readAsArrayBuffer(file);
        } else {
            console.error('Unsupported file type');
        }
    });
})

</script>

<style scoped>

</style>