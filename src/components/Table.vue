<template>
  <table class="table">
    <thead class="text-lg text-text">
    <tr>
      <th v-for="title in headers" :key="`table-header:${title}`">
        {{ title }}
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(item, index) in items" :key="`item:${index}`" class="text-text-dark">
      <slot :item="item" :index="index"/>
    </tr>
    </tbody>
    <tfoot v-if="totalPages > 1">
    <tr>
      <td colspan="100">
        <div class="flex flex-row-reverse">
          <v-pagination
              :length="totalPages"
              total-visible="5"
              :modelValue="page"
              @update:modelValue="$event => $emit('update:page', $event)"
          />
        </div>
      </td>
    </tr>
    </tfoot>
  </table>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";

export default defineComponent({
  name: 'Table',
  props: {
    headers: {
      type: Array as PropType<Array<string>>,
      default: []
    },
    totalPages: {
      type: Number,
      default: 1
    },
    items: {
      type: Array,
      default: []
    },
    page: {
      type: Number,
      default: null
    }
  },
  emits: ['update:page']
});
</script>

<style scoped lang="scss">
.table {
  @apply table-auto bg-white w-full rounded text-base border-collapse shadow mb-1;

  thead > tr > th {
    @apply p-4 text-left font-semibold border-b text-sm;
  }

  tbody > tr > :deep(td) {
    @apply p-4 border-b text-sm;
  }
}
</style>
