<template>
  <div>
    <p @click="getFn">获取</p>
    <p @click="getFn1">获取1</p>
    <p class="loading" v-axios-loading="['/brandArchives/getInternalBrandList', '/api/queryAllCgList']">
      skdhjgfksjhfkjasdhkj
      
      <p style="width: 100px; height: 100px; background-color: aqua;" v-axios-loading="'/api/queryAllCgList'">2222222222</p>
    </p>
    <p>skdjhfksj</p>

    <a-input></a-input>

    <a-table :columns="columns" class="t-mt12">
 
    </a-table>
  </div>
</template>

<script setup lang="ts">
import axiosInstance from '@/axios'

const getFn = () => {
  axiosInstance.post('/brandArchives/getInternalBrandList', {
    pageNo: 1,
    pageSize: 20,
    key: ''
  }).then((res) => {
    console.log(res)
  }).catch((error) => {
    console.log(error, 'error')
  })
}
// getFn()

const getFn1 = () => {
  axiosInstance.post('/api/queryAllCgList').then((res) => {
    console.log(res)
  }).catch((error) => {
    console.log(error, 'error')
  })
}

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Salary',
    dataIndex: 'salary',
  },
  {
    title: 'Address',
    dataIndex: 'address',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
]

</script>

<style scoped>
.loading {
  width: 200px;
  height: 200px;
  background-color: aliceblue;
}
</style>