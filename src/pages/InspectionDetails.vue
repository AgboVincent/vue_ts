<template>
    <div>
        <v-col>
             <div class="d-flex align-items-start">
                <v-btn  height="30" elevation="0" class="back-btn px-2 my-3" @click="$router.back()"> 
                    <img class="pb-1 pr-2" src="../assets/arrow_back.png"> Back
                </v-btn>
             </div>
              <div class="my-2">
                    <h5  class=" text-bold  font-bold text-1xl align-items-start">Inspection Details</h5> 
              </div>
        </v-col>
        <v-layout class="row mt-5 ">
            <v-col v-if="data">
                <v-col>
                     <p  class="title d-flex align-items-start">Policy Holder</p> 
                     <p  class="text d-flex align-items-start">{{ data.name}}</p>
                </v-col>
                <br>
                <v-col>
                     <h5  class="title d-flex align-items-start">Email Address</h5> 
                     <h5  class="text d-flex align-items-start">{{ data.email }}</h5>
                </v-col>
                <br>
                <v-col>
                     <h5  class="title d-flex align-items-start">Policy Number</h5> 
                     <h5  class="text d-flex align-items-start">I234590883</h5>
                </v-col>
                <br>
                <v-col>
                     <h5  class="title d-flex align-items-start">Date of Inspection</h5> 
                     <h5  class="text d-flex align-items-start">{{formatDateTime(data.created_at)}}</h5>
                </v-col>
                <br>
                <v-col>
                     <h5  class="title d-flex align-items-start">VIN</h5> 
                     <h5  class="text d-flex align-items-start">{{data.chassis_number}}</h5>
                </v-col>
            </v-col>
            
            <v-row class="two-cols">
                    <v-col v-for="data in data.uploads" :key="data.id">
                     <v-card 
                    class="mx-auto "
                    max-width="300"
                    height="300px"
                    outlined
                    elevation="1" 
                    color="#F6FAFD"
                    @click="selectedPart(data)"       
                    >
                    <div v-if="data.vehicle_part == 'video'">
                        <video 
                        :key="video"
                        width="150"
                        class="mx-auto"
                        controls
                        height="150">
                        <source
                            :src="url(data.url)"
                            type="video/mp4"
                        >
                        </video>
                        <v-card-title>
                        {{ data.vehicle_part }}
                        </v-card-title>

                        <v-card-subtitle>
                         {{ data.result }}
                        </v-card-subtitle>
                    </div>
                    <v-img
                        :src="url(data.url)"
                        height="200px"
                        class="mx-auto white--text align-end"
                        >
                    </v-img>

                        <v-card-title>
                        {{ data.vehicle_part }}
                        </v-card-title>

                        <v-card-subtitle>
                         {{ data.result }}
                        </v-card-subtitle>
                    </v-card>
                    </v-col>
            </v-row>
        </v-layout>
            <v-row>
                <v-dialog
                v-model="dialog"
                color="#F6FAFD"
                 persistent
                class="mx-auto mb-10"
                >
                <v-card>
                    <v-row class="justify-end">
                        <v-icon size="small" class="mt-5 mr-5"
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
                        height="0">
                        <source
                            :src="url(newurl)"
                            type="video/mp4"
                        >
                        </video>
                    <v-img
                         v-else
                        :src="url(newurl)"
                        height="300px"
                        width="400px"
                        class="mx-auto white--text align-end"
                        >
                    </v-img>

                    </div>

                    <v-row class="mx-3">
                        <v-col>
                            <v-col>
                                 <h5 class="title">Severity</h5>
                                 <h5 class="text">{{result}}</h5>
                            </v-col>
                            <br>
                            
                            <v-col>
                                 <h5 class="title">Vehicle make</h5>
                                 <h5 class="text">{{ data.manufacturer }}</h5>
                            </v-col>
                            <br>
                            
                        </v-col>
                         <v-col>
                            <v-col>
                                 <h5 class="title">Vehicle part</h5>
                                 <h5 class="text">{{part}}</h5>
                            </v-col>
                            <br>
                            
                            <v-col>
                                 <h5 class="title">Vehicle model</h5>
                                 <h5 class="text">{{data.model}}</h5>
                            </v-col>
                            <br>
                            
                        </v-col>
                         <v-col>
                            <v-col>
                                 <h5 class="title">Date of inspection</h5>
                                 <h5 class="text">{{formatDateTime(data.created_at)}}</h5>
                            </v-col>
                            
                            <v-col>
                                 <h5 class="title">Year of manufacture</h5>
                                 <h5 class="text">{{data.year}}</h5>
                            </v-col>
                            <br>
                            
                        </v-col>

                    </v-row>
                </v-card>
                </v-dialog>
            </v-row>
    </div>
</template>


<script>
import {getSelfInspectionRequest} from "../requests";
export default {
    name: "InspectionDetail",
    components: {
      
    },
    data() {
        return {
            data: {},
            id: null,
            dialog:false,
            part: null,
            result: null,
            newurl: null,
            video: false
        }
    },
    
    methods: {
        getInspections() {
            getSelfInspectionRequest(this.id)
            .then(response =>{
                this.data = response;
                console.log(response);
            })
            .catch(e =>{
            console.log(e)
            })     
        },
        url(path){
            return `https://autoclaims.s3.us-east-2.amazonaws.com/${path}`
        },
        selectedPart(data){
            this.dialog = true;
            this.result = data.result;
            this.part = data.vehicle_part;
            this.newurl = data.url;
            if(data.vehicle_part == 'video'){
                this.video = true;
            }
            else{
                this.video = false;
            }
        }
    },
    mounted(){
        this.id = window.location.href.split("/").pop();
        if(this.id){
            this.getInspections();
        }

    }
}
</script>

<style scoped>
.back-btn{
    background-color: #e1e5f3;
    border: 0;
    color: #5E626A;
    font-size: 14px;
    border-radius: 8px;
}
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
.two-cols{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
}
</style>