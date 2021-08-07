<template>
  <AppBar>
    <TextField icon="mdi-search" placeholder="Search customers, emails , claim references" class="bg-white !m-0"/>
  </AppBar>

  <p class="text-primary-deep text-bold pt-12 pb-10 text-2xl">Dashboard</p>

  <div class="grid grid-cols-4 gap-x-4">
    <div class="flex items-center px-10 justify-between py-10 rounded bg-white" v-for="view in overview"
         :key="`summary:${view.key}`">
      <p class="text-text">
        {{ view.name }}
        <span class="text-2xl text-primary-deep font block" v-text="view.value"/>
      </p>
      <div class="w-[40px] h-[40px] grid place-items-center bg-secondary">
        <v-icon size="large" color="primary">
          mdi-car-settings
        </v-icon>
      </div>
    </div>
  </div>

  <div class="w-full pt-10" v-if="claims.length > 0">
    <p class="text-lg text-text-dark mb-2">Pending Claims</p>
    <ClaimsTable :data="claims"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref} from "vue";
import AppBar from "../components/AppBar.vue";
import TextField from "../components/TextField.vue";
import ClaimsTable from "../components/ClaimsTable.vue";
import {CLAIM_STATUS_PENDING} from "../constants";
import {getClaimsRequest, overviewRequest} from "../requests";

export default defineComponent({
  name: 'Dashboard',
  components: {ClaimsTable, TextField, AppBar},
  setup() {
    const claims = ref([])
    const overview = ref([
      {name: 'Total Claims', value: 0, key: 'total_claims'},
      {name: 'Processed Claims', value: 0, key: 'processed_claims'},
      {name: 'Pending Claims', value: 0, key: 'pending_claims'},
      {
        name: 'Claims Value', value: 0, key: 'claims_value', format(value) {
          return parseFloat(value).toLocaleString('en-NG', {currency: 'NGN', style: 'currency'})
        }
      },
    ])

    function fetchPendingClaims() {
      getClaimsRequest(1, null, CLAIM_STATUS_PENDING)
          .then(({data}) => {
            claims.value.push(...data.data)
          })
    }

    function fetchOverview() {
      overviewRequest()
          .then(({data}) => {
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
