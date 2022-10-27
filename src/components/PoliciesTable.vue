<template>
    <Table
      :headers="[
        'Full name',
        'Email',
        'Policy',
        'Date Sumbitted',
        'Payment status',
        'Evaluation Status',
        ''
      ]"
      :items="data"
      :page="page"
      @update:page="$event => $emit('update:page', $event)"
      :total-pages="total">
    <template v-slot:default="{ item: row }">
      <td>{{ row.user.name }}</td>
      <td>{{ row.user.email }}</td>
      <td>{{ row.purchased_policy }}</td>
      <td>{{ formatDateTime(row.created_at) }}</td>
      <td>{{ row.payment_status }}</td>
      <td>{{ row.evaluation_status }}</td>
      <td>
        <ui-menu-anchor position="bottom right">
          <v-btn icon="mdi-dots-horizontal" color="transparent" elevation="0" @click="openReportOption(row)"/>
          <ui-menu v-model="row.open" class="p-0">
            <ui-menuitem value="Approve" @click="approveUser(row)">
                <div class="option">
                  Approve
                </div>
            </ui-menuitem>
             <ui-menuitem value="Reject" @click="rejectUser(row)">
                 <div class="option">
                  Reject
                </div>
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
import {updateUserStatus, sendUserEmail} from "../requests";
export default defineComponent({
    name: "PoliciesTable",
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
         const headers = ref([])
        
         function openReportOption(row: any) {
            row.open = true;
         }


        function approveUser(row: any) {
            var data = {
                id: row.pre_evaluation_id,
                status: "Approved"
            };
            updateUserStatus(data)
            .then(res=>{
                var msg = "Your request to purhcase policy has been reviewed successfull and Approved. Kindly click the button to continue";
                sendUserEmail(row.user, msg);
            })
            
        }

        function rejectUser(row: any) {
            var data = {
                id: row.pre_evaluation_id,
                status: "Rejected"
            };
            updateUserStatus(data)
            .then(res=>{
                var msg = "Your request to purhcase policy has been reviewed successfull and was Rejected. Kindly resubmit information for inspection ";
                sendUserEmail(row.user, msg);
            })
            
        }
        return {headers, openReportOption, approveUser, rejectUser}
        
    },
})
</script>


<style scoped>

</style>