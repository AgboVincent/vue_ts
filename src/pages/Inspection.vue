<template>
    <div>
        <AppBar>
            <p class="text-text-dark font-bold text-1xl">
                {{ $t('Self-Inspection') }}
            </p>
        </AppBar>
        <div class="w-full pt-10">
            <div class="flex items-center mb-4 space-x-2">
                <TextField :data="reports" icon="mdi-search"
                        v-model="query"
                        :placeholder="$t('Search customers, emails')" class="bg-white !m-0 w-[300px]"/>
                  <ui-menu-anchor position="bottom right">
                    <div
                        class="bg-white cursor-pointer flex items-center border rounded-md p-3 text-[#A9A9AC] text-sm"
                        @click="open = true"
                    >
                        <v-icon>mdi-filter</v-icon>
                        <span class="w-1"/>
                        Select status
                        <span class="w-6"/>
                        <v-icon>mdi-chevron-down</v-icon>
                    </div>
                    <ui-menu v-model="open">
                    <div class="w-[380px] text-sm -my-2">
                        <p class="w-full bg-[#F2F7F9] py-[11px] px-[20px]">Status</p>
                        <div class="w-full space-x-3 py-[11px] px-[20px]">                        
                            <p value="pending">Pending </p>                      
                            <p value="approved"> Approved </p>                       
                            <p value="rejected"> Rejected  </p>                  
                        </div>
                    </div>
                    </ui-menu>
                  </ui-menu-anchor>
                  <ui-menu-anchor position="bottom right">
                    <div
                        class="bg-white cursor-pointer flex items-center border rounded-md p-3 text-[#A9A9AC] text-sm"
                        @click="open = true"
                    >
                        <v-icon>mdi-calendar-month</v-icon>
                        <span class="w-1"/>
                        All Time
                        <span class="w-6"/>
                        <v-icon>mdi-chevron-down</v-icon>
                    </div>
                    <ui-menu v-model="open">
                    <div class="w-[380px] text-sm -my-2">
                        <p class="w-full bg-[#F2F7F9] py-[11px] px-[20px]">Status</p>
                        <div class="w-full space-x-3 py-[11px] px-[20px]">                        
                            <p value="pending">Pending </p>                      
                            <p value="approved"> Approved </p>                       
                            <p value="rejected"> Rejected  </p>                  
                        </div>
                    </div>
                    </ui-menu>
                  </ui-menu-anchor>
            </div>
            <InspectionTable v-if="reports" :data="reports" :total="total" :page="currentPage"  @update:page="getReports"/>
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
              let result = data as [];
              reports.value.push(...result);
              reports.value.reverse();
          })
    }


    watch(query, () => getReports(1))

    onMounted(getReports)

    return {reports, getReports, total, currentPage, query}
  }
})
</script>


<style scoped>

</style>