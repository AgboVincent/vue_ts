<template>
  <p class="text-2xl font-bold text-text-dark">Create new password</p>
  <p class="text-text-dark">Your new password must be different from your previously used passwords.</p>
  <form @submit.prevent="sendForm">
    <TextField label="Password" v-model="password" placeholder="********" type="password" class="mb-12"/>
    <TextField label="Password Confirmation" v-model="password_confirmation" placeholder="********" type="password"
               class="mb-12"/>

    <v-btn block type="submit">Reset Password</v-btn>
  </form>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import TextField from "../components/TextField.vue";
import {sendResetPasswordRequest} from "../requests";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  name: 'PasswordReset',
  components: {TextField},
  setup() {
    const password = ref(''),
        password_confirmation = ref(''),
        {query} = useRoute(),
        {push} = useRouter()

    function sendForm() {
      sendResetPasswordRequest(query.token, password.value, password_confirmation.value)
          .then(() => {
            push('/password-reset-success')
          })
          .catch(() => null)
    }

    return {sendForm, password, password_confirmation}
  }
})
</script>
