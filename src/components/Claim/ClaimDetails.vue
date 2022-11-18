<template>
    <div>
        <v-col>
            <h5 class="title">Customer</h5>
            <h5 class="text">{{claim.user.name}}</h5>
        </v-col>
        <br>
        <v-col>
             <v-row>
                <v-col>
                    <h5 class="title">Email address</h5>
                    <h5 class="text">{{claim.user.email}}</h5>
                </v-col>

                <v-col>
                    <h5 class="title">Phone number</h5>
                    <h5 class="text">{{claim.user.phone}}</h5>
                </v-col>
             </v-row>
        </v-col>
        <br>
        <v-col>
            <v-row>
                <v-col>
                    <h5 class="title">Policy</h5>
                    <h5 class="text">{{claim.policy}}</h5>
                </v-col>
                
                <v-col>
                    <h5 class="title">Date of claim</h5>
                    <h5 class="text">{{formatDateTime(claim.created_at)}}</h5>
                </v-col>
            </v-row>

        </v-col>
        
        <br>
        <v-col>
            <h5 class="title">Description</h5>
            <h5 class="text">{{claim.description}}</h5>
        </v-col>
    </div>
</template>


<script lang="ts">

import {defineComponent, PropType} from "vue";
import {CollectionType} from "../../types";

export default defineComponent({
  name: "ClaimDetails",
  props: {
    claim: {
      type: Object as PropType<CollectionType>
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

</style>