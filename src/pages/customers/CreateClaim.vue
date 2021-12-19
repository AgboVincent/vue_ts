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
          <TextField v-model="form.date" :label='$t("Date of Accident")' type="date" placeholder="mm/dd/yyyy"/>
          <TextField v-model="form.time" :label='$t("Time")' type="time"/>
        </div>
        <TextField v-model="form.accident_type" :label='$t("Accident Type")' required type="select" :options="accidentTypes"/>
        <TextField v-model="form.description" :label='$t("Description")' type="textarea" row="7" reqired/>
        <TextField v-model="form.involves_third_party" :label='$t("Third Party Involved")' type="select"
                   :options="[{value: 1, label: $t('Yes')}, {label: $t('No'), value: 0}]"/>
        <div class="flex justify-end mt-10">
          <v-btn @click="nextStep">{{ $t("Next")}}</v-btn>
        </div>
      </div>
      <div v-if="step === 2">
        <!--button to open third party modal-->
        <div class="flex justify-between align-center">
          <p class="font-bold text-2xl">{{ $t("Third Party")}}</p>
          <v-btn @click="showThirdpartyModal = true">
            <v-icon>mdi-plus</v-icon>
            {{ $t("Add Third Party")}}
          </v-btn>
        </div>
        <div v-if="form.third_parties.length">
          <div class="flex align-center my-8" v-for="(thirdParty, index) in form.third_parties" :key="index">
            <v-avatar
              color="primary"
              size="36"
            ><v-icon>mdi-account-group</v-icon></v-avatar>
            <div class="pl-2">
              <p class="text-sm font-bold">{{ thirdParty.full_name }}</p>
              <p class="text-sm">{{ thirdParty.mobile }}</p>
            </div>
            <!-- <span class="pl-2">{{ thirdParty.full_name }}</span> -->
          </div>
          
          <div class="flex justify-between">
            <v-btn @click="prevStep">{{ $t("Prev")}}</v-btn>
            <v-btn @click="nextStep">{{ $t("Next")}}</v-btn>
          </div>
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

    <v-overlay v-model="showThirdpartyModal">
      <div class="bg-white w-[500px] rounded">
        <div class="flex border-b items-center">
          <p class="p-6 text-2xl font-medium px-7 flex-grow-1">{{$t('Add Third Party')}}</p>
          <div class="p-5" @click="showThirdpartyModal = false">
            <v-icon>mdi-close</v-icon>
          </div>
        </div>

        <div class="px-7 pb-6 my-6">
          <p class="font-bold">{{ $t("Third Party")}}</p>
          <div class="grid grid-cols-2 gap-x-2">
            <TextField v-model="thirdPartyModel.full_name" :label='$t("Full Name")' />
            <TextField type="number" v-model="thirdPartyModel.mobile" :label='$t("Mobile")' />
          </div>
          <div class="grid grid-cols-2 gap-x-2 mb-3">
            <TextField v-model="thirdPartyModel.policy_number" :label='$t("Policy Number")' />
            <TextField v-model="thirdPartyModel.company" :label='$t("Insurance Company")' />
          </div>
          <v-btn block :disabled="loading" @click="addThirdParty">{{$t('Add')}}</v-btn>
        </div>
      </div>
    </v-overlay>
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
          third_parties: [],
          involves_third_party: 1,
          quotes: [{type: '', quantity: 1, amount: 1000}]
        }),
        types = ref([] as Array<{ label: string, value: string | number }>),
        images = ref([] as Array<FileType>),
        $loading = inject('$loading');
        let showThirdpartyModal = ref(false), 

        thirdPartyModel = ref(
          {
            full_name: '',
            mobile: '',
            policy_number: '',
            company: ''
          }
        )
    function addThirdParty() {
      if(!thirdPartyModel.value.full_name) {
            // alert('Please fill in full name')
            alert('Veuillez indiquer le nom complet')
            return
          }
          if(!thirdPartyModel.value.mobile) {
            // alert('Please fill in mobile')
            alert("Veuillez remplir le formulaire mobile")
            return
          }
          if(!thirdPartyModel.value.policy_number) {
            // alert('Please fill in policy number')
            alert("Veuillez indiquer le numéro de police")
            return
          }
          if(!thirdPartyModel.value.company) {
            // alert('Please fill in company')
            alert("Veuillez indiquer la société")
            return
          }
      form.value.third_parties.push(Object.assign({}, thirdPartyModel.value));
      thirdPartyModel.value = {
        full_name: '',
        mobile: '',
        policy_number: '',
        company: ''
      }
      showThirdpartyModal.value = false;
    }

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
            // alert('Please fill in the date and time')
            alert("Veuillez renseigner la date et l'heure")
            return
          }
          if(!form.value.accident_type) {
            // alert('Please select accident type')
            alert("Veuillez sélectionner le type d'accident")
            return
          }
          if(!form.value.description) {
            // alert('Please fill in description')
            alert('Veuillez remplir la description')
            return
          }
          return step.value = Number(form.value.involves_third_party) ? 2 : 3;
        case 2:
          if(!form.value.third_parties.length) {
            // Please enter at least one thirdparty')
            alert("Veuillez saisir au moins un tiers")
            return
          }
          return step.value = 3;
        case 3:
          if(images.value.length < 4) {
            // alert('Please upload at least 4 pictures')
            alert("Veuillez télécharger au moins 4 photos")
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
      let err = false
      form.value.quotes.forEach((quote) => {
        
        if(!(quote.type )) {
          alert("Veuillez entrer le type de devis")
          err = true;
          return
        }
  
        if(quote.quantity < 1) {
          alert("Veuillez entrer la quantité de l'offre")
          err = true;
          return
        }
  
        if(quote.amount < 0){
          alert("Veuillez entrer le montant du devis")
          err = true;
          return
        }
      })

      if(err) return; 

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
      clickInputField,
      showThirdpartyModal,
      addThirdParty,
      thirdPartyModel
    }
  }
})
</script>
