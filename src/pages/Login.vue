<template>
  <p class="text-2xl text-text-dark font-bold">Welcome back</p>
  <p class="text-text-dark">Enter your login details to proceed</p>

  <ErrorMessage v-if="showErrorMessage" class="mt-7">
    You entered an incorrect, email, password or both. Need an account? <strong>Sign Up</strong>
  </ErrorMessage>

  <form @submit.prevent="handleLoginButton">
    <TextField
        v-model="email"
        label="Email Address"
        placeholder="john.doe@gmail.com"
        icon="mdi-email-outline"/>
    <TextField
        label="Password"
        v-model="password"
        placeholder="********"
        icon="mdi-lock-outline"
        type="password"/>
    <router-link to="/forgot-password" class="block text-text-dark pt-8 mb-12">Forgot Password?</router-link>

    <v-btn
        block
        type="submit"
        :disabled="loading"
    >
      Login to your account
    </v-btn>
  </form>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import TextField from "../components/TextField.vue";
import {loginRequest} from "../requests";
import {useStore} from "../store";
import {useRouter} from "vue-router";
import ErrorMessage from "../components/ErrorMessage.vue";

export default defineComponent({
  name: 'Login',
  components: {ErrorMessage, TextField},
  setup() {
    const email = ref(''),
        {dispatch} = useStore(),
        password = ref(''),
        loading = ref(false),
        {push} = useRouter(),
        showErrorMessage = ref(false)

    function handleLoginButton() {
      loading.value = true
      showErrorMessage.value = false
      loginRequest(email.value, password.value)
          .then(({data}) => {
            if (data.user.type === 'user') return;
            dispatch('login', data)
                .then(() => push('/dashboard'))
          })
          .catch(() => showErrorMessage.value = true)
          .finally(() => (loading.value = false))
    }

    return {
      handleLoginButton, email, password, loading, showErrorMessage
    }
  }
})
</script>
