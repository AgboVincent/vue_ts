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
        <v-col>
            <h5 class="title">Uploaded Vehicle images</h5>
            <v-row class="four-cols">
                 <v-col v-for="data in claim.uploads" :key="data.id">
                    <div v-if="data.type_id == 2">
                        <video 
                        style="object-fit:fill; width: 30vw; height:31vh;"
                        controls
                        >
                        <source
                            :src="`https://autoclaims.s3.us-east-2.amazonaws.com/${data.url}`"
                            type="video/mp4"
                        >
                        </video>
                    </div>
                     <v-img
                        :src="`https://autoclaims.s3.us-east-2.amazonaws.com/${data.url}`"
                        height="200px"
                        cover="true"
                        class="mx-auto white--text align-end"
                        >
                    </v-img>
                    </v-col> 
            </v-row>
        </v-col>
    </div>
</template>


<script lang="ts">

import {defineComponent, PropType} from "vue";
import {CollectionType} from "../../types";

export default defineComponent({
  name: "VehicleDetails",
  props: {
    claim: {
      type: Object as PropType<CollectionType>
    }
  },
  
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