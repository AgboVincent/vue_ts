<template>
  <Table :headers="headers" :items="data" :total-pages="total" :page="currentPage" @updatePage="handlePageChanged">
    <template v-slot:default="{ item: row, index }">
      <td>{{ `${row.user.first_name} ${row.user.first_name}` }}</td>
      <td>{{ row.user.email }}</td>
      <td>{{ row.user.mobile }}</td>
      <td>{{ row.number }}</td>
      <td>
        <v-chip color="success">{{ row.status }}</v-chip>
      </td>
      <td>
        <v-btn icon="mdi-dots-horizontal" color="transparent" elevation="0" @click="openClaimOption(row)"/>
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
    query: {type: String, default: ''}
  },
  name: 'CustomersTable',
  setup(props) {
    const headers = ref(['Name', 'Email', 'Phone Number', 'Policy Number', 'Policy Status', ''])
    const data = ref([] as Array<PolicyType>),
        currentPage = ref(1),
        total = ref(1),
        query = toRef(props, 'query')

    watch(query, () => fetchCustomers())

    function fetchCustomers(page = 1) {
      data.value.splice(0)
      getPoliciesListRequest(page, query.value)
          .then(({data: response}) => {
            currentPage.value = response.meta.currentPage
            total.value = response.meta.last
            data.value.push(...response.data)
          })
    }

    onMounted(fetchCustomers)

    function openClaimOption(claim) {
      claim.opened = true
    }

    function handlePageChanged(page) {
      fetchCustomers(page)
    }

    return {headers, data, openClaimOption, total, currentPage, handlePageChanged}
  }
})
</script>
