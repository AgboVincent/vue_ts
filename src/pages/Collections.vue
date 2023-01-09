<template>
    <div>
        <div class="w-full pt-10">
            <div class="flex items-center mb-4 space-x-2">
                <TextField :data="claims" icon="mdi-search"
                        v-model="query"
                        :placeholder="$t('Search customers, emails')" class="bg-white !m-0 w-[300px]"/>
                <CollectionFilter @filter="handleStatusFilter($event)" @dateRange="handleDateFilter($event)"/>    
            </div>
            <CollectionTable v-if="claims" :data="claims" :total="total" :page="currentPage"  @update:page="getClaims"/>
        </div>
    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref,watch } from "vue";
import CollectionTable from "../components/CollectionTable.vue";
import TextField from "../components/TextField.vue";
import AppBar from "../components/AppBar.vue";
import CollectionFilter from "../components/CollectionFilter.vue";
import {getCollections} from "../requests";


export default defineComponent({
    name: "Collection",
    components:{CollectionTable, TextField, AppBar, CollectionFilter},
     setup() {
    const claims = ref([])
    const query = ref(null)
    const currentPage = ref(0)
    const total = ref(0)
    

    function getClaims(page = 1, status?:string, dateRange?: object) {
      claims.value.splice(0)
      getCollections(page, query.value, status, dateRange)
          .then((res: any) => {      
              console.log(res);
              let result = res.data as [];
              currentPage.value = res.current_page;
              total.value = res.last_page;
              claims.value.push(...result);
          })
    }
    
    function handleDateFilter(dateRange: object) {
      getClaims(1, null, dateRange)
    }

    function handleStatusFilter(status: string) {
      getClaims(1, status, null)
    }
    

    watch(query, () => getClaims(1))

    onMounted(getClaims)

    return {claims, getClaims, total, currentPage, query, handleDateFilter,
            handleStatusFilter}
  }
})
</script>


<style scoped>

</style>