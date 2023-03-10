<template>
  <Table :headers="headers" :items="data" :total-pages="total" :page="currentPage" @updatePage="handlePageChanged">
    <template v-slot:default="{ item: row, index }">
      <td>{{ `${row.user.first_name} ${row.user.first_name}` }}</td>
      <td>{{ row.user.email }}</td>
      <td>{{ row.user.mobile }}</td>
      <td>{{ row.number }}</td>
      <td>
        <v-chip :color="row.status == 'active' ? 'success' : 'danger'">{{ $t(row.status) }}</v-chip>
      </td>
      <td>
        <v-btn v-if="row.user_can_create_claim"  color=" lighten-2" dark elevation="0" :to="`/customers/${row.id}/claims/create`">+ Claim</v-btn>
      </td>
    </template>
  </Table>
</template>
<script lang="ts">
import {defineComponent, onMounted, ref, toRef, watch} from "vue";
import Table from './Table.vue';
import {PolicyType} from "../types";
import {getPoliciesListRequest} from "../requests";

export default defineComponent({
  components: {Table},
  props: {
    status: {type: String, default: ''},
    query: {type: String, default: ''}
  },
  name: 'CustomersTable',
  setup(props) {
    const headers = ref(['Name', 'Email', 'Phone Number', 'Policy Number', 'Policy Status', ''])
    const data = ref([] as Array<PolicyType>),
        currentPage = ref(1),
        total = ref(1),
        query = toRef(props, 'query'),
        status = toRef(props, 'status')

    watch(query, () => fetchCustomers())
    watch(status, () => fetchCustomers())

    function fetchCustomers(page = 1) {
      data.value.splice(0)
      getPoliciesListRequest(page, query.value as string, status.value as string)
          .then(({data: response}) => {
            currentPage.value = response.meta.currentPage
            total.value = response.meta.last
            data.value.push(...response.data)
          })
    }

    onMounted(fetchCustomers)

    function handlePageChanged(page) {
      fetchCustomers(page)
    }

    return {headers, data, total, currentPage, handlePageChanged}
  }
})
</script>
