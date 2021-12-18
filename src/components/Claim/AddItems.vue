<template>
  <div class="grid grid-cols-3 mt-3 mb-10">
    <div class="col-span-2">
      <table class="table max-w-full">
        <thead>
          <tr>
           <th>{{$t('Type')}}</th>
           <th>{{$t('Quantity')}}</th>
           <th>{{$t('Amount')}}</th>
         </tr>
       </thead>
       <tbody>
         <tr v-for="(moreItem, index) in moreItems" :key="index + 'mi'">
           <td class="pl-3 pb-3">
             <select v-model="moreItem.type" class="border-solid border-2 p-1 rounded max-w-full">
               <option value="">{{$t('select name')}}</option>
               <option v-for="(type, index) in types" :key="index" :value="type.value">
                 {{ $t(type.label) }}
               </option>
             </select>
           </td>
           <td class="pl-3 pb-3">
             <input type="number" size="10" v-model="moreItem.quantity" class="border-solid border-2 p-1 rounded"
               :placeholder="$t('Quantity')" />
           </td>
           <td class="pl-3 pb-3">
             <input type="number" size="10" v-model="moreItem.amount" class="border-solid border-2 p-1 rounded"
               :placeholder="$t('Amount')" />
           </td>
            <td class="pl-3 pb-3">
              <button class="bg-red-500 text-white p-2 rounded" @click="removeMoreItem(index)">
                X
              </button>
            </td>
         </tr>
         <tr>
           <td colspan="3">
              <button class="bg-secondary text-primary p-1 rounded mr-3" @click="addMoreItem">
                {{$t('add more')}}
              </button>
              <button class="bg-green-500 bg-primary p-1 rounded" @click="saveItems">
                {{$t('save items')}}
              </button>
           </td>
         </tr>
       </tbody>
      </table>
    </div>
    <div class="col-span-1 p-10 pb-32 border-l">
      <img
        :src="pictures[0]?.file.path"
        :alt="$t('Vehicle')"
        class="w-full rounded"/>
    </div>
 </div>
</template>

<script>
import {defineComponent, computed, onMounted, ref} from "vue";
import {
  getClaimItemTypesRequest,
  updateClaimItemsRequest
} from "../../requests";

export default defineComponent({ 
  name: 'AddDetails',
  props: {
    claim: {
      type: Object,
    }
  },
  setup(props, {emit}) {
    const types = ref([]);
    const moreItems = ref([{type: '', quantity: '', amount: 0}]);
    const pictures = computed(() => props.claim?.accident.documents.filter(document => document.file.mime.includes('image')));
    
    onMounted(function () {
      getClaimItemTypesRequest()
        .then(({data}) => {
          types.value.push(...data.map((a) => ({value: a.id, label: a.name})))
        })
    })

    const removeMoreItem = (index) => {
      if(moreItems.value.length > 1) {
        moreItems.value.splice(index, 1);
      }else{
        moreItems.value[0] = {type: '', quantity: '', amount: 0};
      }
    }

    const addMoreItem = () => {
      moreItems.value.push({type: '', quantity: '', amount: 0});
    }

    const saveItems = () => {
      let err = false;
      moreItems.value.forEach(item => {
        if(!(item.type )) {
          alert("Veuillez entrer le type de devis")
          err = true;
          return
        }
  
        if(item.quantity < 1) {
          alert("Veuillez entrer la quantité de l'offre")
          err = true;
          return
        }
  
        if(item.amount < 0){
          alert("Veuillez entrer le montant du devis")
          err = true;
          return
        }
      })

      if(err) return

      updateClaimItemsRequest(props.claim.id, moreItems.value)
        .then(({data}) => {
          emit('update', data);
          console.log('done');
        })
    }

    return {
      types,
      moreItems,
      pictures,
      removeMoreItem,
      addMoreItem,
      saveItems
    }
  },
})
</script>

<style scoped lang="scss">
.table {
  @apply table-auto bg-white max-w-full rounded text-base border-collapse shadow mb-1;

  thead > tr > th {
    @apply p-4 text-left font-semibold border-b text-sm;
  }

  tbody > tr > :deep(td) {
    @apply p-4 border-b text-sm;
  }
}
</style>