<template>
  <div class="grid grid-cols-3 mt-3 mb-10">
    <div class="col-span-2">
        
      <div v-if="responsibilities.length">
          <div class="mb-2" v-for="(rspblty, index) in responsibilities" :key="index">
            <input type="radio" :id="'resp' + index" name="resp" :value="rspblty.id" v-model="resp">
            <label class="pl-3" :for="'resp' + index">{{rspblty.name}}</label>
          </div>
        <div>
          <button class="bg-green-500 text-white p-1 rounded mt-3" @click="saveResp">Save</button>
        </div>
      </div>
      <div v-else-if="loading">
        <p class="text-red-500 mb-3">+
          Loading...
        </p>
      </div>
    </div>
    <div class="col-span-1 p-10 pb-32 border-l">
      <img
        :src="pictures[0]?.file.path"
        alt="Vehicle"
        class="w-full rounded"/>
    </div>
 </div>
</template>

<script>
import {defineComponent, computed, onMounted, ref} from "vue";
import {
  updatetClientResponsibilityRequest,
  getClientResponsibiltiesRequest
} from "../../requests";

export default defineComponent({ 
  name: 'ClientResponsibility',
  props: {
    claim: {
      type: Object,
    }
  },
  setup(props, {emit}) {
    const responsibilities  = ref([]);
    const resp = ref(props.claim.clientResponsibility.id)
    const pictures = computed(() => props.claim?.accident.documents.filter(document => document.file.mime.includes('image')));
    const loading = ref(true);
    onMounted(function () {
      getClientResponsibiltiesRequest()
        .then(({data}) => {
          responsibilities.value  = data;
            loading.value = false;
        })
    })

    const saveResp = () => {
      updatetClientResponsibilityRequest(props.claim.id, resp.value)
        .then(({data}) => {
          // emit('update', data);
          console.log('done');
        })
    }

    return {
      pictures,
      loading,
      responsibilities,
      saveResp,
      resp
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