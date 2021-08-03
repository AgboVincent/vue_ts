<template>
  <v-main class="bg-secondary">
    <div class="bg-white">
      <div class="container h-[80px] mx-auto flex items-center pl-10">
        <v-img src="/images/logo.png" alt="Logo" class="w-[140px] h-auto flex-initial"/>
      </div>
    </div>
    <div class="min-h-screen container mx-auto grid place-items-center">
      <div class="border rounded p-14 bg-white w-1/3">
        <router-view/>
      </div>
    </div>
  </v-main>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'GuestLayout'
})
</script>
