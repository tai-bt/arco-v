import { defineStore } from 'pinia'
import piniaPersistConfig from './piniaPersist'

export const globalCounterStore = defineStore({
    id: 'global-config',
    state: () => ({
        language: 'zh'
    }),
    actions: {
        setGlobalState(...args:any) {
            this.$patch({ [args[0]]: args[1] });
        }
    },
    getters: {
        doubleCount: (state) => {
            // return state.count * 2
        },
    },
    persist: piniaPersistConfig('store-global-config'),
})