<template>
  <p class="text-2xl text-text-dark font-bold">Welcome back</p>
  <p class="text-text-dark">Enter your login details to proceed</p>
  <TextField label="Email Address" placeholder="john.doe@gmail.com" icon="mdi-email-outline"/>
  <TextField label="Password" placeholder="********" icon="mdi-lock-outline" type="password"/>
  <router-link to="/forgot-password" class="block text-text-dark pt-8 mb-12">Forgot Password?</router-link>

  <v-btn block>Login to your account</v-btn>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TextField from "../components/TextField.vue";

export default defineComponent({
  name: 'Login',
  components: {TextField}
})
</script>
