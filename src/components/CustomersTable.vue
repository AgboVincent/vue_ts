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
        <v-icon>mdi-dots-horizontal</v-icon>
      </td>
    </template>
  </Table>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";
import Table from './Table.vue';

export default defineComponent({
  components: {Table},
  name:'CustomersTable',
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
    return {headers, data}
  }
})
</script>
