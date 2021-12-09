<template>
  <v-app>
    <router-view/>
  </v-app>
</template>

<script lang="ts">
import {defineComponent, nextTick, onMounted} from "vue";
import {useStore} from "./store";
import {getAuthenticatedProfileRequest} from "./requests";

export default defineComponent({
  name: 'App',
  setup() {
    const {dispatch} = useStore()

    onMounted(() => {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      window.localStorage.setItem('auth', token || '');
      
      if(token) {
        console.log('token', token);
      }else{
        console.log('no token');
      }
      
      getAuthenticatedProfileRequest()
          .then(({data: user}) => {
            dispatch('login', {
              user, token: window.localStorage.getItem('auth')
            })
          })
      .catch(() => {
        dispatch('logout')
      })
    })
  }
})
</script>
