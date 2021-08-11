<template>
  <AppBar navigator title="Back to Claims"/>
  <div v-if="!loading">
    <p class="text-text-dark text-bold pt-12 pb-1 text-2xl">
      {{ claim.policy.vehicle.model }}
    </p>
    <p class="text-text pb-10">
      {{ claim.policy.vehicle.manufacturer }}
    </p>

    <div class="w-full rounded bg-white p-6 flex items-center">
      <p class="text-text text-xs mr-13">
        Policy Type
        <span class="text-text-dark block mt-2 text-sm capitalize">
        {{ claim.policy.type }}
      </span>
      </p>
      <p class="text-text text-xs mr-13">
        Policy Number
        <span class="text-text-dark block mt-2 text-sm">
        {{ claim.policy.number }}
      </span>
      </p>
      <p class="text-text text-xs mr-13">
        Policy Start
        <span class="text-text-dark block mt-2 text-sm">
        {{ formatDate(claim.policy.created_at) }}
      </span>
      </p>
      <p class="text-text text-xs mr-13">
        Policy Expiry
        <span class="text-text-dark block mt-2 text-sm">
        {{ formatDate(claim.policy.expires_at) }}
      </span>
      </p>
      <p class="text-text text-base mr-13">
        Policy Status
        <span
            class="block mt-2 text-lg capitalize"
            :class="computePolicyStatusColor(claim.policy.status)"
        >
        {{ claim.policy.status }}
      </span>
      </p>
    </div>

    <div class="bg-white rounded">
      <div class="tabs">
        <a href="#"
           @click.prevent="() => changeTab(tabIndex)"
           v-for="(tab, tabIndex) in tabs"
           class="tab"
           :class="activeTab.name === tab.name ? 'active' : ''"
           :key="`tabs:${tabIndex}`">{{ tab.name }}</a>
      </div>

      <div class="content">
        <component :is="activeTab.component" :key="activeTab.name" :claim="claim"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import AppBar from "../components/AppBar.vue";
import {defineComponent, onMounted, ref} from "vue";
import Vehicle from "../components/Claim/Vehicle.vue";
import Accident from "../components/Claim/Accident.vue";
import Pictures from "../components/Claim/Pictures.vue";
import {getClaimRequest} from "../requests";
import {useRoute} from "vue-router";
import {ClaimType} from "../types";
import Items from "../components/Claim/Items.vue";

export default defineComponent({
  name: 'Claim',
  components: {AppBar, Vehicle, Accident, Pictures, Items},
  setup() {
    const {params} = useRoute()
    const tabs = ref([
      {name: 'Vehicle Details', component: 'vehicle'},
      {name: 'Accident Details', component: 'accident'},
      {name: 'Pictures Upload', component: 'pictures'},
      {name: 'ML Results', component: 'items'}
    ])
    const activeTab = ref(tabs.value[0])
    const loading = ref(true)
    const claim = ref({} as ClaimType)

    function changeTab(tabIndex) {
      activeTab.value = tabs.value[tabIndex]
    }

    function fetchClaim() {
      loading.value = true
      getClaimRequest(params.claim as number)
          .then(({data}) => {
            claim.value = data
            loading.value = false
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

    return {claim, tabs, changeTab, activeTab, loading, computePolicyStatusColor}
  }
})
</script>

<style scoped lang="scss">
.tabs {
  @apply mt-4 w-full flex items-center border-b;

  .tab {
    @apply mx-5 py-5 font-normal text-xs;

    &.active {
      @apply font-bold border-b-2 text-primary border-primary;
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