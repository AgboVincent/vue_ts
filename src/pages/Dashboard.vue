<template>
  <v-main>
    <div class="bg-secondary flex w-screen flex-row">
      <div class="h-screen w-[280px] px-10 bg-white">
        <div class="h-[80px] w-full flex items-center bg-white mb-10">
          <v-img src="/images/logo.png" alt="Logo" class="w-[140px] h-auto flex-initial"/>
        </div>

        <div class="text-text">
          <router-link
              class="w-full px-4 block h-[48px] mb-4 flex items-center"
              :to="route.link"
              v-for="(route, index) in routes"
              active-class="bg-[#E8F3FB] text-primary font-bold"
              :key="`route::${index}`"
          >
            <v-icon size="large">
              {{ route.icon }}
            </v-icon>
            <span class="ml-5">
              {{ route.name }}
            </span>
          </router-link>
        </div>
      </div>
      <div class="min-h-screen container mx-auto">
        <AppBar>
          <TextField icon="mdi-search" placeholder="Search customers, emails , claim references" class="bg-white !m-0"/>
        </AppBar>

        <p class="text-primary-deep text-bold pt-12 pb-10 text-2xl">Dashboard</p>

        <div class="grid grid-cols-4 gap-x-4">
          <div class="flex items-center px-10 justify-between py-10 rounded bg-white" v-for="i in 4" :key="`summary:${i}`">
            <p class="text-text">
              Total Claims
              <span class="text-2xl text-primary-deep font block">
                1200
              </span>
            </p>
            <div class="w-[40px] h-[40px] grid place-items-center bg-secondary">
              <v-icon size="large" color="primary">
                mdi-car-settings
              </v-icon>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-main>
</template>

<script lang="ts">
import {defineComponent, ref} from "vue";
import AppBar from "../components/AppBar.vue";
import TextField from "../components/TextField.vue";

export default defineComponent({
  name: 'Dashboard',
  components: {TextField, AppBar},
  setup() {
    const routes = ref([
      {
        name: 'Dashboard',
        link: '/dashboard',
        icon: 'mdi-home'
      }, {
        name: 'Claims',
        icon: 'mdi-car-settings',
        link: '/claims'
      }, {
        name: 'Customers',
        icon: 'mdi-account-multiple',
        link: '/customers'
      }
    ])
    return {routes, dialog: ref(true)}
  }
})
</script>
