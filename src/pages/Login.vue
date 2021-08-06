<template>
  <p class="text-2xl text-text-dark font-bold">Welcome back</p>
  <p class="text-text-dark">Enter your login details to proceed</p>
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

export default defineComponent({
  name: 'Login',
  components: {TextField},
  setup() {
    const email = ref('')
    const {dispatch} = useStore()
    const password = ref('')
    const loading = ref(false)
    const {push} = useRouter()

    function handleLoginButton() {
      loading.value = true
      loginRequest(email.value, password.value)
          .then(({data}) => {
            if (data.user.type === 'user') return;
            dispatch('login', data)
                .then(() => push('/dashboard'))
          })
          .catch(null)
          .finally(() => (loading.value = false))
    }

    return {
      handleLoginButton, email, password,
      loading
    }
  }
})
</script>
