<template>
  <v-main class="bg-secondary">
    
    <v-layout class="row mt-10 mx-15 justify-space-between">
      <div  class="flex items-center">
        <v-img src="/images/curacel_logo.png" alt="Logo" class="w-[30px] h-[30px] flex-initial "/>
        <v-img src="/images/curacel.svg" alt="Logo" class="w-[90px] h-[20px] flex-initial "/>
      </div>
      <div  class="flex">
        <h6 style="color: #7D8299;">Need an account? </h6>
        <h4 class="ml-1" style="color:#1A1AFF; font-weight:600">Sign up</h4>
      </div>
    </v-layout>

    <div class="min-h-screen container mx-auto grid place-items-center">
      <div class=" rounded p-14  w-1/3">
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
