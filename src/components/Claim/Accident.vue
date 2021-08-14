<template>
  <div
      class="absolute right-2 p-2 cursor-pointer"
      v-if="$store.state.profile.type === 'broker'"
      @click="displayClaimEditModal = true"
  >
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
        <p class="value">{{ claim.accident.involved_third_party ? 'Yes':'No' }}</p>
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

  <v-overlay v-model="displayClaimEditModal">
    <div class="w-[600px] bg-white rounded">
      <div class="flex border-b items-center">
        <p class="p-6 text-lg font-medium px-7 flex-grow-1">Edit Details</p>
        <div class="p-5" @click="displayClaimEditModal = false">
          <v-icon>mdi-close</v-icon>
        </div>
      </div>

      <div class="px-7">
        <div class="flex space-x-4">
          <TextField label="Date of Accident" type="date"/>
          <TextField label="Time of Accident" type="time"/>
        </div>
        <div class="flex space-x-4">
          <TextField label="Accident Type" type="select"/>
          <TextField label="Third Party Involved" type="select"/>
        </div>
        <div class="">
          <TextField label="Third Party Involved" type="textarea"/>
        </div>
        <div class="py-10">
          <v-btn block>
            Update Details
          </v-btn>
        </div>
      </div>
    </div>
  </v-overlay>
</template>

<script lang="ts">
import {defineComponent, PropType, ref} from "vue";
import {ClaimType} from "../../types";
import TextField from "../TextField.vue";

export default defineComponent({
  name: 'ClaimAccidentDetail',
  components: {TextField},
  props: {
    claim: {
      type: Object as PropType<ClaimType>
    }
  },
  setup() {
    const displayClaimEditModal = ref(false)
    return {displayClaimEditModal}
  }
})
</script>
