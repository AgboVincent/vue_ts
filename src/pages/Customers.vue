<template>
  <AppBar>
    <p class="text-text-dark text-bold text-2xl">
      {{ $t('Customers') }}
      <span class="text-base block text-text pt-1">
        {{ $t('All claims submitted by the customers can be found here') }}
      </span>
    </p>
  </AppBar>
  <div class="w-full pt-10">
    <div class="flex items-center mb-4">
      <TextField icon="mdi-search"
                 :placeholder="$t('Search customers, emails , claim references')"
                 v-model="query"
                 class="bg-white !m-0 w-[400px]"/>
      <CustomersFilter @filter="handleFilter"/>
    </div>
    <CustomersTable :query="query" :status="status"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import AppBar from "../components/AppBar.vue";
import TextField from "../components/TextField.vue";
import CustomersTable from "../components/CustomersTable.vue";
import CustomersFilter from '../components/CustomersFilter.vue'

export default defineComponent({
  name: 'Customers',
  components: {CustomersTable, TextField, AppBar, CustomersFilter},
  setup() {
    const query = ref(''),
        status = ref('')

    function handleFilter({status: sta}: { [key: string]: string }) {
      console.log(status, sta)
      status.value = sta
    }

    return {query, handleFilter, status}
  }
})
</script>
