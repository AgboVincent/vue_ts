<template>
  <div class="grid grid-cols-4 gap-10">
    <template v-for="(picture, index) in imageDim" :key="index">
      <a :href="picture[2]" v-if="['png','jpg','jpeg'].includes(picture[3])" target="_blank">
          <div v-if="picture[1]">
            <div class="canvas-wrapper" :style="{width: `${picture[1]*0.2}px`, height:`${picture[0]*0.2}px`}">
              <div>
                <img
                :src="picture[2]"
                :alt="$t('Vehicle')"
                :style="{height:`${picture[0]*0.2}px`}"
                />
                <bounding-box :height="`${picture[0]*0.2}px`" :width="`${picture[1]*0.2}px`" :key="box" :box="picture[4]"></bounding-box> 
              </div>
            </div>
          </div>
      </a>
      <br>
      <!-- <video controls :src="picture.file.path" v-else-if="picture.file.mime.includes('video')"></video>
      <a :href="picture.file.path" v-else target="_blank">{{$t('Download Document')}}</a> -->
    </template>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, PropType} from "vue";
import {ClaimType} from "../../types";
import BoundingBox from "../BoundingBox.vue"

export default defineComponent({
  name: 'ClaimPictures',
  components:{BoundingBox},
  props: {
    claim: {
      type: Object as PropType<ClaimType>
    }
  },
  setup(props) {
    const pictures = computed(() => props.claim.accident.documents)
    return {pictures}
  },

  data(){
    return{
      imagesData: this.claim.accident.documents,
      imageDim:[],
      boxes: [
        [26.626176834106445, 23.100643157958984, 588.66162109375, 339.85467529296875], 
        [113.29367065429688, 105.9692153930664, 347.6188659667969, 284.2013854980469], 
        [ 626.4362182617188, 44.74245071411133, 1084.898193359375, 494.5235900878906], 
        [26.544559478759766, 52.437191009521484, 605.413818359375, 375.4856872558594], 
      ]
    }
  },
  methods: {
      getImageSizesLoopStyle(){
      for(let i = 0; i < 4; i++){
        let newImg = new Image();
        newImg.src =  this.imagesData[i].file.path;
        newImg.onload = () => {
        let height =  newImg.height;
        let width = newImg.width;
        let dim = [height, width, this.imagesData[i].file.path, this.imagesData[i].file.ext];
        dim.push(this.boxes[i]);
        this.imageDim.push(dim);
        console.log(this.imageDim)
        }
      }
    }
  },
  mounted(){
    this.getImageSizesLoopStyle();
  }
})
</script>

<style lang="scss" scoped>
.canvas-wrapper{
  position: relative;
  object-fit: fill;
}
</style>
