<template>
<div>
    <Table
      :headers="[
        'Full name',
        'Email',
        'Policy',
        'Date Sumbitted',
        'Payment status',
        'Evaluation Status',
        '',
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
      <td> <img class="pb-1 pr-2" src="../assets/view.svg" @click="policyDetail(row)"></td>
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
  <v-dialog
        v-model="dialog"
        color="#F6FAFD"
        class="mx-auto mb-10"
        >
            <v-card width="400px" height="400px">
                <v-row class="justify-end">
                    <v-icon size="small" class="mt-5 mr-5 mb-5"
                        @click="dialog = false">
                        mdi-close
                    </v-icon>
                </v-row> 
                <v-col>
                    <h5 class="text-center mb-3">Policy Details</h5>
                    <v-col>
                        <v-row class="justify-space-between">
                            <v-col>
                                <h5 class="title">Policy Name</h5>
                                <h5 class="text">{{policy}}</h5>
                            </v-col>

                            <v-col>
                                <h5 class="title">Policy Amount</h5>
                                <h5 class="text">NGN{{amount}}</h5>
                            </v-col>
                        </v-row>
                    </v-col>
                    <br>
                    <v-col>
                        <h5 class="title">Policy Description</h5>
                        <h5 class="text">{{description}}</h5>
                    </v-col>
                    <v-col>
                        <h5 class="title">Policy covered</h5>
                        <div v-for="(item, index) in items" :key=" item.id">
                         <h5 class="text" v-if="item.is_covered">{{index+1}}. {{ item.name }}</h5>
                        </div>
                    </v-col>
                </v-col>         
           </v-card>
    </v-dialog>
</div>
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
         const dialog = ref(false)
         const policy = ref('')
         const amount = ref('')
         const description = ref('')
         const items = ref([])
        
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
                emit('update:page', _.page)
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
                emit('update:page', _.page)
            })
            
        }

        function policyDetail(row: any){
            dialog.value = true;
            policy.value = row.new_policy.name;
            amount.value = row.new_policy.amount;
            description.value = row.new_policy.description;
            items.value = row.new_policy.items;
        }
        return {
            headers, 
            openReportOption, 
            approveUser, 
            rejectUser, 
            dialog, 
            policyDetail,
            policy,
            amount,
            description,
            items
        }
        
    },
})
</script>


<style scoped>
.title{
    color: #5E626A;
    font-size: 14px;
    font-weight: 400;
}
.text{
    color: #030124;
    font-size: 16px;
    font-weight: 400;
}
</style>