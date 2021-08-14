<template>
  <Table :headers="headers" :items="data" :total-pages="total" :page="currentPage" @updatePage="handlePageChanged">
    <template v-slot:default="{ item: row, index }">
      <td>{{ `${row.first_name} ${row.first_name}` }}</td>
      <td>{{ row.email }}</td>
      <td>{{ row.mobile }}</td>
      <td>123456789</td>
      <td>
        <v-chip color="success">active</v-chip>
      </td>
      <td>
        <ui-menu-anchor position="bottom right">
          <v-btn icon="mdi-dots-horizontal" color="transparent" elevation="0" @click="openClaimOption(row)"/>
          <ui-menu v-model="row.opened" :distance="{ right: 10 }" :items="['Approve', 'Reject', 'Adjust']"/>
        </ui-menu-anchor>
      </td>
    </template>
  </Table>
</template>
<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import Table from './Table.vue';
import {CustomerType} from "../types";
import {getCustomerListRequest} from "../requests";

export default defineComponent({
  components: {Table},
  name: 'CustomersTable',
  setup() {
    const headers = ref(['Name', 'Email', 'Phone Number', 'Policy Number', 'Policy Status', ''])
    const data = ref([] as Array<CustomerType>),
        currentPage = ref(1),
        total = ref(1)

    function fetchCustomers(page = 1) {
      data.value.splice(0)
      getCustomerListRequest(page)
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
