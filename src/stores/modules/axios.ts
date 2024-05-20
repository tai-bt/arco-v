import { defineStore } from 'pinia'
import piniaPersistConfig from './piniaPersist'

export const axiosCounterStore = defineStore({
    id: 'axiosStateMap',
    state: () => ({
        couaxiosStateMapnt: {},
    }),
    actions: {
        addKey(key:any) {
            let obj:any = {...this.couaxiosStateMapnt}
            obj[key] = true
            this.couaxiosStateMapnt = {...obj}
        },
        delKey(key:any) {
            let obj:any = {...this.couaxiosStateMapnt}
            delete obj[key]
            this.couaxiosStateMapnt = {...obj}
        }
    },
    persist: piniaPersistConfig('store-axios'),
})