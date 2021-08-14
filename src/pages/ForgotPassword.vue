<template>
  <p class="text-2xl font-bold text-text-dark">Forgot Password</p>
  <p class="text-text-dark">Enter your email associated with your account and we would send an email with instructions
    to reset your password</p>
  <form @submit.prevent="submit">
    <TextField
        label="Email Address"
        v-model="email"
        placeholder="john.doe@gmail.com"
        icon="mdi-email-outline"
        class="mb-12"
    />

    <v-btn type="submit" block>Send Instructions</v-btn>
  </form>
  <v-btn block to="/login" elevation="0" color="white" class="mt-6">Go Back</v-btn>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import TextField from "../components/TextField.vue";
import {sendForgotPasswordRequest} from "../requests";

export default defineComponent({
  name: 'ForgotPassword',
  components: {TextField},
  setup() {
    const email = ref(null)

    function submit() {
      sendForgotPasswordRequest(email.value as string)
          .then(() => alert('Password Mail Sent'))
    }

    return {email, submit}
  }
})
</script>
