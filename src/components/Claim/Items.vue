<template>
  <div>
    <div class="w-full flex -mt-5 mb-10">
      <div class="w-2/3">
        <Table :items="claim.items" :headers="[$t('Name'), $t('Quantity'), $t('Quote'), $t('Amount'), $t('Status'),'']">
          <template v-slot:default="{ item: row, index }">
            <td>{{ row.type.name }} <span v-if="row.ml_prediction" class="bg-[#268BD0] text-white p-1 rounded">MlAa</span></td>
            <!-- <td>{{ row.is_damaged ? 'Yes' : 'No' }}</td>git -->
            <td>{{ row.quantity }}</td>
            <td>{{ money(row.quote) }}</td>
            <td>{{ money(row.amount) }}</td>
            <td>
              <v-chip :class="getClaimStatus(row)" class="capitalize">{{ $t(row.status) }}</v-chip>
            </td>
            <td>
              <ui-menu-anchor
                  position="bottom right"
                  v-if="row.status === 'pending' && $store.state.profile.type === 'insurance'"
              >
                <v-btn icon="mdi-dots-horizontal" color="transparent" elevation="0" @click="openClaimOption(row)"/>
                <ui-menu
                  v-model="row.opened"
                  @selected="(a) => handleStatusUpdate(a, row)"
                  :distance="{ right: 10 }"
                  :items="[$t('Approve'), $t('Reject'), $t('Adjust')]"
                />
              </ui-menu-anchor>
            </td>
          </template>
        </Table>

        <div class="mt-5">
          <input type="checkbox" id="expertRequired" v-model="expertRequired" @change="saveExpertRequirement" :disabled="!claim.user_can_edit">
          <label for="expertRequired" class="ml-1">{{$t('Expert required')}}</label>
        </div>

        <div v-if="expertRequired && claim.user_can_edit" class="mt-4">
          <v-btn @click="openExpertsModal" class="ma-2 bg-primary text-white rounded" variant="outlined">{{$t('Assign expert')}}</v-btn>
        </div>

        <div v-if="expertToAdd && expertToAdd.id" class="mt-4" >
          <v-button class="bg-secondary text-primary">{{ expertToAdd.name }}</v-button> <br>
          <form id="reportform" action="">
            <label href="javasacript:void(0)" class="ml-3 text-primary" for="report">{{$t('Add report')}}</label>
            <!-- select only pdf or word documents-->
            <input :disabled="!claim.user_can_edit" name="report" @input="readReport($event)" type="file" id="report" style="display:none" accept=".pdf, .doc, .docx, .xls, .xlsx">
          </form>
          <div class="mt-5" v-if="reportFilename">
            <!-- file icon -->
            <div class="flex items-center">
              <v-icon class="mr-2">mdi-file-document-outline</v-icon>
              <span class="text-sm">{{ reportFilename }}</span>
            </div>
            <!-- {{reportFilename}} -->
          </div>
        </div>

        <!-- display claim experts -->
        <div v-if="claimExperts.length" class="mt-4">
          <div class="flex items-center mb-2">
            <span class="text">{{$t('Assigned Experts')}}</span>
          </div>
          <div class="mb-5" v-for="expert in claimExperts" :key="expert.id">
            <form :id="'reportform' + expert.id">
              <v-chip class="capitalize"  :color="expert.color" :text-color="expert.textColor">{{ expert.name }}</v-chip>
              <label href="javasacript:void(0)" @click="openReportModal(expert.id)" class="ml-3 text-primary" :for="'report' + expert.id">{{$t('Add report')}}</label>
              <input :disabled="!claim.user_can_edit" name="report" @input="readReport($event)" type="file" :id="'report' + expert.id" style="display:none" accept=".pdf, .doc, .docx, .xls, .xlsx">
            </form>
            <div v-if="expert.reports" class="mt-2">
              <p class="text-sm mb-2">{{$t('Reports')}}</p>
              <div class="flex items-center" v-for="report in expert.reports" :key="report.id">
                <div v-if="report.file_name && report.file">
                  <v-icon class="mr-2">mdi-file-document-outline</v-icon>
                  <span class="text-sm">{{ report.file_name }}</span>
                  <a :href="report.file" class="ml-2" target="_blank">
                    <v-icon>mdi-download</v-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-5">
          <label class="block" for="resp">{{$t('Client Responsibility')}}</label>
          <select :disabled="!claim.user_can_edit" v-if="responsibilities.length && !loadingResps" v-model="resp" @change="saveResp" class="border-b border-primary rounded p-2" id="resp">
            <option class="mb-2" v-for="(rspblty, index) in responsibilities" :key="index" :value="rspblty.id">
              {{$t(rspblty.name)}}
            </option>
          </select>
        </div>

        <div>
          <!-- show add garage button -->
          <v-btn @click="showGarageModal = true" :disabled="!claim.user_can_edit"  variant="outlined">{{$t('Add garage')}}</v-btn>
          <!-- show garage -->
          <div v-if="claimGarage && claimGarage.id" class="mt-4">
            <div class="flex items-center mb-2">
              <span class="text">{{$t('Garage')}}</span>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <div>
                {{$t('Name')}} <br>
                <span class="text-sm">{{ claimGarage.name }}</span>
              </div>
              <div>{{$t('Phone')}}
                <br>
                <span class="text-sm">{{ claimGarage.phone }}</span>
              </div>
              <div>{{('Email')}}
                <br>
                <span class="text-sm">{{ claimGarage.email }}</span>
              </div>
            </div>
            <p class="mt-3">{{$t('Address')}}</p>
            <div class="grid grid-cols-3 gap-4 text-sm">
              <div class="">
                <span>{{ $t('Line') }} 1:</span> {{ claimGarage.address.line_1 }}
              </div>
              <div class="">
                <span>{{ $t('Line') }} 2:</span> {{ claimGarage.address.line_2 }}
              </div>
              <div class="">
                <span>{{ $t('Line') }} 3:</span> {{ claimGarage.address.line_3 }}
              </div>
              <div class="">
                <span>{{ $t('City') }}:</span> {{ claimGarage.address.city }}
              </div>
              <div class="">
                <span>{{ $t('Latatitude') }}:</span> {{ claimGarage.address.latitude }}
              </div>
              <div class="">
                <span>{{ $t('Longitude') }}:</span> {{ claimGarage.address.longitude }}
              </div>
              <div class="" v-if="claimGarage.address.code_pays_iso_2">
                <span>{{ $t('codePaysIso2') }}:</span> {{ claimGarage.address.code_pays_iso_2 }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-1/3 p-10 pb-32 border-l">
        <img
          :src="pictures[0]?.file.path"
          :alt="$t('Vehicle')"
          class="w-full rounded"/>
      </div>
    </div>

    <v-overlay v-model="showGarageModal">
      <div class="bg-white w-[500px] rounded">
        <div class="flex border-b items-center">
          <p class="p-6 text-2xl font-medium px-7 flex-grow-1">{{$t('Add garage')}}</p>
          <div class="p-5" @click="showGarageModal = false">
            <v-icon>mdi-close</v-icon>
          </div>
        </div>

        <div class="px-7 pb-6">
          <select :disabled="!claim.user_can_edit" v-model="garageIdToAdd" class="mb-4 rounded p-3 border block w-full">
            <option value="">{{$t('Choose garage')}}</option>
            <option v-for="(garage, idx) in garagesModel" :value="garage.id" :key="idx">{{garage.name}}</option>
          </select>
          <v-btn block :disabled="loading || (!claim.user_can_edit)" @click="saveChosenGarage">{{$t('update')}}</v-btn>
        </div>
      </div>
    </v-overlay>

    <v-overlay v-model="showExpertsModal">
      <div class="bg-white w-[500px] rounded">
        <div class="flex border-b items-center">
          <p class="p-6 text-2xl font-medium px-7 flex-grow-1">{{$t('Add expert')}}</p>
          <div class="p-5" @click="closeExpertsModal">
            <v-icon>mdi-close</v-icon>
          </div>
        </div>

        <div class="px-7 pb-6">
          <select @change="setExpert($event)" class="mb-4 rounded p-3 border block w-full">
            <option value="">{{$t('Choose expert')}}</option>
            <option v-for="(exp, idx) in expertsModel" :value="exp.id" :key="idx">{{exp.name}}</option>
          </select>
          <v-btn block :disabled="loading" @click="saveExpert">{{$t('update')}}</v-btn>
        </div>
      </div>
    </v-overlay>

    <v-overlay v-model="shouldDisplayAmountUpdate">
      <div class="bg-white w-[500px] rounded">
        <div class="flex border-b items-center">
          <p class="p-6 text-2xl font-medium px-7 flex-grow-1">{{$t('adjust claim')}}</p>
          <div class="p-5" @click="closeUpdateModal">
            <v-icon>mdi-close</v-icon>
          </div>
        </div>

        <div class="px-7 pb-6">
          <TextField v-model="item.newAmount" placeholder="1000" type="number" label="Adjust Price"/>
          <TextField v-model="item.comment" placeholder="Comment" label="Comment"/>
          <div class="pb-6"/>
          <v-btn block :disabled="loading" @click="submitAdjustment">{{$t('update')}}</v-btn>
        </div>
      </div>
    </v-overlay>
  </div>
</template>

<script lang="ts">
import axios from 'axios';
import {computed, defineComponent, PropType, ref, onMounted, watch} from "vue";
import {ClaimItemType, ClaimType} from "../../types";
import Table from './../Table.vue'
import {CLAIM_STATUS_APPROVED, CLAIM_STATUS_REJECTED} from "../../constants";
import {
  uploadExpertReport,
  getExpertsRequest,
  addExpertToClaimRequest,
  approveClaimItemRequest, 
  rejectClaimItemRequest, 
  updateClaimItemRequest,
  updatetClientResponsibilityRequest,
  getClientResponsibiltiesRequest,
  updateClaimsExpertsRequirementRequest,
  getClaimExpertsRequest,
  fetchGarageRequest,
  saveClaimGarageRequest,
  getGarageRequest
} from "../../requests";
import TextField from "../TextField.vue";

export default defineComponent({
  name: 'ClaimItems',
  components: {TextField, Table},
  props: {
    claim: {
      type: Object as PropType<ClaimType>
    }
  },

  setup(props, {emit}) {
    const pictures = computed(() => props.claim?.accident.documents.filter(document => document.file.mime.includes('image'))),
      shouldDisplayAmountUpdate = ref(false),
      item = ref<ClaimItemType | null>(null),
      loading = ref(false),
      expertRequired = ref(props.claim.requires_expert),
      responsibilities  = ref([]),
      resp = ref(props.claim.clientResponsibility.id),
      loadingResps = ref(true),
      

      //experts
      experts = ref([]),
      expertsModel = ref([]),
      showExpertsModal = ref(false),
      expertToAdd = ref({}),
      reportFilename = ref(''),
      claimExperts = ref([]), // list of experts for this claim
      expertToUploadReportFor = ref(null), //for already added experts

      //garages
      garages = ref([]),
      showGarageModal = ref(false),
      garageIdToAdd = ref(''),
      garagesModel = ref([]),
      claimGarage = ref({}),
      
      openExpertsModal = () => {
        showExpertsModal.value = true;
      };

      watch(reportFilename, (newVal) => {
        if (newVal) {
          //uploading for added expert
          if(expertToUploadReportFor.value) {
            const form = document.getElementById('reportform' + expertToUploadReportFor.value);
            const formData = new FormData(form);
            uploadExpertReport(props.claim.id, expertToUploadReportFor.value, formData)
              .then(({data}) => {
                console.log(data);
                const expert = claimExperts.value.find(expert => expert.id == expertToUploadReportFor.value);
                expert.reports.push(data);
                expertToUploadReportFor.value = null;
            });
          }else{
            //uploading for new expert
            const form = document.getElementById('reportform');
            const formData = new FormData(form);
            uploadExpertReport(props.claim.id, expertToAdd.value.id, formData)
              .then(({data}) => {
                console.log(data);
            });
          }

        }
      })

    onMounted(function () {
      axios.all([
        getExpertsRequest(),
        getClientResponsibiltiesRequest(),
        getClaimExpertsRequest(props.claim.id),
        fetchGarageRequest(),
        getGarageRequest(props.claim.id)
      ]).then(axios.spread((
        expertsResponse, 
        respResponse, 
        claimExpertsResponse, 
        garagesResponse,
        claimGarageResponse
        ) => {
          experts.value = expertsResponse.data;
          expertsModel.value = expertsResponse.data.map(expert => ({
            id: expert.id,
            name: expert.name
          }));
          responsibilities.value = respResponse.data;
          claimExperts.value = claimExpertsResponse.data;

          garages.value = garagesResponse.data;
          claimGarage.value = claimGarageResponse.data;
          garagesModel.value = garages.value.map(garage => ({
            id: garage.id,
            name: garage.name
          }));
      })).finally(() => {
        loadingResps.value = false;
      });
    })

    function saveChosenGarage() {
      let error = false;
      if(garageIdToAdd.value == '') {
        // alert('Please choose garage');
        alert('Veuillez choisir le garage');
        error = true;
        return;
      }

      if(error) return; //needed to prevent submit when alert is closed

      saveClaimGarageRequest(props.claim.id, garageIdToAdd.value)
        .then(({data}) => {
          showGarageModal.value = false;
          claimGarage.value = data;
        });
    }
    
    function readReport(e: any) {
      const file = e.target.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          reportFilename.value = file.name;
        };
        reader.readAsDataURL(file);
      }
    }

    function openReportModal(expertId: number) {
      expertToUploadReportFor.value = expertId;
    }

    function closeExpertsModal() {
      showExpertsModal.value = false;
      expertToAdd.value = {};
    }

    function uploadReport(){
      emit('upload-report', props.claim.id);
    }

    function saveExpert(){
      if(expertToAdd.value.id){
        addExpertToClaimRequest(props.claim.id, expertToAdd.value.id).then((response) => {
          claimExperts.value.unshift(response.data);
          closeExpertsModal();
        });
        
      }else{
        //no expert selected or expert already added
        closeExpertsModal();
      }
    }

    function setExpert(event) {
      const expert = experts.value.find(expt => expt.id == event.target.value);

      //dont add if already added
      if(claimExperts.value.some(expt => expt.id == expert.id)){
        return;
      }

      expertToAdd.value = expert;
    }

    function openClaimOption(row: { opened: boolean; }) {
      row.opened = true
    }

    function getClaimStatus(claim: { status: any; }) {
      switch (claim.status) {
        case CLAIM_STATUS_REJECTED:
          return 'bg-[#FFF2E6] text-[#994900]';
        case CLAIM_STATUS_APPROVED:
          return 'bg-[#E0F1EB] text-success bg-opacity-30';
        default:
          return 'bg-[#FFF2E6] text-[#994900]';
      }
    }

    function openUpdateModal(claim: ClaimItemType) {
      item.value = claim
      item.value.newAmount = item.value?.amount
      shouldDisplayAmountUpdate.value = true
    }

    function closeUpdateModal() {
      item.value.comment = ''
      item.value = {} as ClaimItemType
      shouldDisplayAmountUpdate.value = false
    }

    async function handleStatusUpdate(status: string, item: ClaimItemType) {
      switch (status.value.toLowerCase()) {
        case 'approve':
          await approveClaimItemRequest(props.claim?.id as number, item.id)
          item.status = 'approved'
          break;
        case 'reject':
          await rejectClaimItemRequest(props.claim?.id as number, item.id)
          item.status = 'rejected'
          break;
        case 'adjust':
          openUpdateModal(item)
          break;
      }

    }

    function submitAdjustment() {
      loading.value = true
      updateClaimItemRequest(props.claim?.id as number, item.value?.id as number, item.value?.newAmount as number, item.value?.comment as string)
          .then(() => {
            item.value.amount = item.value.newAmount as number
            loading.value = false
            closeUpdateModal()
          })
    }

    const saveResp = () => {
      updatetClientResponsibilityRequest(props.claim.id, resp.value)
        .then(({data}) => {
          emit('update', data);
        })
    },

    saveExpertRequirement = () => {
      updateClaimsExpertsRequirementRequest(props.claim.id, expertRequired.value)
        .then(({data}) => {
          emit('update', data);
        })
    }

    return {
      pictures,
      loading,
      item,
      openClaimOption,
      getClaimStatus,
      handleStatusUpdate,
      shouldDisplayAmountUpdate,
      closeUpdateModal,
      submitAdjustment,
      expertRequired,
      responsibilities,
      saveResp,
      resp,
      loadingResps,
      showExpertsModal,
      saveExpertRequirement,
      experts,
      openExpertsModal,
      setExpert,
      expertToAdd,
      expertsModel,
      saveExpert,
      reportFilename,
      uploadReport,
      readReport,
      claimExperts,
      openReportModal,
      expertToUploadReportFor,
      closeExpertsModal,

      showGarageModal,
      garageIdToAdd,
      garagesModel,
      saveChosenGarage,
      claimGarage
    }
  }
})
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
</style>
