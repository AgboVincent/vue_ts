<template>
    <Table
      :headers="[
        'First name',
        'Last name',
        'Email',
        'Date of inspection',
        ''
      ]"
      :items="data"
      :page="page"
      @update:page="$event => $emit('update:page', $event)"
      :total-pages="total">
    <template v-slot:default="{ item: row }">
      <td>{{ row.name.split(' ')[0] }}</td>
      <td>{{ row.name.split(' ')[1] }}</td>
      <td>{{ row.email }}</td>
      <td>{{ formatDateTime(row.created_at) }}</td>
      <td>
        <ui-menu-anchor position="bottom right">
          <v-btn icon="mdi-dots-horizontal" color="transparent" elevation="0" @click="openReportOption(row)"/>
          <ui-menu v-model="row.open" class="p-0">
            <ui-menuitem value="View" @click="openReportDetail(row.id)">
              <router-link :to="`/inspection/${row.id}`">
                <div class="option">
                  {{ $t("View") }}
                </div>
              </router-link>
            </ui-menuitem>
          </ui-menu>
        </ui-menu-anchor>
      </td>
    </template>
  </Table>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue';
import Table from './Table.vue';

export default defineComponent({
    name: "InspectionTable",
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
    setup(_, {emit}: SetupContext) {
         const headers = ref(['First Name', 'Last Name', 'Email', 'Date of Inspection', ''])
        
         function openReportOption(row: any) {
            row.open = true;
         }

         function openReportDetail(id: number) {
            this.$router.push(`/inspection/${id}`);
        }
        return {headers, openReportOption, openReportDetail}
        
    },
})
</script>


<style scoped>

</style>