<template>
  <div
      class="absolute right-2 p-2 cursor-pointer"
      v-if="$store.state.profile.type === 'broker' && !claim.involves_insurer"
      @click="displayClaimEditModal = true"
  >
    <v-icon color="text">mdi-pencil</v-icon>
  </div>
  <div class="row">
    <div class="col">
      <div class="item">
        <p class="field">{{$t('Date and Time of Incident')}}</p>
        <p class="value">
          {{ formatDateTime(claim.accident.occurred_at) }}
        </p>
      </div>
      <div class="item">
        <p class="field">{{$t('Accident Type')}}</p>
        <p class="value">{{ claim.accident.type.name }}</p>
      </div>
      <div class="item">
        <p class="field">{{$t('Third Party Involved')}}</p>
        <p class="value">{{ claim.accident.involved_third_party ? $t('Yes'):$t('No') }}</p>
      </div>
    </div>
    <div class="col">
      <div class="item">
        <p class="field">{{$t('Accident Description')}}</p>
        <p class="value">{{ claim.accident.description }}</p>
      </div>
    </div>
  </div>

  <p class="heading" v-if="claim.accident.involved_third_party">{{$t('Third Party Details')}}</p>
  <div v-if="claim.accident.involved_third_party">
    <table class="table-auto">
      <thead>
        <tr>
          <th class="text-left px-3">
            {{$t('Full Name')}}
          </th>
          <th class="text-left px-3">
            {{$t('Policy Number')}}
          </th>
          <th class="text-left px-3">
            {{$t('Phone Number')}}
          </th>
          <th class="text-left px-3">
            {{$t('Insurance Company')}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(thirdParty, index) in claim.accident.third_parties" 
          :key="index"
        >
          <td class="px-3 py-1 text-sm">{{ thirdParty.full_name }}</td>
          <td class="px-3 py-1 text-sm">{{ thirdParty.policy_number }}</td>
          <td class="px-3 py-1 text-sm">{{ thirdParty.mobile }}</td>
          <td class="px-3 py-1 text-sm">{{ thirdParty.company }}</td>
        </tr>
      </tbody>
    </table>
  </div>


  <p class="heading">{{$t('Uploaded documents')}}</p>

  <!-- <v-overlay v-model="displayClaimEditModal">
    <div class="w-[600px] bg-white rounded">
      <div class="flex border-b items-center">
        <p class="p-6 text-lg font-medium px-7 flex-grow-1">{{$t('Edit Details')}}</p>
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
                :options="[{value: 1, label: $t('Yes')}, {value: 0, label: $t('No')}]"/>
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
              {{$t('Update Details')}}
            </v-btn>
          </div>
        </div>
      </form>
    </div>
  </v-overlay> -->
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
