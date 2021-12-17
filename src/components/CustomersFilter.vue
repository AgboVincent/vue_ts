<template>
  <ui-menu-anchor position="bottom right">
    <div
        class="bg-white cursor-pointer flex items-center border rounded-md p-3 text-[#A9A9AC] text-sm"
         @click="open = true"
    >
      <v-icon>mdi-filter</v-icon>
      <span class="w-1"/>
      {{ $t('Filter By') }}
      <span class="w-6"/>
      <v-icon>mdi-chevron-down</v-icon>
    </div>
    <ui-menu v-model="open">
      <div class="w-[380px] text-sm -my-2">
        <p class="w-full bg-[#F2F7F9] py-[11px] px-[20px]">{{ $t('Status') }}</p>
        <div class="w-full space-x-3 py-[11px] px-[20px] flex">
          <p>
            <input type="radio" v-model="status" value="expired"/> {{ $t('Expired') }}
          </p>
          <p>
            <input type="radio" v-model="status" value="active"/> {{ $t('Active') }}
          </p>
        </div>

        <div class="w-dull border-t flex justify-between p-[20px] pb-[15px] mt-[15px]">
          <v-btn height="30" color="transparent" @click="clear">{{ $t('Clear') }}</v-btn>
          <v-btn height="30" @click="filter">{{ $t('Filter') }}</v-btn>
        </div>
      </div>
    </ui-menu>
  </ui-menu-anchor>
</template>
<script lang="ts" setup>
import {ref} from "vue"

const status = ref(''),
    open = ref(false),
    emit = defineEmits(['filter'])

function filter() {
  emit('filter', {status: status.value})
  open.value = false
}

function clear() {
  status.value = ''
  filter()
}
</script>
<style scoped lang="scss"></style>
