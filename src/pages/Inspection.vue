<template>
    <div>
        <div class="w-full pt-10">
            <div class="flex items-center mb-4 space-x-2">
                <TextField :data="reports" icon="mdi-search"
                        v-model="query"
                        :placeholder="'Search customers, emails'" class="bg-white !m-0 w-[300px]"/>      
                <InspectionFilter @filter="handleFilter($event)"/>          
            </div>
            <InspectionTable v-if="reports" :data="reports" :total="total" :page="currentPage"  @update:page="getReports"/>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref,watch } from "vue";
import InspectionTable from "../components/InspectionTable.vue";
import TextField from "../components/TextField.vue";
import InspectionFilter from "../components/InspectionFilter.vue";
import {getSelfInspection} from "../requests";


export default defineComponent({
    name: "Inspection",
    components:{InspectionTable, TextField, InspectionFilter},
     setup() {
    const reports = ref([])
    const query = ref(null)
    const currentPage = ref(0)
    const total = ref(0)
    

    function getReports(page = 1, dateRange?: object) {
      reports.value.splice(0)
      getSelfInspection(page, query.value, dateRange)
          .then((res:any) => {      
              console.log(res);
              let result = res.data as [];
              currentPage.value = res.current_page;
              total.value = res.last_page;
              reports.value.push(...result);
          })
    }


    watch(query, () => getReports(1))

    function handleFilter(dateRange: object) {
      getReports(1, dateRange)
    }

    onMounted(getReports)

    return {reports, getReports, total, currentPage, query, handleFilter}
  }
})
</script>


<style scoped>

</style>