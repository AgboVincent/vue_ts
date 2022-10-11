<template>
    <Table
      :headers="[
        'first name',
        'last name',
        'email',
        'date of inspection',
        ''
      ]"
      :items="data"
      :page="page"
      @update:page="$event => $emit('update:page', $event)"
      :total-pages="total">
    <template v-slot:default="{ item: row }">
      <td>{{ row.name}}</td>
      <td>{{ row.name }}</td>
      <td>{{ row.email }}</td>
      <td>{{ formatDateTime(row.created_at) }}</td>
      <td>
        <!-- <div class="v-chip v-theme--light v-chip--density-default v-chip--size-default v-chip--variant-contained"
             :class="getClaimStatus(row)">{{ $t(row.status) }}
        </div> -->
      </td>
      <td>
        <ui-menu-anchor position="bottom right">
          <v-btn icon="mdi-dots-horizontal" color="transparent" elevation="0" @click="openClaimOption(row)"/>
          <!-- <ui-menu v-model="row.open" class="p-0">
            <ui-menuitem value="View" @click="gotoCreateClaimPage(row.id)">
              <router-link :to="`/claims/${row.id}`">
                <div class="option">
                  {{ $t("View") }}
                </div>
              </router-link>
            </ui-menuitem>
            <ui-menuitem @click="markAsPaid(row)">
              <div class="option">
                {{ $t("Mark As Paid") }}
              </div>
            </ui-menuitem>
            <ui-menuitem @click="makeTransfer(row)">
              <div class="option">
                {{ $t("Process Transfer") }}
              </div>
            </ui-menuitem>
          </ui-menu> -->
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

        return {headers}
        
    },
})
</script>


<style scoped>

</style>