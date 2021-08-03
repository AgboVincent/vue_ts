<template>
  <v-app>
    <Login/>
  </v-app>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Login from "./pages/Login.vue";

export default defineComponent({
  name: 'App',
  components: {Login},
})
</script>
