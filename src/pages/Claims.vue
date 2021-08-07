<template>
  <AppBar>
    <p class="text-text-dark text-bold text-2xl">
      Claims
      <span class="text-base block text-text pt-1">
        All claims submitted by the customers can be found here
      </span>
    </p>
  </AppBar>
  <div class="w-full pt-10">
    <div class="flex items-center mb-4">
      <TextField :data="claims" icon="mdi-search"
                 placeholder="Search customers, emails , claim references" class="bg-white !m-0 w-[400px]"/>
    </div>
    <ClaimsTable v-if="claims" :data="claims" :total="total" :page="currentPage" @update:page="getClaims"/>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, watch} from "vue";
import AppBar from "../components/AppBar.vue";
import TextField from "../components/TextField.vue";
import ClaimsTable from "../components/ClaimsTable.vue";
import {getClaimsRequest} from "../requests";

export default defineComponent({
  name: 'Claims',
  components: {ClaimsTable, TextField, AppBar},
  setup() {
    const claims = ref([])
    const currentPage = ref(0)
    const total = ref(0)

    function getClaims(page =1 ) {
      claims.value.splice(0)
      getClaimsRequest(page)
          .then(({data}) => {
            currentPage.value = data.meta.currentPage
            total.value = data.meta.last
            claims.value.push(...data.data)
          })
    }

    onMounted(getClaims)

    return {claims, getClaims, total, currentPage}
  }
})
</script>
