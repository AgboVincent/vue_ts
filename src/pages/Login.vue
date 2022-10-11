<template>
  <div>
    <p class="text-2xl text-text-dark font-bold">{{ $t("Welcome back")}}</p>
    <p style="color: #7D8299; font-size:14px">{{ $t("Enter your login details to proceed")}}</p>

    <ErrorMessage v-if="showErrorMessage" class="mt-7">
      {{ $t("You entered an incorrect, email, password or both. Need an account")}}? <strong>{{ $t("Sign Up")}} </strong>
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
      <div  class="flex pt-8 mb-12">
        <p class="mr-1" style="color: #7D8299; font-size:14px">Forgot your password? </p>
        <router-link to="/forgot-password" style="color:#1A1AFF; font-weight:600; font-size:14px" >Reset it here </router-link>
      </div>

      <v-btn
          block
          type="submit"
          :disabled="loading"
          style="background:#1A1AFF;"
      >
        {{ $t("Login to your account")}}
      </v-btn>
    </form>
  </div>
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
