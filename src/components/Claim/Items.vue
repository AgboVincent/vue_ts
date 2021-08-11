<template>
  <div class="w-full flex -my-5">
    <div class="w-2/3">
      <Table></Table>
    </div>
    <div class="w-1/3 p-10 pb-32 border-l">
      <img
          :src="pictures[0]?.file.path"
          alt="Vehicle"
          class="w-full rounded"
          :key="`vehicle:image:${index}`"/>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {ClaimType} from "../../types";
import Table from './../Table.vue'

export default defineComponent({
  name: 'ClaimItems',
  components: {Table},
  props: {
    claim: {
      type: Object as PropType<ClaimType>
    }
  },
  setup(props) {
    const pictures = computed(() => props.claim.accident.documents.filter(document => document.file.mime.includes('image')))
    return {pictures}
  }
})
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
</style>
/
