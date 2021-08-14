<template>
  <h1>Logging out...</h1>
</template>
<script lang="ts">
import {useStore} from "../store";
import {defineComponent} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  setup() {
    const {dispatch} = useStore(),
        {push} = useRouter()

    dispatch('logout')
        .then(() => push('/login'))
  }
})
</script>
