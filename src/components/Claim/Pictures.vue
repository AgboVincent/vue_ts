<template>
  <div class="grid grid-cols-4 gap-10">
    <template v-for="(picture, index) in claim.accident.documents" :key="index">
      <a :href="picture.file.path" v-if="['png','jpg','jpeg'].includes(picture.file.ext)" target="_blank">
        <img
            :src="picture.file.path"
            alt="Vehicle"/>
      </a>
      <video controls :src="picture.file.path" v-else-if="picture.file.mime.includes('video')"></video>
      <a :href="picture.file.path" v-else target="_blank">Download Document</a>
    </template>
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
    const pictures = computed(() => props.claim.accident.documents)
    return {pictures}
  }
})
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
</style>
