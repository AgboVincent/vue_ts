<template>
    <div>
        <AppBar>
            <p class="text-text-dark font-bold text-1xl">
                {{ $t('Claims') }}
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
            <CollectionTable v-if="claims" :data="claims" :total="total" :page="currentPage"  @update:page="getClaims"/>
        </div>

    </div>
</template>


<script lang="ts">
import { defineComponent, onMounted, ref,watch } from "vue";
import CollectionTable from "../components/CollectionTable.vue";
import TextField from "../components/TextField.vue";
import AppBar from "../components/AppBar.vue";
import {getCollections} from "../requests";


export default defineComponent({
    name: "Collection",
    components:{CollectionTable, TextField, AppBar},
     setup() {
    const claims = ref([])
    const query = ref(null)
    const currentPage = ref(0)
    const total = ref(0)
    

    function getClaims(page = 1) {
      claims.value.splice(0)
      getCollections(page)
          .then((res: any) => {      
              console.log(res);
              let result = res.data as [];
              currentPage.value = res.current_page;
              total.value = res.last_page;
              claims.value.push(...result);
          })
    }


    watch(query, () => getClaims(1))

    onMounted(getClaims)

    return {claims, getClaims, total, currentPage, query}
  }
})
</script>


<style scoped>

</style>