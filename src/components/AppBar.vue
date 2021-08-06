<template>
  <div class="h-[80px] w-full flex items-center justify-between">
    <div class="w-1/2">
      <slot>
        <template>
          <router-link to="/" class="flex items-center" v-if="navigator">
            <v-icon size="large" class="mr-5">mdi-arrow-left</v-icon>
            {{ title || 'Back' }}
          </router-link>
        </template>
      </slot>
    </div>
    <v-avatar
        color="primary lighten-2"
        rounded
        v-text="'MJ'"
        size="40"
    />
  </div>
</template>
<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
  props: {
    navigator: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    }
  }
})
</script>
