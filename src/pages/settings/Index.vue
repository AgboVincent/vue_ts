<template>
  <AppBar title="Settings" :navigator="false" />
  <div class="bg-white w-full rounded overflow-hidden">
    <div class="tabs">
      <router-link :to="`/settings/${tab.toString().toLowerCase()}`"
         v-for="(tab, tabIndex) in tabs"
         class="tab"
         :key="`tabs:${tabIndex}`">{{ tab }}</router-link>
    </div>
    <div class="pt-[43px] pb-[100px] px-[40px]">
    <router-view/>
    </div>
  </div>
</template>
<script lang="ts" setup>
import AppBar from "../../components/AppBar.vue";
import {ref} from "vue";
const tabs = ref(['Profile', 'Password'])
</script>

<style scoped lang="scss">
.tabs {
  @apply mt-2 w-full flex items-center border-b pl-4;

  .tab {
    @apply mx-5 py-5 font-normal text-xs;

    &.active {
      @apply font-bold border-b-2 text-primary border-primary;
    }
  }
}
</style>
