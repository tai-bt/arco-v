<template>
  <div style="height: 2000px;">
    <p @click="getFn">获取</p>
    <p @click="getFn1">获取1</p>
    <p class="loading" v-axios-loading="['/brandArchives/getInternalBrandList', '/api/queryAllCgList']">
      skdhjgfksjhfkjasdhkj
      
      <p style="width: 100px; height: 100px; background-color: aqua;" v-axios-loading="'/api/queryAllCgList'">2222222222</p>
    </p>
    <p>skdjhfksj</p>

    <a-button @click="disabled = !disabled">点击</a-button>
    <a-input v-model="inputModel" allow-clear :disabled="disabled" v-axios-loading="'/api/queryAllCgList'"></a-input>

    <a-table :columns="columns" class="t-mt12" v-axios-loading="'/api/queryAllCgList'">
 
    </a-table>

    <p>{{ count }}</p>
    <a-button @click="increment">加</a-button>
    <a-button @click="decrement">减</a-button>

    <p v-axios-loading>{{ $t('self.hello') }}</p>
    <p v-axios-loading>{{ $t('self.welcome') }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import axiosInstance from '@/axios'
import { useCounterStore } from '@/stores/modules/data';

const counterStore:any = useCounterStore()
const { increment, decrement } = counterStore
const count = computed(() => {
  return counterStore.count
})

const inputModel = ref<any>('')
const disabled = ref<boolean>(false)

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