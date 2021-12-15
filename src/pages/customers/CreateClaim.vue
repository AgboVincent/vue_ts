<template>
  <AppBar navigator="Back to claims"/>
<!--  <v-alert-->
<!--      type="success"-->
<!--  ></v-alert>-->
  <p class="text-text-dark text-bold text-2xl">
    Create Claims
  </p>
  <div class="w-full bg-white p-10 my-10">

    <div class="w-1/2 mx-auto">
      <div v-if="step === 1">
        <p class="font-bold">Accident Information</p>
        <div class="grid grid-cols-2 gap-x-2">
          <TextField v-model="form.date" label="Date of Accident" type="date"/>
          <TextField v-model="form.time" label="Time" type="time"/>
        </div>
        <TextField v-model="form.accident_type" label="Accident Type" required type="select" :options="accidentTypes"/>
        <TextField v-model="form.description" label="Description" type="textarea" row="7" reqired/>
        <TextField v-model="form.involves_third_party" label="Third Party Involved" type="select"
                   :options="[{value: 1, label: 'Yes'}, {label: 'No', value: 0}]"/>
        <div class="flex justify-end mt-10">
          <v-btn @click="nextStep">Next</v-btn>
        </div>
      </div>
      <div v-if="step === 2">
        <p class="font-bold">Third Party</p>
        <div class="grid grid-cols-2 gap-x-2">
          <TextField v-model="form.third_party.full_name" label="Full Name"/>
          <TextField v-model="form.third_party.mobile" label="Mobile"/>
        </div>
        <div class="grid grid-cols-2 gap-x-2">
          <TextField v-model="form.third_party.policy_number" label="Policy Number"/>
          <TextField v-model="form.third_party.company" label="Insurance Company"/>
        </div>
        <div class="flex justify-between mt-10">
          <v-btn @click="step = 1">Prev</v-btn>
          <v-btn @click="step = 3">Next</v-btn>
        </div>
      </div>
      <div v-if="step === 3">
        <p class="font-bold">Upload</p>
        <div
            class="bg-[#F8FBFC] border-[#F1F1F1] rounded-[6px] py-12 flex flex-col items-center justify-center mt-15 border cursor-pointer"
            @click="clickInputField">
          <img :src="'/images/photos.png'" alt="Photos"/>
          <p class="text-[#268BD0] font-semibold pt-5 pb-3">
            Upload Photos
          </p>
          <p class="text-[#666666] text-[11px] font-normal">
            Add at least 4 pictures
          </p>
        </div>
        <TextField type="file" multiple @change="handleFileSelect" class="hidden"/>
        <div class="w-full grid grid-cols-4 gap-4 pt-5">
          <div class=" object-cover" v-for="image in images">
            <img :src="image.path" alt="Image" class="w-[118px] h-[80px] object-cover"/>
          </div>
        </div>
        <div class="flex justify-between mt-10">
          <v-btn @click="prevStep">Prev</v-btn>
          <v-btn @click="step = 4">Next</v-btn>
        </div>
      </div>
      <div v-if="step === 4">
        <p class="font-bold">Quotes</p>

        <div class="grid grid-cols-3 gap-x-2" v-for="(quote, index) in form.quotes" :key="index">
          <TextField type="select" label="Type" :options="types" v-model="quote.type"/>
          <TextField type="number" label="Quantity" v-model="quote.quantity"/>
          <TextField type="number" label="Amount" v-model="quote.amount"/>
        </div>
        <div class="cursor-pointer mt-3" @click="addNewQuote">Add Another Item</div>

        <div class="flex justify-between mt-10">
          <v-btn @click="step = 3">Prev</v-btn>
          <v-btn @click="create">Create</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, ref, inject} from "vue";
import AppBar from "@/components/AppBar.vue";
import TextField from "@/components/TextField.vue";
import {
  createClaimForPolicyRequest,
  fileUploadRequest,
  getAllAccidentTypesRequest,
  getClaimItemTypesRequest
} from "../../requests";
import {FileType} from "../../types";
import {useRoute, useRouter} from "vue-router";

export default defineComponent({
  name: 'CreateClaim',
  components: {TextField, AppBar},
  setup() {
    const query = ref(''),
        status = ref(''),
        {params} = useRoute(),
        {push} = useRouter(),
        step = ref(1),
        accidentTypes = ref([]),
        form = ref({
          third_party: {},
          involves_third_party: 1,
          quotes: [{type: '', quantity: 1, amount: 1000}]
        }),
        types = ref([] as Array<{ label: string, value: string | number }>),
        images = ref([] as Array<FileType>),
        $loading = inject('$loading')

    function addNewQuote() {
      form.value.quotes.push({type: '', quantity: 1, amount: 1000})
    }

    function fetchAccidentTypes() {
      getAllAccidentTypesRequest()
          .then(({data}) => {
            accidentTypes.value.push(...data.map((a) => ({value: a.id, label: a.name})))
          })
    }

    onMounted(() => fetchAccidentTypes())
    onMounted(function () {
      getClaimItemTypesRequest()
          .then(({data}) => {
            types.value.push(...data.map((a) => ({value: a.id, label: a.name})))
          })
    })

    function nextStep() {
      switch (step.value) {
        case 1:
          console.log(form.value.involves_third_party, form.value.involves_third_party ? 2 : 3)
          return step.value = Number(form.value.involves_third_party) ? 2 : 3
      }
    }

    function create() {
      let loader = $loading.show();
      let documents = {
        pictures: images.value.map(a => a.id)
      }
      createClaimForPolicyRequest(params.policy as number, {
        ...form.value, documents
      })
          .then(({data}) => {
             push('/claims/' + data.id)
          }).catch(err => console.error(err))
      .finally(() => loader.hide())
    }

    function prevStep() {
      switch (step.value) {
        case 3:
          return step.value = Number(form.value.involves_third_party) ? 2 : 1
      }
    }

    function handleFileSelect(e: Event) {
      const element = e.target as HTMLInputElement
      fileUploadRequest(element.files.item(0) as File)
          .then(({data}) => {
            images.value.push(data)
          })
    }

    function clickInputField() {
      document.querySelector('input[type=file]').click()
    }

    return {
      query,
      form,
      status,
      step,
      accidentTypes,
      types,
      addNewQuote,
      nextStep,
      create,
      prevStep,
      images,
      handleFileSelect,
      clickInputField
    }
  }
})
</script>
