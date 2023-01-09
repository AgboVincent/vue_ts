<template>
    <div>
        <div class="w-full pt-10">
            <div class="flex items-center mb-4 space-x-2">
                <TextField :data="policies" icon="mdi-search"
                        v-model="query"
                        :placeholder="$t('Search customers, emails')" class="bg-white !m-0 w-[300px]"/>
                <PoliciesFilter @filter="handleFilter($event)"/>                   
            </div>
            <PoliciesTable v-if="policies" :data="policies" :total="total" :page="currentPage"  @update:page="getPolicies"/>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref,watch } from "vue";
import PoliciesTable from "../components/PoliciesTable.vue";
import TextField from "../components/TextField.vue";
import PoliciesFilter from "../components/PoliciesFilter.vue";
import {getPurchasePolicies} from "../requests";


export default defineComponent({
    name: "Policies",
    components:{PoliciesTable, TextField, PoliciesFilter},
     setup() {
    const policies = ref([])
    const query = ref(null)
    const currentPage = ref(0)
    const total = ref(0)
    

    function getPolicies(page = 1, status?:string) {
      policies.value.splice(0)
      getPurchasePolicies(page, query.value, status)
          .then((res:any) => {  
              console.log(res)    
              let result = res.data as [];
              currentPage.value = res.current_page;
              total.value = res.last_page;
              policies.value.push(...result)
          })
    }

    function handleFilter(status: string) {
      getPolicies(1, status)
    }


    watch(query, () => getPolicies(1))

    onMounted(getPolicies)

    return {policies, getPolicies, total, currentPage, query, handleFilter}
  }
})
</script>