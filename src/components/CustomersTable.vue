<template>
  <Table :headers="headers" :items="data">
    <template v-slot:default="{ item: row, index }">
      <td>{{ row.name }}</td>
      <td>lawaloladipupo@outlook.com</td>
      <td>08149108989</td>
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
import {defineComponent, ref} from "vue";
import Table from './Table.vue';

export default defineComponent({
  components: {Table},
  name: 'CustomersTable',
  setup() {
    const headers = ref(['Name', 'Email', 'Phone Number', 'Policy Number', 'Policy Status', ''])
    const data = ref([
      {
        name: 'Darlene Robertson',
        vehicle: '1234567890',
        policy: '1234567890',
        car: 'Lexus 360',
        date: '20/03/2021',
        status: 'pending'
      }
    ])

    function openClaimOption(claim) {
      claim.opened = true
    }

    return {headers, data, openClaimOption}
  }
})
</script>
