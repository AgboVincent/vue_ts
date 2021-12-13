import {createStore, Store, useStore as useVuexStore} from 'vuex'
import {InjectionKey} from "vue";
import {CustomerType} from "./types";
import {router} from "./router";

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
        authRequestFinished: false,
        profile: {
            first_name: ''
        }
    },
    mutations: {
        updateProfile: (state, data) => state.profile = data,
        authenticate: (state, authenticated) => state.authenticated = authenticated,
        authRequestFinished: (state, authenticated) => state.authRequestFinished = authenticated
    },
    actions: {
        login: ({commit}, payload) => {
            commit('updateProfile', payload.user)
            commit('authenticate', true)
            commit('authRequestFinished', true)
            window.localStorage.setItem('auth', payload.token)
            return true
        },
        logout: ({commit}) => {
            commit('updateProfile', {})
            window.localStorage.removeItem('auth')
            commit('authenticate', false)
            router.push('/login')
            return true
        }
    }
})
