<template>
  <Table
      :headers="headers"
      :items="data"
      :page="page"
      @update:page="$event => $emit('update:page', $event)"
      :total-pages="total">
    <template v-slot:default="{ item: row, index }">
      <td>{{ `${row.user.first_name} ${row.user.last_name}` }}</td>
      <td>{{ row.policy.vehicle.registration_number }}</td>
      <td>{{ row.policy.number }}</td>
      <td>{{ row.policy.vehicle.model }}</td>
      <td>{{ formatDateTime(row.created_at) }}</td>
      <td>
        <div class="v-chip v-theme--light v-chip--density-default v-chip--size-default v-chip--variant-contained" :class="getClaimStatus(row)">{{ row.status }}</div>
      </td>
      <td>
          <v-btn
              icon="mdi-dots-horizontal"
              color="transparent"
              elevation="0"
              :to="`/claims/${row.id}`"
          />
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
    },
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:page'],
  setup() {
    const headers = ref(['Name', 'Registration Number', 'Policy No.', 'Car Model', 'Date', 'Status', ''])

    function getClaimStatus(claim) {
      switch (claim.status) {
        case CLAIM_STATUS_REJECTED:
          return 'bg-[#FFF2E6] text-[#994900]';
        case CLAIM_STATUS_APPROVED:
          return 'bg-[#E0F1EB] text-success bg-opacity-30';
        default:
          return 'bg-[#FFF2E6] text-[#994900]';
      }
    }

    return {headers, getClaimStatus}
  }
})
</script>
