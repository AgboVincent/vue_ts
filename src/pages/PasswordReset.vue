<template>
  <p class="text-2xl font-bold text-text-dark">Create new password</p>
  <p class="text-text-dark">Your new password must be different from your previously used passwords.</p>
  <TextField label="Password" placeholder="********" type="password" class="mb-12"/>
  <TextField label="Password Confirmation" placeholder="********" type="password" class="mb-12"/>

  <v-btn block to="/password-reset-success">Reset Password</v-btn>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import TextField from "../components/TextField.vue";

export default defineComponent({
  name: 'PasswordReset',
  components: {TextField}
})
</script>
