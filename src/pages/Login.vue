<template>
  <v-main class="bg-secondary">
    <div class="bg-white">
      <div class="container h-[80px] mx-auto flex items-center pl-10">
        <v-img src="/images/logo.png" alt="Logo" class="w-[140px] h-auto flex-initial"/>
      </div>
    </div>
    <div class="min-h-screen container mx-auto grid place-items-center">
      <div class="border rounded p-14 bg-white w-1/3">
        <p class="text-2xl font-bold">Welcome back</p>
        <p class="text-">Enter your login details to proceed</p>
        <TextField label="Email Address" placeholder="john.doe@gmail.com" icon="mdi-email-outline"/>
        <TextField label="Password" placeholder="********" icon="mdi-email-outline" type="password"/>
        <p class="text-text-dark pt-8 mb-12">Forgot Password?</p>

        <v-btn block>Login to your account</v-btn>
      </div>
    </div>
  </v-main>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TextField from "../components/TextField.vue";

export default defineComponent({
  name: 'Login',
  components: {TextField}
})
</script>
