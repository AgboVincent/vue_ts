<template>
  <div>
    <div class="w-full flex -mt-5 mb-10">
      <div class="w-2/3">
        <Table :items="claim.items" :headers="['Name', 'Quantity', 'Quote', 'Amount','Status','']">
          <template v-slot:default="{ item: row, index }">
            <td>{{ row.type.name }} <span v-if="row.ml_prediction" class="bg-[#268BD0] text-white p-1 rounded">MlAa</span></td>
            <!-- <td>{{ row.is_damaged ? 'Yes' : 'No' }}</td>git -->
            <td>{{ row.quantity }}</td>
            <td>{{ money(row.quote) }}</td>
            <td>{{ money(row.amount) }}</td>
            <td>
              <v-chip :class="getClaimStatus(row)" class="capitalize">{{ row.status }}</v-chip>
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
                    :items="['Approve', 'Reject', 'Adjust']"
                />
              </ui-menu-anchor>
            </td>
          </template>
        </Table>

        <div class="mt-5">
          <input type="checkbox" id="expertRequired" v-model="expertRequired" @change="saveExpertRequirement">
          <label for="expertRequired" class="ml-1">Expert Required</label>
        </div>

        <div v-if="expertRequired" class="mt-4">
          <v-btn @click="openExpertsModal" class="ma-2 bg-primary text-white rounded" variant="outlined">Assign Expert</v-btn>
        </div>

        <div v-if="expertToAdd && expertToAdd.id" class="mt-4" >
          <v-button class="bg-secondary text-primary">{{ expertToAdd.name }}</v-button> <br>
          <form id="reportform" action="">
            <label href="javasacript:void(0)" class="ml-3 text-primary" for="report">Add report</label>
            <!-- select only pdf or word documents-->
            <input name="report" @input="readReport($event)" type="file" id="report" style="display:none" accept=".pdf, .doc, .docx, .xls, .xlsx">
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
            <span class="text">Assigned Experts</span>
          </div>
          <div class="mb-5" v-for="expert in claimExperts" :key="expert.id">
            <form :id="'reportform' + expert.id">
              <v-chip class="capitalize"  :color="expert.color" :text-color="expert.textColor">{{ expert.name }}</v-chip>
              <label href="javasacript:void(0)" @click="openReportModal(expert.id)" class="ml-3 text-primary" :for="'report' + expert.id">Add report</label>
              <input name="report" @input="readReport($event)" type="file" :id="'report' + expert.id" style="display:none" accept=".pdf, .doc, .docx, .xls, .xlsx">
            </form>
            <div v-if="expert.reports" class="mt-2">
              <p class="text-sm mb-2">Reports</p>
              <div class="flex items-center" v-for="report in expert.reports" :key="report.id">
                <div v-if="report.file_name && report.file_path">
                  <v-icon class="mr-2">mdi-file-document-outline</v-icon>
                  <span class="text-sm">{{ report.file_name }}</span>
                  <a :href="report.file_path" class="ml-2" target="_blank">
                    <v-icon>mdi-download</v-icon>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="my-5">
          <label class="block" for="resp">Client Responsibility</label>
          <select v-if="responsibilities.length && !loadingResps" v-model="resp" @change="saveResp" class="border-b border-primary rounded p-2" id="resp">
            <option class="mb-2" v-for="(rspblty, index) in responsibilities" :key="index" :value="rspblty.id">
              {{rspblty.name}}
            </option>
          </select>
        </div>
      </div>
      <div class="w-1/3 p-10 pb-32 border-l">
        <img
          :src="pictures[0]?.file.path"
          alt="Vehicle"
          class="w-full rounded"/>
      </div>
    </div>

    <v-overlay v-model="showExpertsModal">
      <div class="bg-white w-[500px] rounded">
        <div class="flex border-b items-center">
          <p class="p-6 text-2xl font-medium px-7 flex-grow-1">Add expert</p>
          <div class="p-5" @click="closeExpertsModal">
            <v-icon>mdi-close</v-icon>
          </div>
        </div>

        <div class="px-7 pb-6">
          <select @change="setExpert($event)" class="mb-4 rounded p-3 border block w-full">
            <option value="">Choose expert</option>
            <option v-for="(exp, idx) in expertsModel" :value="exp.id" :key="idx">{{exp.name}}</option>
          </select>
          <v-btn block :disabled="loading" @click="saveExpert">Update</v-btn>
        </div>
      </div>
    </v-overlay>

    <v-overlay v-model="shouldDisplayAmountUpdate">
      <div class="bg-white w-[500px] rounded">
        <div class="flex border-b items-center">
          <p class="p-6 text-2xl font-medium px-7 flex-grow-1">Adjust Claim</p>
          <div class="p-5" @click="closeUpdateModal">
            <v-icon>mdi-close</v-icon>
          </div>
        </div>

        <div class="px-7 pb-6">
          <TextField v-model="item.newAmount" placeholder="1000" type="number" label="Adjust Price"/>
          <TextField v-model="item.comment" placeholder="Comment" label="Comment"/>
          <div class="pb-6"/>
          <v-btn block :disabled="loading" @click="submitAdjustment">Update</v-btn>
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
  getClaimExpertsRequest
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
      experts = ref([]),
      expertsModel = ref([]),
      showExpertsModal = ref(false),
      expertToAdd = ref({}),
      reportFilename = ref(''),
      claimExperts = ref([]), // list of experts for this claim
      expertToUploadReportFor = ref(null), //for already added experts

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
        getClaimExpertsRequest(props.claim.id)
      ]).then(axios.spread((expertsResponse, respResponse, claimExpertsResponse) => {
        experts.value = expertsResponse.data;
        expertsModel.value = expertsResponse.data.map(expert => ({
          id: expert.id,
          name: expert.name
        }));
        responsibilities.value = respResponse.data;
        claimExperts.value = claimExpertsResponse.data;
      })).finally(() => {
        loadingResps.value = false;
      });
    })

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
      closeExpertsModal
    }
  }
})
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
</style>
