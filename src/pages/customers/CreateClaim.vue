<template>
  <AppBar :navigator='$t("Back to claims")'/>
<!--  <v-alert-->
<!--      type="success"-->
<!--  ></v-alert>-->
  <p class="text-text-dark text-bold text-2xl">
    {{ $t("Create Claims")}}
  </p>
  <div class="w-full bg-white p-10 my-10">

    <div class="w-1/2 mx-auto">
      <div v-if="step === 1">
        <p class="font-bold">{{ $t("Accident Information")}}</p>
        <div class="grid grid-cols-2 gap-x-2">
          <TextField v-model="form.date" :label='$t("Date of Accident")' type="date"/>
          <TextField v-model="form.time" :label='$t("Time")' type="time"/>
        </div>
        <TextField v-model="form.accident_type" :label='$t("Accident Type")' required type="select" :options="accidentTypes"/>
        <TextField v-model="form.description" :label='$t("Description")' type="textarea" row="7" reqired/>
        <TextField v-model="form.involves_third_party" :label='$t("Third Party Involved")' type="select"
                   :options="[{value: 1, label: 'Yes'}, {label: 'No', value: 0}]"/>
        <div class="flex justify-end mt-10">
          <v-btn @click="nextStep">{{ $t("Next")}}</v-btn>
        </div>
      </div>
      <div v-if="step === 2">
        <p class="font-bold">{{ $t("Third Party")}}</p>
        <div class="grid grid-cols-2 gap-x-2">
          <TextField v-model="form.third_party.full_name" :label='$t("Full Name")' />
          <TextField type="number" v-model="form.third_party.mobile" :label='$t("Mobile")' />
        </div>
        <div class="grid grid-cols-2 gap-x-2">
          <TextField v-model="form.third_party.policy_number" :label='$t("Policy Number")' />
          <TextField v-model="form.third_party.company" :label='$t("Insurance Company")' />
        </div>
        <div class="flex justify-between mt-10">
          <v-btn @click="prevStep">{{ $t("Prev")}}</v-btn>
          <v-btn @click="nextStep">{{ $t("Next")}}</v-btn>
        </div>
      </div>
      <div v-if="step === 3">
        <p class="font-bold">{{ $t("Upload")}}</p>
        <div
            class="bg-[#F8FBFC] border-[#F1F1F1] rounded-[6px] py-12 flex flex-col items-center justify-center mt-15 border cursor-pointer"
            @click="clickInputField">
          <img :src="'/images/photos.png'" alt="Photos"/>
          <p class="text-[#268BD0] font-semibold pt-5 pb-3">
            {{ $t("Upload Photos")}}
          </p>
          <p class="text-[#666666] text-[11px] font-normal">
            {{ $t("Add at least 4 pictures")}}
          </p>
        </div>
        <TextField type="file" multiple @change="handleFileSelect" class="hidden"/>
        <div class="w-full grid grid-cols-4 gap-4 pt-5">
          <div class="object-cover" v-for="image in images">
            <img :src="image.path" alt="Image" class="w-[118px] h-[80px] object-cover"/>
          </div>
        </div>
        <div class="flex justify-between mt-10">
          <v-btn @click="prevStep">{{ $t("Prev")}}</v-btn>
          <v-btn @click="nextStep">{{ $t("Next")}}</v-btn>
        </div>
      </div>
      <div v-if="step === 4">
        <p class="font-bold">{{ $t("Quotes")}}</p>

        <div class="grid grid-cols-3 gap-x-2" v-for="(quote, index) in form.quotes" :key="index">
          <TextField type="select" :label='$t("Type")' :options="types" v-model="quote.type"/>
          <TextField type="number" :label='$t("Quantity")' v-model="quote.quantity"/>
          <TextField type="number" :label='$t("Amount")' v-model="quote.amount"/>
        </div>
        <div class="cursor-pointer mt-3" @click="addNewQuote">{{ $t("Add Another Item")}}</div>

        <div class="flex justify-between mt-10">
          <v-btn @click="prevStep">{{ $t("Prev")}}</v-btn>
          <v-btn @click="create">{{ $t("Create claim")}}</v-btn>
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

    onMounted(() => fetchAccidentTypes()) //remove this
    onMounted(function () {
      getClaimItemTypesRequest()
          .then(({data}) => {
            types.value.push(...data.map((a) => ({value: a.id, label: a.name})))
          })
    })

    function nextStep() {
      switch (step.value) {
        case 1:
          if(!(form.value.date && form.value.time)) {
            alert('Please fill in the date and time')
            return
          }
          if(!form.value.accident_type) {
            alert('Please select accident type')
            return
          }
          if(!form.value.description) {
            alert('Please fill in description')
            return
          }
          return step.value = Number(form.value.involves_third_party) ? 2 : 3;
        case 2:
          if(!form.value.third_party.full_name) {
            alert('Please fill in full name')
            return
          }
          if(!form.value.third_party.mobile) {
            alert('Please fill in mobile')
            return
          }
          if(!form.value.third_party.policy_number) {
            alert('Please fill in policy number')
            return
          }
          if(!form.value.third_party.company) {
            alert('Please fill in company')
            return
          }
          return step.value = 3;
        case 3:
          if(images.value.length < 4) {
            alert('Please upload at least 4 pictures')
            return
          }
          return step.value = 4;
      }
    }

    function prevStep() {
      switch (step.value) {
        case 2:
          return step.value = 1;
        case 3:
          return step.value = Number(form.value.involves_third_party) ? 2 : 1
        case 4:
          return step.value = 3;
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
