<template>
  <v-row justify="center">
    <v-dialog v-model="dialog"
              justify="center"
              scrollable
    >
      <template v-slot:activator="{ props }">
        <v-btn
            v-bind="props"
            color=" lighten-2"
            dark
            :disabled="!userCanEdit"
        >
          {{$t('Add')}}
        </v-btn>
      </template>

      <v-card min-height="500" width="500">
        <v-card-title class="text-h5 grey lighten-2">
          {{$t('Add Financial Movement')}}
        </v-card-title>

        <v-card-text style="height: 500px; overflow-y: scroll">
          <v-form @submit.prevent="submitForm" ref="form"
                  v-model="valid">
            <text-field
                v-model="form.nature"
                :options="[{label: 'Réglement', value: 'Réglement'},{label: 'Provision', value: 'provision'},{label: 'Honoraires', value: 'Honoraires'},{label: 'Frais', value: 'Frais'}]"
                label="Nature"
                placeholder="Select nature"
                required
                type="select"
                :disabled="!userCanEdit"
            ></text-field>

            <text-field
                v-if="form.nature !== 'provision' && insurer"
                v-model="form.issuer"
                :options="[
                  {label: 'BALOON', value: 'BALOON'},
                  {label: insurer.name + ' (Compagnie du client)', value: insurer.name + ' (Compagnie du client)'},
                  ...thirdPartyCompanies
                ]"
                label="Issuer"
                placeholder="Select issuer"
                required
                type="select"
                :disabled="!userCanEdit"
            ></text-field>

            <text-field
                v-if="form.nature !== 'provision' && insurer"
                v-model="form.recipient"
                :options="[
                  {label: 'BALOON', value: 'BALOON'},
                  {label: insurer.name + ' (Compagnie du client)', value: insurer.name + ' (Compagnie du client)'},
                  ...thirdPartyCompanies
                ]"
                label="Recipient"
                placeholder="Select Recipient"
                required
                type="select"
                :disabled="!userCanEdit"
            ></text-field>

            <div class="mt-7 w-full">
              <p class="pb-2 text-text text-xs">{{ $t('Garantie(s)') }}</p>
              <div class="relative flex flex-column border rounded-md p-3 w-full">
                <div class="flex items-center space-x-2" v-for="(guarantee, index) in guarantees" :key="index">
                  <input v-model="form.guarantees" :value="guarantee.name" 
                      class="text-text-dark outline-none text-sm pl-4" :id="guarantee.name + index"
                      :disabled="!userCanEdit" type="checkbox"/>
                  <label :for="guarantee.name + index">{{guarantee.name}}</label>
                </div>
              </div>
            </div>

            <text-field
                v-model="form.amount"
                label="Movement Amount"
                type="number"
                required
                :disabled="!userCanEdit"
            ></text-field>

            <text-field
                v-if="form.nature !== 'provision'"
                v-model="form.payment_method"
                :options="[{label: 'Chéque', value: 'Chéque'},{label: 'Virement', value: 'Virement'},{label: 'Bon de réparation', value: 'Bon de réparation'},{label: 'Espéces', value: 'Espéces'},{label: 'Autre', value: 'Autre'}]"
                label="Means of payment"
                placeholder="Select payment method"
                required
                type="select"
                :disabled="!userCanEdit"
            ></text-field>

            <text-field
                v-if="form.nature !== 'provision'"
                v-model="form.payment_reference"
                label="Payment Reference"
                type="text"
                required
                :disabled="!userCanEdit"
            ></text-field>

          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              class="mr-4"
              type="submit"
              :disabled="invalid || (!userCanEdit)"
              @click="submitForm"
          >
            {{$t('Submit')}}
          </v-btn>

          <v-btn
              color="primary"
              variant="text"
              @click="reset"
              :disabled="!userCanEdit"
          >
            {{$t('Cancel')}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Table from './../Table.vue'
import TextField from "../TextField.vue";
import {submitFinancialMovement} from "../../requests";

export default defineComponent({
  components: {TextField, Table},
  data() {
    return {
      dialog: false,
      form: {
        nature: null,
        amount: null,
        guarantees: []
      },
      thirdPartyCompanies: [] 
    }
  },
  computed: {
    invalid: function () {
      let form = this.form;
      return form.guarantees.length < 1 || !form.nature || !form.amount;

    },
  },
  methods: {
    submitForm() {
      submitFinancialMovement(this.claim_id, this.form)
          .then(() => {
            this.$emit('newFinMovement');
            this.reset()
          })
    },
    reset () {
      this.dialog = false;
      this.form = {
        nature: null,
            amount: null,
            guarantees: []
      }
    },
  },
  mounted(){
    if(this.accident.third_parties && this.accident.third_parties.length > 0) {
        this.thirdPartyCompanies = this.accident.third_parties.map(thirdParty => {
          return {
            label: `${thirdParty.company} (Compagnie du Tiers ${thirdParty.full_name})`,
            value: `${thirdParty.company} - (Compagnie du Tiers ${thirdParty.full_name})`
          }
        })
      }
  },
  props: {
    claim_id:  {
      type: Number,
      required: true
    },
    userCanEdit: {
      type: Boolean,
      required: false
    },
    insurer: {
      type: Object,
      required: true
    },
    accident: {
      type: Object,
      required: true
    },
    guarantees: {
      type: Array,
      required: false
    }
  },
  setup(props) {


    return {}
  }
})
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
</style>
