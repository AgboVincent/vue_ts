<template>
    <div>
        <v-layout class="row mt-10 mx-0 justify-space-between">
            <div  class="flex items-center">
                <div class="d-flex align-items-start">
                <v-btn  height="30" elevation="0" class="back-btn px-2 my-3" @click="$router.back()"> 
                    <img class="pb-1 pr-2" src="../assets/arrow_back.png"> Back
                </v-btn>
            </div>  
            </div>
            <div  class="flex">
                <v-btn height="35" class="reject-btn px-2 my-3 mx-3 w-[150px] h-[30px]"
                        @click="approvePolicy(data)">
                Approve
                </v-btn>
                <v-btn height="35" class="accept-btn px-2 my-3 w-[150px] h-[30px]"
                        @click="rejectPolicy(data)">
                Reject
                </v-btn>
            </div>
        </v-layout>
            <v-alert v-if="policyStatus"
                    title="Action on claim"
                    :text="`Policy ${policyStatus}`"
                    max-width="120px"
                    > 
            </v-alert>
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
                    class="mx-auto overflow-hidden v-sheet v-sheet--outlined theme--light rounded border"
                    max-width="300"
                    height="300px"
                    outlined
                    elevation="0" 
                    color="#F6FAFD"
                    border="1"
                    @click="selectedPart(data)"       
                    >
                    <div v-if="data.vehicle_part == 'video'">
                        <video 
                        style="object-fit:fill; width: 30vw; height:27vh;"
                        controls
                        >
                        <source
                            :src="url(data.url)"
                            type="video/mp4"
                        >
                        </video>
                        <v-card-title>
                        {{ data.vehicle_part }}
                        </v-card-title>

                        <v-card-subtitle>
                         click to play
                        </v-card-subtitle>
                    </div>
                    <v-img
                        :src="url(data.url)"
                        height="200px"
                        cover="true"
                        class="mx-auto white--text align-end"
                        >
                    </v-img>

                        <v-card-title>
                        {{ data.vehicle_part }} view
                        </v-card-title>
                        
                        <v-card-subtitle v-if="data.result == 'No Predictions for this vehicle'"
                        style="color: #06B856;">
                         good condition
                        </v-card-subtitle>

                        <v-card-subtitle v-else-if="data.result == 'unavailable'">
                         {{ data.result }}
                        </v-card-subtitle>

                        <v-card-subtitle v-else style="color: #EC2D20;">
                         faulty
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
                        style="object-fit:fill; width: 34vw; height: 38vh;"
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
                        width="480px"
                        cover="true"
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
                         <v-col v-if="damages.length">
                            <h5 class="text my-3">Detected Damages</h5>
                            <v-row v-for="(damage, index) in damages" :key="damage.id">
                            <h5 class="title mx-2 my-2">{{ index+1 }}. {{damage}}</h5>
                            </v-row>
                        </v-col>                                   
                    </v-row>                       
                </v-card>
                </v-dialog>
            </v-row>
    </div>
</template>


<script>
import {getSelfInspectionRequest, updateUserStatus, sendUserEmail} from "../requests";
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
            video: false,
            policyStatus: null,
            damages: []
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
            if(data.result === "No Predictions for this vehicle"){
                this.result = 'Good condition'
            }
            else if(data.result === "unavailable"){
                this.result = "Unavailable"
            }
            else{
                this.result = 'Faulty';
            }
            if(data.vehicle_part == 'video'){
                this.video = true;
            }
            else{
                this.video = false;
            }
            if(this.part == 'front'){
                this.damages = Object.values(this.data.damages.front)
            }
            else if(this.part == 'rear'){
                this.damages = Object.values(this.data.damages.rear)
            }
            else if(this.part == 'right'){
                this.damages = Object.values(this.data.damages.right)
            }
            else if(this.part == 'left'){
                this.damages = Object.values(this.data.damages.left)
            }
            
        },
        approvePolicy(row){
            var data = {
                id: row.id,
                status: "Approved"
            };
            updateUserStatus(data)
            .then(res=>{
                var msg = "Your request to purhcase policy has been reviewed successfull and Approved. Kindly click the button to continue";
                sendUserEmail(row, msg);
                this.policyStatus = "Approved";
                setTimeout(()=>{
                    this.policyStatus = null;
                },3000)  
            })
        },
        rejectPolicy(row){
            var data = {
                id: row.id,
                status: "Rejected"
            };
            updateUserStatus(data)
            .then(res=>{
                var msg = "Your request to purhcase policy has been reviewed successfull and was Rejected. Kindly resubmit information for inspection ";
                sendUserEmail(row, msg);
                this.policyStatus = "Rejected";
                setTimeout(()=>{
                    this.policyStatus = null;
                },3000)  
            })
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