<template>
 <div class="absolute right-2 p-2 cursor-pointer">
   <v-icon color="text">mdi-pencil</v-icon>
 </div>
  <div class="row">
    <div class="col">
      <div class="item">
        <p class="field">Date and Time of Incident</p>
        <p class="value">
          {{ formatDateTime(claim.accident.occurred_at) }}
        </p>
      </div>
      <div class="item">
        <p class="field">Accident Type</p>
        <p class="value">{{ claim.accident.type.name }}</p>
      </div>
      <div class="item">
        <p class="field">Third Party Involved</p>
        <p class="value">{{ claim.accident.involved_third_party ? 'Yes': 'No' }}</p>
      </div>
    </div>
    <div class="col">
      <div class="item">
        <p class="field">Accident Description</p>
        <p class="value">{{ claim.accident.description }}</p>
      </div>
    </div>
  </div>

  <p class="heading" v-if="claim.accident.involved_third_party">Third Party Details</p>
  <div class="row" v-if="claim.accident.involved_third_party">
    <div class="col">
      <div class="item">
        <p class="field">Full Name</p>
        <p class="value">{{ claim.accident.third_party.full_name }}</p>
      </div>
      <div class="item">
        <p class="field">Phone Number</p>
        <p class="value">{{ claim.accident.third_party.phone }}</p>
      </div>
    </div>
    <div class="col">
      <div class="item">
        <p class="field">Insurance Company</p>
        <p class="value">{{ claim.accident.third_party.insurance }}</p>
      </div>
      <div class="item">
        <p class="field">Policy Number</p>
        <p class="value">{{ claim.accident.third_party.policy_number }}</p>
      </div>
    </div>
  </div>

  <p class="heading">Uploaded Document</p>
</template>

<script lang="ts">
import {defineComponent, PropType} from "vue";
import {ClaimType} from "../../types";

export default defineComponent({
  name: 'ClaimAccidentDetail',
  props: {
    claim: {
      type: Object as PropType<ClaimType>
    }
  }
})
</script>
