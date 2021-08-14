import {createStore, Store, useStore as useVuexStore} from 'vuex'
import {InjectionKey} from "vue";
import {CustomerType} from "./types";

export type StoreStateInterface = {
    authenticated: string,
    profile: CustomerType
}

export const key = Symbol() as unknown as InjectionKey<Store<StoreStateInterface>>

export function useStore() {
    return useVuexStore(key)
}

export default createStore({
    state: {
        authenticated: window.localStorage.getItem('auth'),
        profile: {
            first_name: ''
        }
    },
    mutations: {
        updateProfile: (state, data) => state.profile = data,
        authenticate: (state, authenticated) => state.authenticated = authenticated
    },
    actions: {
        login: ({commit}, payload) => {
            commit('updateProfile', payload.user)
            commit('authenticate', true)
            window.localStorage.setItem('auth', payload.token)
            return true
        },
        logout: ({commit}) => {
            commit('updateProfile', {})
            window.localStorage.removeItem('auth')
            commit('authenticate', false)
            return true
        }
    }
})
