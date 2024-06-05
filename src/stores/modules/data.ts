import { defineStore } from 'pinia'
import piniaPersistConfig from './piniaPersist'

export const useCounterStore = defineStore({
    id: 'data',
    state: () => ({
        count: 0,
    }),
    actions: {
        increment() {
            this.count++
        },
        decrement() {
            this.count--
        },
    },
    getters: {
        doubleCount: (state) => {
            return state.count * 2
        },
    },
    persist: piniaPersistConfig('store-data'),
})