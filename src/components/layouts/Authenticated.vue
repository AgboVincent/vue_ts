<template>
  <v-main>
    <div class="bg-secondary flex w-full flex-row relative">
      <div class="h-screen w-[280px] px-10 bg-white fixed top-0 left-0">
        <div class="h-[80px] w-full flex items-center bg-white mb-10">
          <v-img src="/images/logo.png" alt="Logo" class="w-[140px] h-auto flex-initial"/>
        </div>

        <div class="text-text">
          <router-link
              class="w-full px-4 block h-[48px] mb-4 flex items-center"
              :to="route.link"
              v-ripple
              v-for="(route, index) in routes"
              active-class="bg-[#E0BC00] text-primary font-bold"
              :key="`route::${index}`"
          >
            <v-icon size="large">
              {{ route.icon }}
            </v-icon>
            <span class="ml-5">
              {{ $t(route.name )}}
            </span>
          </router-link>
        </div>
      </div>

      <div class="min-h-screen container mx-auto flex">
        <div class="w-[280px] flex-shrink-0"/>
        <div class="p-2 flex-grow-1">
          <router-view/>
        </div>
      </div>
    </div>
  </v-main>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: 'Authenticated',
  setup() {
    const routes = ref([
      {
        name: 'dashboard',
        link: '/dashboard',
        icon: 'mdi-home'
      }, {
        name: 'claims',
        icon: 'mdi-car-settings',
        link: '/claims'
      }, {
        name: 'customers',
        icon: 'mdi-account-multiple',
        link: '/customers'
      }
    ])

    return {routes}
  }
})
</script>
