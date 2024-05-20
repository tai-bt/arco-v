<template>
  <div>
    <p @click="getFn">获取</p>
    <p class="loading" v-axios-loading="'/brandArchives/getInternalBrandList'">
      skdhjgfksjhfkjasdhkj
    </p>
    <p>skdjhfksj</p>

    <a-input v-axios-loading="'/brandArchives/getInternalBrandList'"></a-input>

    <a-table :columns="columns" class="t-mt12" v-axios-loading="'/brandArchives/getInternalBrandList'">
 
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
  })
}
getFn()

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