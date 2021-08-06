<template>
  <AppBar>
    <TextField icon="mdi-search" placeholder="Search customers, emails , claim references" class="bg-white !m-0"/>
  </AppBar>

  <p class="text-primary-deep text-bold pt-12 pb-10 text-2xl">Dashboard</p>

  <div class="grid grid-cols-4 gap-x-4">
    <div class="flex items-center px-10 justify-between py-10 rounded bg-white" v-for="i in 4"
         :key="`summary:${i}`">
      <p class="text-text">
        Total Claims
        <span class="text-2xl text-primary-deep font block">
                1200
              </span>
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
import {getClaimsRequest} from "../requests";

export default defineComponent({
  name: 'Dashboard',
  components: {ClaimsTable, TextField, AppBar},
  setup() {
    const claims = ref([])

    function fetchPendingClaims() {
      getClaimsRequest(1, null, CLAIM_STATUS_PENDING)
          .then(({data}) => {
            claims.value.push(...data.data)
          })
    }

    onMounted(fetchPendingClaims)

    return { claims }
  }
})
</script>
