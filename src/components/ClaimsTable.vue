<template>
  <Table :headers="headers" :items="data">
    <template v-slot:default="{ item: row, index }">
      <td>{{ row.name }}</td>
      <td>1234567890</td>
      <td>1234567890</td>
      <td>Lexus 360</td>
      <td>20/03/2021</td>
      <td>
        <v-chip color="warning">pending</v-chip>
      </td>
    </template>
  </Table>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";
import Table from './Table.vue';

export default defineComponent({
  components: {Table},
  setup() {
    const headers = ref(['Name', 'Registration Number', 'Policy No.', 'Car Model', 'Date', 'Status'])
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
