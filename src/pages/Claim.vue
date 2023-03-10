<template>
  <div>
  <AppBar :navigator="$t('Back to claims')"/>
  <div v-if="!loading">
    <div class="flex items-end pt-12 pb-10">
      <div class="flex-grow-1">
        <p class="text-text-dark font-bold pb-1 text-2xl">
          {{ $t(claim.policy.vehicle.model) }}
        </p>
        <p class="text-text">
          {{ $t(claim.policy.vehicle.manufacturer) }}
        </p>
      </div>
      <div class="flex items-end space-x-4" v-if="$store.state.profile.type === 'broker'">
        <v-btn :disabled="!claim.user_can_edit" text-color="success" color="white" size="small" :height="30" @click="displayCommentModal = true">
          {{ $t("Message Customer") }}
        </v-btn>
        <v-btn
            :disabled="!claim.user_can_edit"
            @click="processToInsurer"
            color="white"
            text-color="primary"
            size="small"
            v-if="!claim.involves_insurer"
            :height="30">
          {{ $t('Send to Insurer') }}
        </v-btn>
      </div>
    </div>

    <div class="w-full rounded bg-white p-6 flex items-center">
      <p class="text-text text-xs mr-13">
        {{$t('Policy Type')}}
        <span class="text-text-dark font-medium block mt-2 text-sm capitalize">
        {{ $t(claim.policy.type) }}
      </span>
      </p>
      <p class="text-text text-xs mr-13">
        {{$t('Policy Number')}}
        <span class="text-text-dark block mt-2 font-medium text-sm">
        {{ $t(claim.policy.number) }}
      </span>
      </p>
      <p class="text-text text-xs mr-13">
        {{$t('Policy Start')}}
        <span class="text-text-dark font-medium block mt-2 text-sm">
        <span v-if="claim.policy.created_at">{{ formatDate(claim.policy.created_at) }}</span>
        <span v-else>{{ $t('Not available') }}</span>
      </span>
      </p>
      <p class="text-text text-xs mr-13">
        {{$t('Policy Expiry')}}
        <span class="text-text-dark block mt-2 text-sm font-medium">
        <span v-if="claim.policy.expires_at">{{ formatDate(claim.policy.expires_at) }}</span>
        <span v-else>{{ $t('Not available') }}</span>
      </span>
      </p>
      <p class="text-text text-xs mr-13">
        {{$t('Policy Status')}}
        <span
            class="block mt-2 text-sm capitalize font-medium"
            :class="computePolicyStatusColor(claim.policy.status)"
        >
        {{ $t(claim.policy.status) }}
      </span>
      </p>
    </div>

    <div class="bg-white rounded overflow-y-scroll mt-4">
      <div class="tabs">
        <a href="#"
           @click.prevent="() => changeTab(tabIndex)"
           v-for="(tab, tabIndex) in tabs"
           class="tab"
           :class="activeTab.name === tab.name ? 'active' : ''"
           :key="`tabs:${tabIndex}`">{{ $t(tab.name) }}</a>
      </div>

      <div class="content">
        <component :is="activeTab.component" :key="activeTab.name" :claim="claim" @update="handleClaimUpdate"/>
      </div>
    </div>
    <v-overlay v-model="displayCommentModal">
      <div class="w-[600px] bg-white rounded">
        <div class="flex border-b items-center">
          <p class="p-6 text-lg font-medium px-7 flex-grow-1">{{ $t("Add Comment") }}</p>
          <div class="p-5" @click="displayCommentModal = false">
            <v-icon>mdi-close</v-icon>
          </div>
        </div>

        <div class="px-7">
          <div>
            <TextField
                label="Comment"
                :rows="7"
                type="textarea"
                v-model="comment"
            />
          </div>
          <div class="py-10">
            <v-btn block type="submit" @click="addComment">
              {{ $t("Send") }}
            </v-btn>
          </div>
        </div>
      </div>
    </v-overlay>

  </div>
 </div>
</template>

<script lang="ts">

import AppBar from "../components/AppBar.vue";
import {defineComponent, onMounted, ref} from "vue";
import Vehicle from "../components/Claim/Vehicle.vue";
import Accident from "../components/Claim/Accident.vue";
import Pictures from "../components/Claim/Pictures.vue";
import Comments from "../components/Claim/Comments.vue";
import {addClaimCommentsRequest, getClaimRequest, processToInsurerRequest} from "../requests";
import {useRoute} from "vue-router";
import TextField from "../components/TextField.vue";
import {ClaimType} from "../types";
import AddItems from '../components/Claim/AddItems.vue';
import Items from "../components/Claim/Items.vue";
import Policy from "../components/Claim/Policy.vue";
import FinancialMovements from "../components/Claim/FinancialMovements.vue";

export default defineComponent({
  name: 'Claim',
  components: {AppBar,
    Vehicle, Accident, Pictures, Comments, Items, TextField, AddItems, Policy,
    FinancialMovements
  },
  setup() {
    const {params} = useRoute()
    const tabs = ref([
      {name: 'Vehicle', component: 'vehicle'},
      {name: 'Policy', component: 'policy'},
      {name: 'Accident', component: 'accident'},
      {name: 'Media', component: 'pictures'},
      {name: 'Claim Details', component: 'items'},
      {name: 'add items', component: 'add-items'},
      {name: 'Comments', component: 'comments'},
      {name: 'Financial Movements', component: 'financial-movements'},
    ])
    const activeTab = ref(tabs.value[0])
    const loading = ref(true)
    const claim = ref({} as ClaimType)
    const displayCommentModal = ref(false)
    const comment = ref('')

    function changeTab(tabIndex: number) {
      activeTab.value = tabs.value[tabIndex]
    }

    function fetchClaim() {
      loading.value = true
      getClaimRequest(params.claim as unknown as number)
          .then(({data}) => {
            claim.value = Object.assign({}, {accident: {third_party: {}}}, data)
            loading.value = false
          })
          .catch(err=>{
            alert('Un probl??me est survenu lors de l\'obtention de cette Sinistre')
          })
    }

    onMounted(fetchClaim)

    function computePolicyStatusColor(status) {
      switch (status) {
        case 'active':
          return 'text-primary';
        case 'expired':
          return 'text-error'
      }
    }

    function handleClaimUpdate(updated: ClaimType) {
      claim.value = updated
    }

    function processToInsurer() {
      processToInsurerRequest(claim.value.id)
          .then(() => claim.value.involves_insurer = true)
    }

    function addComment() {
      addClaimCommentsRequest(claim.value.id, comment.value)
          .then(() => {
            comment.value = ''
            displayCommentModal.value = false
          })
    }

    return {
      claim,
      tabs,
      changeTab,
      activeTab,
      loading,
      computePolicyStatusColor,
      handleClaimUpdate,
      processToInsurer,
      displayCommentModal,
      comment,
      addComment
    }
  }
})
</script>

<style scoped lang="scss">
.tabs {
  @apply w-full flex items-center border-b;

  .tab {
    @apply mx-5 py-5 font-normal text-xs;

    &.active {
      @apply font-bold border-b-2 text-baloon-yellow border-baloon-yellow;
    }
  }
}

.content {
  @apply p-5 relative;

  :deep(.row) {
    @apply flex space-x-12 w-2/3;

    .col {
      @apply mt-0 flex-1;

      .item {
        @apply mb-10;

        .field {
          @apply text-text text-sm mb-2;
        }

        .value {
          @apply text-text-dark text-sm font-medium;
        }
      }
    }
  }

  :deep(.heading) {
    @apply text-primary-deep text-base font-medium border-t py-5;
  }
}
</style>
