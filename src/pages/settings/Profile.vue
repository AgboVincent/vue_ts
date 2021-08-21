<template>
  <div class="grid grid-cols-2">
    <p class="text-text text-lg font-medium">Personal Information</p>
    <form action="#" @submit.prevent="saveChanges">
      <div class="grid grid-cols-2 gap-x-2">
        <TextField v-model="profile.first_name" label="First Name" class="!-mt-0" :error="error?.first_name"/>
        <TextField v-model="profile.last_name" label="Last Name" class="!-mt-0" :error="error?.last_name"/>
        <TextField v-model="profile.email" class="col-span-2" label="Email Address" :error="error?.email"/>
        <div class="col-span-2 flex flex-row-reverse pt-[43px]">
          <v-btn type="submit" :disabled="loading">Save Changes</v-btn>
        </div>
      </div>
    </form>
  </div>
</template>
<script lang="ts" setup>
import TextField from "../../components/TextField.vue";
import {onMounted, ref} from 'vue'
import {useStore} from "../../store";
import {updateProfileRequest} from "../../requests";

const { state, commit } = useStore(),
    profile = ref({}),
    loading = ref(false),
    error = ref({})

onMounted(() => setTimeout(() => profile.value = Object.assign({}, state.profile), 100))

function saveChanges() {
  loading.value = true
  error.value = {}

  updateProfileRequest(profile.value)
    .then(({ data }) => {
      console.log(data)
      commit('updateProfile', data)
    })
    .catch(err => {
      error.value = err?.response?.data?.error
    })
  .finally(() => loading.value = false)
}
</script>
