<template>
    <div>
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
        
    </div>
</template>


<script lang="ts">
import {defineComponent,ref} from "vue"


export default defineComponent({
    name: "InspectionFilter",
    emits: {
        filter: (date: object) => true,
    },
     setup(props, {emit}) {
        const open = ref(false),
        startDate = ref(null),
        endDate = ref(null)

        function filter() {
        emit('filter', {
            startDate: startDate.value,
            endDate: endDate.value
        })
        open.value = false
        }

        function clear() {
        startDate.value = null;
        endDate.value = null;
        filter()
        }
       return { open, emit, filter, clear, startDate, endDate}
  }
})
</script>