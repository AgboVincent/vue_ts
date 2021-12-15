<template>
    <div class="w-full mt-3 mb-10">
        <p>Policy Holder's Guarantees</p>
      <div class="flex flex-wrap mt-3" >
        <div v-for="(gtype, index) in guaranteeTypes" :key="index" class="mr-4">
            <input v-model="selectedGuaranteeTypes" class="mr-2" type="checkbox" :value="gtype.value" :id="'gtype' + index">
            <label :for="'gtype' + index">{{ gtype.label }}</label>
        </div>
      </div>

      <button @click="saveGuarantees" class="text-white bg-primary rounded px-3 py-1 mt-4" >Save</button>
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
            saveGuaranteesRequest(this.claim?.id, this.selectedGuaranteeTypes)
                .then(({data}) => {
                    this.$emit('update', data)
                })
        }
    },

    mounted: function() {
        getGuaranteeTypesRequest()
            .then(({data}) => {
                this.guaranteeTypes.push(...data.map((a) => ({value: a.id, label: a.name})))
                this.selectedGuaranteeTypes.push(...this.claim.guarantees.map(g => g.type_id));

                console.log(this.selectedGuaranteeTypes)
            })
    },

};
</script>