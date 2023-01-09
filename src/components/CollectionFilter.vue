<template>
    <v-row>
        <ui-menu-anchor position="bottom right">
            <div
                class="bg-white cursor-pointer flex items-center border rounded-md p-3 text-[#A9A9AC] text-sm mr-2"
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
                <div class="w-full space-x-3 py-[11px] px-[20px] flex">
                <p>
                    <input type="radio" v-model="status" value="Pending"/> Pending
                </p>
                <p>
                    <input type="radio" v-model="status" value="Approved"/> Approved
                </p>
                <p>
                    <input type="radio" v-model="status" value="Rejected"/> Rejected
                </p>
                </div>

                <div class="w-dull border-t flex justify-between p-[20px] pb-[15px] mt-[15px]">
                <v-btn height="30" color="transparent" @click="clear">Clear</v-btn>
                <v-btn height="30" @click="filter">Filter</v-btn>
                </div>
            </div>
            </ui-menu>
        </ui-menu-anchor>
        <ui-menu-anchor position="bottom right">
        <div
            class="bg-white cursor-pointer flex items-center border rounded-md p-3 text-[#A9A9AC] text-sm px-2"
            @click="openDate = true"
        >
            <v-icon>mdi-calendar-month</v-icon>
            <span class="w-1"/>
            All Time
            <span class="w-6"/>
            <v-icon>mdi-chevron-down</v-icon>
        </div>
        <ui-menu v-model="openDate">
        <div class="w-[380px] text-sm -my-2">
            <p class="w-full bg-[#F2F7F9] py-[11px] px-[20px]">Date</p>
            <div class="w-full space-x-3 py-[11px] px-[20px] flex">
            <v-col>
                <h5 class="py-2">Start Date</h5>
                <input type="date" id="date" v-model="startDate" 
                       style="border: 1px solid #000000;">
            </v-col>
            <v-col>
                <h5 class="py-2">End Date</h5>
                <input type="date" id="date" v-model="endDate" 
                       style="border: 1px solid #000000;">
            </v-col>
            </div>

            <div class="w-dull border-t flex justify-between p-[20px] pb-[15px] mt-[15px]">
            <v-btn height="30" color="transparent" @click="clear">Clear</v-btn>
            <v-btn height="30" @click="filter">Filter</v-btn>
            </div>
        </div>
        </ui-menu>
        </ui-menu-anchor>
    </v-row>
</template>

<script lang="ts">
import {defineComponent,ref} from "vue"


export default defineComponent({
    name: "CollectionFilter",
    emits: {
        filter: (status: string) => true,
        dateRange: (date: object) => true
    },
     setup(props, {emit}) {
        const status = ref(''),
        open = ref(false),
        openDate = ref(false),
        startDate = ref(null),
        endDate = ref(null)
        

        function filter(){
            if(status.value){
                emit('filter',  status.value)
                open.value = false;
            }

            if(startDate.value && endDate.value){
                emit('dateRange', {
                startDate: startDate.value,
                endDate: endDate.value
                })
                openDate.value = false;
            }
        }

        function clear() {
            status.value = '';
            startDate.value = null;
            endDate.value = null;
            filter()
        }
       return { open, emit, filter, clear, status, openDate, startDate, endDate}
  }
})
</script>