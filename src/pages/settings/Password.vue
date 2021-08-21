<template>
  <div class="grid grid-cols-2">
    <div>
    <p class="text-text text-lg font-medium pb-2">Change Password</p>
    <p class="text-text text-sm">Your password should be at least 8 characters  and contain a uppercase, lowercase, number and special character</p>
    </div>
    <form class="" @submit.prevent="saveChanges">
      <TextField v-model="currentPassword" label="Current Password" class="!-mt-0" type="password" :error="error?.current_password"/>
      <TextField v-model="newPassword" label="New Password" type="password" :error="error?.new_password"/>
      <TextField v-model="newPasswordConfirmation" class="col-span-2" label="New Password Confirmation" type="password"/>
      <div class="col-span-2 flex flex-row-reverse pt-[43px]">
        <v-btn type="submit" :disabled="loading">Save Changes</v-btn>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import TextField from "../../components/TextField.vue";
import {ref} from 'vue'
import {useStore} from "../../store";
import {updatePasswordRequest} from "../../requests";

const { state } = useStore(),
    loading = ref(false),
    currentPassword = ref(''),
    newPassword = ref(''),
    newPasswordConfirmation = ref(''),
    error = ref({})

function saveChanges() {
  loading.value = true
  updatePasswordRequest(
      currentPassword.value,
      newPassword.value,
      newPasswordConfirmation.value
  )
  .then(() => {
    alert('Password Updated')
    currentPassword.value = ''
    newPassword.value = ''
    newPasswordConfirmation.value = ''
  })
  .catch((err) => {
    error.value = err.response?.data?.error
  })
  .finally(() => loading.value = false)
}
</script>
