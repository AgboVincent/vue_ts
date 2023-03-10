<template>
  <Table
      :headers="[
      $t('name'),
      $t('registrationNumber'),
      'Policy No.',
      $t('carModel'),
      $t('date'),
      $t('status'),
      ''
      ]"
      :items="data"
      :page="page"
      @update:page="$event => $emit('update:page', $event)"
      :total-pages="total">
    <template v-slot:default="{ item: row }">
      <td>{{ `${row.user.first_name} ${row.user.last_name}` }}</td>
      <td>{{ row.policy.vehicle.registration_number }}</td>
      <td>{{ row.policy.number }}</td>
      <td>{{ row.policy.vehicle.model }}</td>
      <td>{{ formatDateTime(row.created_at) }}</td>
      <td>
        <div class="v-chip v-theme--light v-chip--density-default v-chip--size-default v-chip--variant-contained"
             :class="getClaimStatus(row)">{{ $t(row.status) }}
        </div>
      </td>
      <td>
        <ui-menu-anchor position="bottom right">
          <v-btn icon="mdi-dots-horizontal" color="transparent" elevation="0" @click="openClaimOption(row)"/>
          <ui-menu v-model="row.open" class="p-0">
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
          </ui-menu>
        </ui-menu-anchor>
      </td>
    </template>
  </Table>
</template>
<script lang="ts">
import {defineComponent, ref, SetupContext} from "vue";
import Table from './Table.vue';
import {
  CLAIM_STATUS_APPROVED,
  CLAIM_STATUS_AWAITING_PAYMENT,
  CLAIM_STATUS_COMPLETED,
  CLAIM_STATUS_REJECTED
} from "../constants";
import {ClaimType} from "../types";
import {markClaimAsPaidRequest, processClaimPaymentRequest} from "../requests";
import {AxiosResponse} from "axios";
import {useRouter} from "vue-router";

export default defineComponent({
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
    const headers = ref(['Name', 'Registration Number', 'Policy No.', 'Car Model', 'Date', 'Status', ''])
    const router = useRouter();

    function getClaimStatus(claim) {
      switch (claim.status) {
        case CLAIM_STATUS_REJECTED:
          return 'bg-[#FFF2E6] text-[#994900]';
        case CLAIM_STATUS_APPROVED:
        case CLAIM_STATUS_AWAITING_PAYMENT:
        case CLAIM_STATUS_COMPLETED:
          return 'bg-[#E0F1EB] text-success bg-opacity-30';
        default:
          return 'bg-[#FFF2E6] text-[#994900]';
      }
    }

    function gotoCreateClaimPage(id: number) {
      router.push(`/claims/${id}`);
    }

    function openClaimOption(row: ClaimType) {
      row.open = true
    }

    function claimSettlementErrorHandler(error) {
      if (error.response) {
        const response = error.response as AxiosResponse
        alert(response.data.data)
      }
    }

    function markAsPaid(row: ClaimType) {
      if (row.status !== 'awaiting payment') {
        alert('Cannot process claim, awaiting policy holder acceptance.')
        return;
      }

      markClaimAsPaidRequest(row.id)
          .then(() => emit('update:page', _.page))
          .catch(claimSettlementErrorHandler)
    }

    function makeTransfer(row: ClaimType) {
      if (row.status !== 'awaiting payment') {
        alert('Cannot process claim, awaiting policy holder acceptance.')
        return;
      }

      processClaimPaymentRequest(row.id)
          .then(() => emit('update:page', _.page))
          .catch(claimSettlementErrorHandler)
    }

    return {headers, getClaimStatus, makeTransfer, openClaimOption, markAsPaid, gotoCreateClaimPage}
  }
})
</script>
