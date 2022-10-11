<template>
    <div>
        <AppBar>
            <p class="text-text-dark font-bold text-1xl">
                {{ $t('Self-Inspection') }}
            </p>
        </AppBar>
        <div class="w-full pt-10">
            <div class="flex items-center mb-4 space-x-2">
                <TextField :data="claims" icon="mdi-search"
                        v-model="query"
                        :placeholder="$t('Search customers, emails')" class="bg-white !m-0 w-[400px]"/>
                <!-- <ClaimsFilter @filter="handleFilter"/> -->
            </div>
            <InspectionTable v-if="reports" :data="reports"  @update:page="getReports"/>
        </div>

    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref,watch } from "vue";
import InspectionTable from "../components/InspectionTable.vue";
import TextField from "../components/TextField.vue";
import AppBar from "../components/AppBar.vue";
import {getSelfInspection} from "../requests";
export default defineComponent({
    name: "Inspection",
    components:{InspectionTable, TextField, AppBar},
     setup() {
    const reports = ref([])
    const query = ref(null)
    const currentPage = ref(0)
    const total = ref(0)

    function getReports(page = 1) {
      reports.value.splice(0)
      getSelfInspection(page)
          .then(data => {
            // currentPage.value = data.meta.currentPage
            // total.value = data.meta.last
            reports.value.push(...data.data)
            console.log(reports);
          })
    }

    watch(query, () => getReports(1))

    onMounted(getReports)

    // function handleFilter({ status } : {query: string}) {
    //   getReports(1, status)
    // }

    return {reports, getReports, total, currentPage, query}
  }
})
</script>


<style scoped>

</style>