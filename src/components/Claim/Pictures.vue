<template>
  <div class="grid grid-cols-4 gap-10">
    <img
        :src="picture.file.path"
        alt="Vehicle"
        v-for="(picture, index) in claim.accident.documents"
        :key="`vehicle:image:${index}`"/>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {ClaimType} from "../../types";

export default defineComponent({
  name: 'ClaimPictures',
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
