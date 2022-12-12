<template>
    <div>
        <v-col>
             <v-row>
                <v-col>
                    <h5 class="title">Vehicle make</h5>
                    <h5 class="text">{{claim.user.manufacturer}}</h5>
                </v-col>

                <v-col>
                    <h5 class="title">Vehicle type</h5>
                    <h5 class="text">{{claim.user.model}}</h5>
                </v-col>
             </v-row>
        </v-col>
        <br>
        <v-col>
            <v-row>
                <v-col>
                    <h5 class="title">Registration number</h5>
                    <h5 class="text">{{claim.user.vehicle_regno}}</h5>
                </v-col>
                
                <v-col>
                    <h5 class="title">Car color</h5>
                    <h5 class="text">{{claim.user.color}}</h5>
                </v-col>
            </v-row>
        </v-col>
        <br>
        <v-col>
            <v-row>
                <v-col>
                    <h5 class="title">VIN</h5>
                    <h5 class="text">{{claim.user.chassis_number}}</h5>
                </v-col>
                
                <v-col>
                    <h5 class="title">Car year</h5>
                    <h5 class="text">{{claim.user.year}}</h5>
                </v-col>
            </v-row>
        </v-col>
        <br>
        <v-col v-if="claim.damages">
            <v-divider></v-divider>
            <h5 class="text my-3">Detected Damages</h5>
            <v-row v-for="(damage, index) in damages" :key="damage.id">
            <h5 class="title mx-2 my-2">{{ index+1 }}. {{damage}}</h5>
            </v-row>
        </v-col>
        <br>
        <v-col v-if="claim.quotes">
            <v-divider></v-divider>
            <h5 class="text my-3">Repair Quotes</h5>
            <v-row v-for="(quotes, index ) in claim.quotes" :key="quotes.id">
                <h5 class="title mx-2 my-2">{{index+1}}. Name: {{ quotes.name  }}</h5>
                <h5 class="title mx-2 my-2">Amount: NGN{{quotes.amount}}</h5>
                <h5 class="title mx-2 my-2">Quantity: {{quotes.quantity}}</h5>
                <br>
            </v-row>
        </v-col>
        <v-divider></v-divider>
        <br>
        <v-col>
            <h5 class="text my-3">Uploaded Vehicle images</h5>
            <v-row class="four-cols">
                 <v-col v-for="data in claim.uploads" :key="data.id">
                    <div v-if="data.type_id == 2">
                        <video 
                        style="object-fit:fill; width: 30vw; height:24vh;"
                        @click="selectedImage(data)"
                        >
                        <source
                            :src="url(data.url)"
                            type="video/mp4"
                        >
                        </video>
                    </div>
                     <v-img
                        :src="url(data.url)"
                        height="200px"
                        cover="true"
                        class="mx-auto white--text align-end"
                        @click="selectedImage(data)"
                        >
                    </v-img>
                </v-col> 
            </v-row>
        </v-col>
        <v-dialog
            v-model="dialog"
            color="#F6FAFD"
            class="mx-auto mb-10"
            
        >
            <v-card width="600px" height="500px">
                <v-row class="justify-end">
                    <v-icon size="small" class="mt-5 mr-5 mb-5"
                        @click="dialog = false">
                        mdi-close
                    </v-icon>
                </v-row>
            <div>
                <video 
                v-if="video"
                width="200"
                class="mx-auto"
                controls
                style="object-fit:fill; width: 34vw; height: 50vh;"
                height="0">
                <source
                    :src="url(filePath)"
                    type="video/mp4"
                >
                </video>
                <v-img
                    v-else
                    :src="url(filePath)"
                    height="380px"
                    width="480px"
                    cover="true"
                    class="mx-auto white--text align-end"
                    >
                </v-img>

            </div>
          </v-card>
       </v-dialog>
    </div>
</template>


<script lang="ts">

import {defineComponent, onMounted, PropType, ref} from "vue";
import {CollectionType} from "../../types";

export default defineComponent({
  name: "VehicleDetails",
  props: {
    claim: {
      type: Object as PropType<CollectionType>
    }
  },
  setup(props){
      const dialog = ref(false)
      const video = ref(false)
      const filePath = ref('')
      const damages = ref([])

      function url(path:any){
            return `https://autoclaims.s3.us-east-2.amazonaws.com/${path}`
      }
      function selectedImage(data:any){
          dialog.value = true;
          filePath.value = data.url;
          if(data.type_id == 2){
              video.value = true
          }
          else{
              video.value = false;
          }
      }

      function getDamages(){
          if(props.claim.damages){
             damages.value = Object.values(props.claim.damages);
          }
      }
      
      onMounted(getDamages)

      return {
      dialog,
      video,
      url,
      selectedImage,
      filePath,
      damages
  }
  }
  
})
</script>

<style scoped>
.title{
    color: #5E626A;
    font-size: 14px;
    font-weight: 400;
}
.text{
    color: #030124;
    font-size: 16px;
    font-weight: 400;
}
.four-cols{
    display: grid;
    grid-template-columns: repeat(4, 1fr);
}
</style>