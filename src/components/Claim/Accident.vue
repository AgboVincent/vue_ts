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
        <p class="value">{{ claim.accident.third_party.mobile }}</p>
      </div>
    </div>
    <div class="col">
      <div class="item">
        <p class="field">Insurance Company</p>
        <p class="value">{{ claim.accident.third_party.company }}</p>
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

      <form @submit.prevent="update">
        <div class="px-7">
          <div class="flex space-x-4">
            <TextField label="Date of Accident" type="date" v-model="form.date"/>
            <TextField label="Time of Accident" type="time" v-model="form.time"/>
          </div>
          <div class="flex space-x-4">
            <TextField
                label="Accident Type"
                v-model="form.type.id"
                type="select"
                :options="accidentTypes"/>
            <TextField
                label="Third Party Involved"
                type="select"
                v-model="form.involved_third_party"
                :options="[{value: 1, label: 'Yes'}, {value: 0, label: 'No'}]"/>
          </div>
          <div>
            <TextField
                label="Description"
                :rows="5"
                type="textarea"
                v-model="form.description"
            />
          </div>
          <div class="" v-if="form.involved_third_party == 1">
            <p class="pt-6 text-lg font-medium">3rd Party</p>
            <div class="flex space-x-4">
              <TextField v-model="form.third_party.full_name" placeholder="Full Name" label="Full Name"/>
              <TextField v-model="form.third_party.mobile" placeholder="Phone Number" type="mobile"
                         label="Phone Number"/>
            </div>
            <div class="flex space-x-4">
              <TextField v-model="form.third_party.company" placeholder="Insurance Company"
                         label="Insurance Company"/>
              <TextField v-model="form.third_party.policy_number" placeholder="Policy Number" type="mobile"
                         label="Policy Number"/>
            </div>
          </div>
          <div class="py-10">
            <v-btn block type="submit">
              Update Details
            </v-btn>
          </div>
        </div>
      </form>
    </div>
  </v-overlay>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref, SetupContext} from "vue";
import {AccidentType, ClaimType} from "../../types";
import TextField from "../TextField.vue";
import {getAllAccidentTypesRequest, updateClaimRequest} from "../../requests";
import * as moment from "moment";

export default defineComponent({
  name: 'ClaimAccidentDetail',
  emits: ['update'],
  components: {TextField},
  props: {
    claim: {
      type: Object as PropType<ClaimType>
    }
  },
  setup(props, {emit}: SetupContext) {
    const displayClaimEditModal = ref(false),
        form = ref({third_party: {}, ...props.claim.accident} as AccidentType),
        accidentTypes = ref([])

    onMounted(() => {
      const date = moment(form.value.occurred_at)
      form.value.time = date.format('HH:mm')
      form.value.date = date.format('YYYY-MM-DD')
    })

    function getAccidentTypes() {
      getAllAccidentTypesRequest()
          .then(({data}) => {
            accidentTypes.value.push(...data.map((a) => ({value: a.id, label: a.name})))
          })
    }

    function update() {
      updateClaimRequest(
          props.claim.id,
          {
            date_time: (new Date(form.value.date + ' ' + form.value.time)).toUTCString(),
            description: form.value.description,
            third_party: form.value.third_party,
            involved_third_party: form.value.involved_third_party as boolean,
            accident_type: form.value.type.id
          }
      )
          .then(({data}) => {
            emit('update', data)
            displayClaimEditModal.value = false
          })
    }

    onMounted(getAccidentTypes)

    return {displayClaimEditModal, form, accidentTypes, update}
  }
})
</script>
