<template>
  <AppBar>
    <p class="text-text-dark text-bold text-2xl">
      Claims
      <span class="text-base block text-text pt-1">
        All claims submitted by the customers can be found here
      </span>
    </p>
  </AppBar>
  <div class="w-full pt-10">
    <div class="flex items-center mb-4">
      <TextField :data="claims" icon="mdi-search"
                 placeholder="Search customers, emails , claim references" class="bg-white !m-0 w-[400px]"/>
    </div>
    <ClaimsTable v-if="claims"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import AppBar from "../components/AppBar.vue";
import TextField from "../components/TextField.vue";
import ClaimsTable from "../components/ClaimsTable.vue";

export default defineComponent({
  name: 'Claims',
  components: {ClaimsTable, TextField, AppBar},
  setup() {
    const claims = ref([])
    return {claims}
  }
})
</script>
