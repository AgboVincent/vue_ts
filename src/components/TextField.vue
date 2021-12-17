<template>
  <div class="mt-7 w-full">
    <p v-if="label" class="pb-2 text-text text-xs">{{ $t(label) }}</p>
    <div class="relative flex items-center border rounded-md p-3 w-full">
      <v-icon color="#DBDBDB" v-if="icon">{{ icon }}</v-icon>
      <textarea
          v-if="type === 'textarea'"
          :rows="rows"
          class="text-text-dark outline-none text-sm pl-4 flex-grow"
          :value="modelValue"
          :placeholder="$t(placeholder)"
          @input="$event => $emit('update:modelValue', $event.target.value)"
      />
      <div
          class="flex-grow"
          v-else-if="type === 'select'">
        <select
            class="pl-4 text-text-dark outline-none text-sm w-full"
            @change="handleSelectChange"
            :value="modelValue">
          <option selected disabled value="">{{ $t(placeholder) ?? $t(label) }}</option>
          <option v-for="(option, index) in options"
                  :key="`option::${index}`"
                  :value="option.value">
            {{ $t(shrinkText(option.label, 70)) }}
          </option>
        </select>
      </div>
      <input class="text-text-dark outline-none text-sm pl-4 flex-grow" :value="modelValue"
             v-else
             :placeholder="$t(placeholder)" :type="type"
             v-bind='{change: $attrs.change}'
             @input="$event => $emit('update:modelValue', $event.target.value)"
      />
    </div>
    <p v-if="error" class="text-[#E54D54] text-xs">{{ error.toString() }}</p>
  </div>
</template>

<script lang="ts">
import {defineComponent, PropType, SetupContext} from 'vue';

export default defineComponent({
  name: 'TextField',
  props: {
    options: {type: Array as PropType<Array<{ value: String | Number, label: String | Number }>>, default: null},
    label: {type: String, default: null},
    type: {type: String, default: 'text'},
    placeholder: {type: String, default: null},
    icon: {type: String, default: null},
    modelValue: {type: [String, Number], default: ''},
    rows: {type: [Number, String], default: 3},
    error: {type: String, default: ''}
  },
  emits: ['update:modelValue'],
  setup(_, { emit }: SetupContext) {
    function handleSelectChange(event) {
      emit('update:modelValue', event.target.value)
    }

    return {handleSelectChange}
  }
});
</script>

<style scoped lang="scss">

</style>
