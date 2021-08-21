<script lang="ts" setup>
import SVGAlert from "./SVGAlert.vue";
</script>
<template>
<div class="w-full bg-[#FFF1F0] border border-[#FFA39E] p-4 flex rounded-lg text-black">
  <SVGAlert class="fill-current text-transparent flex-shrink-0 mr-4"/>
  <div class="text-sm">
    <slot></slot>
  </div>
</div>
</template>
<style lang="scss" scoped>
</style>
