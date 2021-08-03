<template>
  <img :src="'/images/password-reset-success.png'" alt="Password Reset Success Image" class="w-[96px] h-auto mx-auto"/>
  <p class="text-lg font-bold text-text-dark text-center my-4">Password Created</p>
  <p class="text-text-dark text-center">Your password has been successfully reset. </p>

  <v-btn block to="/login" color="white" elevation="0" class="mt-10">Proceed to Login</v-btn>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TextField from "../components/TextField.vue";

export default defineComponent({
  name: 'PasswordResetSuccessful',
})
</script>
