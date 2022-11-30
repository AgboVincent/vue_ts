<template>
    <div>
        <v-col>
            <v-layout class="row mt-10 mx-0 justify-space-between">
                <div  class="flex items-center">
                    <div class="d-flex align-items-start">
                    <v-btn  height="30" elevation="0" class="back-btn px-2 my-3" @click="$router.back()"> 
                        <img class="pb-1 pr-2" src="../assets/arrow_back.png"> Back
                    </v-btn>
                </div>  
                </div>
                <div  class="flex">
                    <v-btn height="35" class="reject-btn px-2 my-3 mx-3 w-[150px] h-[30px]"
                            @click="dialog = true">
                    Reject
                    </v-btn>
                    <v-btn height="35" class="accept-btn px-2 my-3 w-[150px] h-[30px]"
                           @click="claimUpdate('Approved')">
                    Accept
                    </v-btn>
                </div>
            </v-layout>          
               
            <v-alert v-if="claimStatus"
                title="Action on claim"
                :text="`Claim ${claimStatus}`"
                max-width="120px"
            
                > 
            </v-alert>

            
            <div class="bg-white rounded overflow-y-scroll mt-4">
                <div class="tabs">
                    <a href="#"
                    @click.prevent="() => changeTab(tabIndex)"
                    v-for="(tab, tabIndex) in tabs"
                    class="tab"
                    :class="activeTab.name === tab.name ? 'active' : ''"
                    :key="`tabs:${tabIndex}`">{{ $t(tab.name) }}</a>
                </div>

                <div v-if="val" class="content">
                  <component :is="activeTab.component" :key="activeTab.name"  :claim="claim"/>
                </div>
            </div>
        </v-col> 
        <v-row>
            <v-dialog
            v-model="dialog"
            color= "#F6FAFD"
            content-class="dial-position  mb-10"
            elevation="0"
            >
            <v-card width="300" height="400">
                <v-row class="justify-end">
                    <v-icon size="small" class="mt-5 mr-5 mb-5"
                        @click="dialog = false">
                        mdi-close
                    </v-icon>
                </v-row>
                <v-card-title class="text-h6 grey lighten-2">
                Reject Claim
                </v-card-title>
                <v-form>
                    <input
                        v-model="reason"
                        class="reason"
                        placeholder="Enter reason for rejection"
                        type="text"
                        required
                    />
                </v-form>    
                <v-divider></v-divider>

                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn height="35" class="accept-btn px-2 my-3 w-[150px] h-[30px]"
                       @click="claimUpdate('Rejected')">
                Submit
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>  
        </v-row>    
    </div>
</template>

<script lang="ts">

import {defineComponent, onMounted, PropType,ref} from "vue";
import { getCollectionRequest, updateClaimStatus, sendUserEmail} from "../requests";
import { CollectionType} from "../types";
import {useRoute} from "vue-router";
import ClaimDetails from '../components/Claim/ClaimDetails.vue';
import VehicleDetails from "../components/Claim/VehicleDetails.vue";

export default defineComponent({
  name:  "CollectionDetails",
  components: {
    ClaimDetails, VehicleDetails, 
  },
  props: {
    rowData: {required:true, type: Object},
    id: Number
  },
  setup(props) {
    const {params} = useRoute()
    const tabs = ref([
      {name: 'Claim Details', component: 'claimDetails'},
      {name: 'Vehicle Details', component: 'vehicleDetails'}    
    ])
    const activeTab = ref(tabs.value[0])
    const claim = ref({} as CollectionType)
    const loading = ref(true)
    const val = ref(false)
    const id = ref()
    const claimStatus = ref(null)
    const dialog = ref(false)
    const reason = ref('')
    const user = ref({})
    
    function changeTab(tabIndex: number) {
      activeTab.value = tabs.value[tabIndex]
    }

    function fetchClaim() {
        loading.value = true;
        getCollectionRequest(params.id as unknown as number)
          .then((data:any) => {
             claim.value =  data
             loading.value = false
             val.value = true;
             id.value = data.id
              user.value = {
            name: data.user.name,
            email: data.user.email
        }
          })
          .catch(err=>{
  
          })
    }

    function claimUpdate(status: any) {
        var data = {
            id: id.value,
            status: status
        }
        updateClaimStatus(data)
        .then((data:any) => {
            console.log(data);
            claimStatus.value = status;
            let msg = ''
            if(status = "Approved"){
                msg = "Your claim has been review and approved"
            }
            msg = reason.value
            sendUserEmail(user.value, msg);
            dialog.value = false;
             setTimeout(()=>{
                claimStatus.value = null;
            },3000)        
        })
        .catch(err=>{

        })

    }

    onMounted(fetchClaim)
    
    return {
      claim,
      tabs,
      changeTab,
      activeTab,
      loading,
      val,
      id,
      claimUpdate,
      claimStatus,
      dialog,
      reason,
      user
    }
  }
})

</script>


<style scoped lang="scss">
.tabs {
  @apply w-full flex items-center border-b;

  .tab {
    @apply mx-5 py-5 font-normal text-xs;

    &.active {
      @apply font-bold border-b-2 text-baloon-yellow border-baloon-yellow;
    }
  }
}

.content {
  @apply p-5 relative;

  :deep(.row) {
    @apply flex space-x-12 w-2/3;

    .col {
      @apply mt-0 flex-1;

      .item {
        @apply mb-10;

        .field {
          @apply text-text text-sm mb-2;
        }

        .value {
          @apply text-text-dark text-sm font-medium;
        }
      }
    }
  }

  :deep(.heading) {
    @apply text-primary-deep text-base font-medium border-t py-5;
  }
}
.back-btn{
    background-color: #e1e5f3;
    border: 0;
    color: #5E626A;
    font-size: 14px;
    border-radius: 8px;
}
.reject-btn{
    border: 0;
    color: #EC2D20;
    border-radius: 8px;
    font-size: 10px;
    background: #FFE5E3;
    border: 1px solid #EC2D20;
    border-radius: 8px;
}
.accept-btn{
    border: 0;
    color: #FFFFFF;
    font-size: 10px;
    border-radius: 8px;
    background: #1A1AFF;
    border-radius: 8px;

}

 .reason{
     height: 80px;
     width: 260px;
     margin: 20px;
     padding: 12px;
     box-sizing: border-box;
     border: 1px solid #ccc;
 }

</style>