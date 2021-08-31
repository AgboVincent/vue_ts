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
