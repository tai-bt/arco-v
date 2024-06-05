import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';
import vueSetupExtend from "unplugin-vue-setup-extend-plus/vite";

// import.meta.url 为当前路径
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [
      vue(),
      vueJsx(),
      // name 可以写在 script 标签上
      vueSetupExtend({}),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [
          fileURLToPath(new URL('src/assets/svgIcon/', import.meta.url)),
        ],
        // 指定 symbolId 格式
        symbolId: "icon-[dir]-[name]",
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "@/styles/var.scss";`
        }
      }
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },

    server: {
      host: "0.0.0.0",
      port: 1028,
      open: true,
    }
  }
})
