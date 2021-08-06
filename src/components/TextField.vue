<template>
  <div class="mt-10 w-full">
    <p v-if="label" class="pb-2 text-text">{{ label }}</p>
    <div class="relative flex items-center border rounded-md p-3 w-full">
      <v-icon color="#DBDBDB" v-if="icon">{{ icon }}</v-icon>
      <input class="text-text-dark outline-none pl-4 flex-grow" :value="modelValue"
             :placeholder="placeholder" :type="type"
             @input="$event => $emit('update:modelValue', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
import {defineComponent} from 'vue';

export default defineComponent({
  name: 'TextField',
  props: {
    label: {type: String, default: ''},
    type: {type: String, default: 'text'},
    placeholder: {type: String, default: ''},
    icon: {type: String, default: null},
    modelValue: {type: String, default: ''},
  },
  emits: ['update:modelValue']
});
</script>

<style scoped lang="scss">

</style>
