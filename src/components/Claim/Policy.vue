<template>
    <div class="w-full mt-3 mb-10">
        <p>{{$t("Policy Holder's Guarantees")}}</p>
      <div class="flex flex-wrap mt-3" >
        <div v-for="(gtype, index) in guaranteeTypes" :key="index" class="mr-4">
            <input :disabled="!claim.user_can_edit" v-model="selectedGuaranteeTypes" class="mr-2" type="checkbox" :value="gtype.value" :id="'gtype' + index">
            <label :for="'gtype' + index">{{ gtype.label }}</label>
        </div>
      </div>

      <button @click="saveGuarantees" :disabled="!claim.user_can_edit" class="text-white bg-primary rounded px-3 py-1 mt-4" >{{$t('Save')}}</button>
    </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import {getGuaranteeTypesRequest, saveGuaranteesRequest} from "../../requests";

export default { 
    name: 'claimPolicy',
    props: {
        claim: {
            type: Object
        }
    },

    data() {
        return {
            guaranteeTypes: [],
            selectedGuaranteeTypes: []
        }
    },

    methods: {
        saveGuarantees() {
            saveGuaranteesRequest(this.claim?.policy.id, this.selectedGuaranteeTypes)
                .then(({data}) => {
                    const claim = this.claim;
                    claim.policy = data;
                    this.$emit('update', claim)
                })
        }
    },

    mounted: function() {
        getGuaranteeTypesRequest()
            .then(({data}) => {
                this.guaranteeTypes.push(...data.map((a) => ({value: a.id, label: a.name})))
                this.selectedGuaranteeTypes.push(...this.claim.policy.guarantees.map(g => g.type_id));

                console.log(this.selectedGuaranteeTypes)
            })
    },

};
</script>