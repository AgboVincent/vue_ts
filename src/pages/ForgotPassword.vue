<template>
  <p class="text-2xl font-bold text-text-dark">Forgot Password</p>
  <p class="text-text-dark">Enter your email associated with your account  and we would send an email with instructions to reset your password</p>
  <TextField label="Email Address" placeholder="john.doe@gmail.com" icon="mdi-email-outline" class="mb-12"/>

  <v-btn block>Send Instructions</v-btn>
  <v-btn block to="/login" elevation="0" color="white" class="mt-6">Go Back</v-btn>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TextField from "../components/TextField.vue";

export default defineComponent({
  name: 'Login',
  components: {TextField}
})
</script>
