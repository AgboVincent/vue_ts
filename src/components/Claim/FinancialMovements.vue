<template>
  <div>
    <div class="w-full flex -mt-5 mb-10">
      <Table :items="movements" :headers="[$t('Nature'), $t('Guarantees'),$t('Recipient'),$t('Amount'),$t('Payment Method'),$t('Date Created')]" >
        <template v-slot:default="{ item: row, index }">

          <td>{{ row.nature }}</td>
          <td>{{ row.guarantees ? row.guarantees.join(', ') : '' }}</td>
          <td>{{ row.recipient }}</td>
          <td>{{ row.amount.toLocaleString('fr-FR', {currency: 'CFA', style: 'currency'}) }}</td>
          <td>{{ row.payment_method }}</td>
          <td>{{ formatDateTime(row.created_at) }}</td>
        </template>
      </Table>
    </div>

    <financial-movement-modal :claim_id="claim_id" @newFinMovement="fetchMovements"></financial-movement-modal>


  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref} from "vue";
import {ClaimType, FinancialMovementType} from "../../types";
import Table from './../Table.vue'
import TextField from "../TextField.vue";
import {getFinancialMovements} from "../../requests";
import FinancialMovementModal from "./FinancialMovementModal.vue";

export default defineComponent({
  name: 'FinancialMovements',
  components: {TextField, Table, FinancialMovementModal},
  props: {
    claim: {
      type: Object as PropType<ClaimType>
    }
  },
  setup(props) {
    const movements = ref([] as Array<FinancialMovementType>),
        total = ref(1), claim_id = props.claim.id

    function fetchMovements() {
      getFinancialMovements(props.claim.id)
          .then(({data}) => {
            console.log(data)
            movements.value.push(...data)
          })
    }

    onMounted(() => fetchMovements())
    return {movements, total, claim_id, fetchMovements}
  }
})
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
</style>
