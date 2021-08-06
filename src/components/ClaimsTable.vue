<template>
  <Table :headers="headers" :items="data">
    <template v-slot:default="{ item: row, index }">
      <td>{{ `${row.user.first_name} ${row.user.last_name}` }}</td>
      <td>{{ row.policy.vehicle.registration_number }}</td>
      <td>{{ row.policy.number }}</td>
      <td>{{ row.policy.vehicle.model }}</td>
      <td>{{ row.created_at }}</td>
      <td>
        <v-chip :color="getClaimStatus(row)">{{ row.status }}</v-chip>
      </td>
      <td>
        <v-icon>mdi-dots-horizontal</v-icon>
      </td>
    </template>
  </Table>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";
import Table from './Table.vue';
import {CLAIM_STATUS_APPROVED, CLAIM_STATUS_REJECTED} from "../constants";

export default defineComponent({
  components: {Table},
  props: {
    data: {
      type: Array
    }
  },
  setup() {
    const headers = ref(['Name', 'Registration Number', 'Policy No.', 'Car Model', 'Date', 'Status',''])

    function getClaimStatus(claim) {
      switch (claim.status) {
        case CLAIM_STATUS_REJECTED:
          return 'danger';
        case CLAIM_STATUS_APPROVED:
          return 'success';
        default:
          return 'warning';
      }
    }
    return {headers, getClaimStatus}
  }
})
</script>
