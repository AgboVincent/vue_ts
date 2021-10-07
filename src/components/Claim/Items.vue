<template>
  <div>
    <div class="w-full flex -mt-5 mb-10">
      <div class="w-2/3">
        <Table :items="claim.items" :headers="['Name', 'Damaged', 'Quantity', 'Quote', 'Amount','Status','']">
          <template v-slot:default="{ item: row, index }">
            <td>{{ row.type.name }}</td>
            <td>Yes</td>
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
      </div>
      <div class="w-1/3 p-10 pb-32 border-l">
        <img
            :src="pictures[0]?.file.path"
            alt="Vehicle"
            class="w-full rounded"/>
      </div>
    </div>

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
import {computed, defineComponent, PropType, ref} from "vue";
import {ClaimItemType, ClaimType} from "../../types";
import Table from './../Table.vue'
import {CLAIM_STATUS_APPROVED, CLAIM_STATUS_REJECTED} from "../../constants";
import {approveClaimItemRequest, rejectClaimItemRequest, updateClaimItemRequest} from "../../requests";
import TextField from "../TextField.vue";

export default defineComponent({
  name: 'ClaimItems',
  components: {TextField, Table},
  props: {
    claim: {
      type: Object as PropType<ClaimType>
    }
  },
  setup(props) {
    const pictures = computed(() => props.claim.accident.documents.filter(document => document.file.mime.includes('image'))),
        shouldDisplayAmountUpdate = ref(false),
        item = ref<ClaimItemType | null>(null),
        loading = ref(false)

    function openClaimOption(row) {
      row.opened = true
    }

    function getClaimStatus(claim) {
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

    async function handleStatusUpdate(status, item: ClaimItemType) {
      switch (status.value.toLowerCase()) {
        case 'approve':
          await approveClaimItemRequest(props.claim.id, item.id)
          item.status = 'approved'
          break;
        case 'reject':
          await rejectClaimItemRequest(props.claim.id, item.id)
          item.status = 'rejected'
          break;
        case 'adjust':
          openUpdateModal(item)
          break;
      }

    }

    function submitAdjustment() {
      loading.value = true
      updateClaimItemRequest(props.claim.id, item.value?.id as number, item.value?.newAmount as number, item.value?.comment)
          .then(() => {
            item.value.amount = item.value.newAmount as number
            loading.value = false
            closeUpdateModal()
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
      submitAdjustment
    }
  }
})
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
</style>
