<template>
  <div>

    <div class="grid grid-cols-3 gap-x-4 mt-5">
      <div class="flex items-center pl-6 pr-5 justify-between pt-10 pb-9 rounded bg-white mr-10" v-for="view in overview"
          :key="`summary:${view.key}`">
        <p class="text-text">
          {{ $t(view.name) }}
          <span class="text-2xl text-primary-deep font block" v-text="view.value"/>
        </p>
        <div class="w-[40px] h-[40px] grid place-items-center bg-secondary">
          <v-icon size="large" color="primary">
            mdi-car-settings
          </v-icon>
        </div>
      </div>
    </div>

    <div class="w-full pt-11" v-if="claims.length > 0">
      <p class="text-lg font-semibold text-text-dark mb-5">Urgent Claims</p>
      <CollectionTable :data="claims"/>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import TextField from "../components/TextField.vue";
import CollectionTable from "../components/CollectionTable.vue";
import {CLAIM_STATUS_PENDING} from "../constants";
import {getCollections, fetchOverviewRequest} from "../requests";

export default defineComponent({
  name: 'Dashboard',
  components: {CollectionTable, TextField},
  setup() {
    const claims = ref([])
    const overview = ref([
      {name: 'Total Claims', value: 0, key: 'total_claims'},
      {name: 'Processed Claims', value: 0, key: 'processed_claims'},
      {name: 'Pending Claims', value: 0, key: 'pending_claims'},
      // {
      //   name: 'Claims Value', value: 0, key: 'claims_value', format(value) {
      //     return parseFloat(value).toLocaleString('fr-FR', {currency: 'CFA', style: 'currency'})
      //   }
      // },
    ])

    function fetchPendingClaims() {
      getCollections(1, null, CLAIM_STATUS_PENDING, null)
          .then((res:any) => {
            let result = res.data as [];
            claims.value.push(...result)
          })
    }

    function fetchOverview() {
      fetchOverviewRequest()
          .then((data:any) => {
            Object.entries(data)
                .forEach(([key, value]) => {
                  const found = overview.value.find((a) => a.key === key)
                  if (found.format) {
                    found.value = found.format(value) as number
                  } else {
                    found.value = value as number
                  }
                })
          })
    }

    onMounted(fetchPendingClaims)
    onMounted(fetchOverview)

    return {claims, overview}
  }
})
</script>
