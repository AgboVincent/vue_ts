<template>
  <AppBar>
    <p class="text-text-dark text-bold text-2xl">
      Customers
      <span class="text-base block text-text pt-1">
        All claims submitted by the customers can be found here
      </span>
    </p>
  </AppBar>
  <div class="w-full pt-10">
    <div class="flex items-center mb-4">
      <TextField icon="mdi-search" placeholder="Search customers, emails , claim references"
                 class="bg-white !m-0 w-[400px]"/>
    </div>
    <CustomersTable/>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import AppBar from "../components/AppBar.vue";
import TextField from "../components/TextField.vue";
import CustomersTable from "../components/CustomersTable.vue";

export default defineComponent({
  name: 'Customers',
  components: {CustomersTable, TextField, AppBar},
  setup() {
    return {}
  }
})
</script>
