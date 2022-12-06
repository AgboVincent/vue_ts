<template>
  <v-col>
    <v-app-bar color="white" name="Dashboard" elevation="0">
        <div class="h-screen w-[480px] px-10 bg-white fixed top-5 ">
          <div class="h-[40px]  flex items-center bg-white mb-10">
            <div  class="flex items-center">
              <v-img src="/images/curacel_logo.png" alt="Logo" class="w-[30px] h-[30px] flex-initial"/>
              <v-img src="/images/curacel.svg" alt="Logo" class="w-[90px] h-[20px] flex-initial mr-20"/>
            </div>
            <p class="text-text-dark font-bold text-1xl ml-10">
                  {{ title }}
              </p>
          </div>
        </div>
    </v-app-bar>

    <v-main>
    <div class="bg-secondary flex w-full flex-row relative">
      <div class="h-screen w-[280px] px-10 bg-white fixed top-0 left-0">
        <div class="h-[80px] w-full flex items-center bg-white mb-10">
        </div>

        <div class="text-text">
          <router-link
              class="w-full px-4 block h-[48px] mb-4 flex items-center"
              :to="route.link"
              v-ripple
              v-for="(route, index) in routes"
              active-class="bg-[#F6F5F5] text-primary font-bold"
              :key="`route::${index}`"
              @click="getTitle(route.name)"
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
  </v-col> 
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  name: 'Authenticated',
  setup() {
    const title = ref(localStorage.getItem('title') ?? "Dashboard")
    const routes = ref([
      {
        name: 'Dashboard',
        link: '/dashboard',
        icon: 'mdi-home'
      }, 
      {
        name: 'Claims',
        icon: 'mdi-car-settings',
        link: '/collections'
      },
      {
        name: 'Self inspection',
        icon: 'mdi-account-circle',
        link: '/inspection'
      },
      {
        name: 'Policies',
        icon: 'mdi-format-list-bulleted',
        link: '/policies'
      },
      // {
      //   name: 'claims',
      //   icon: 'mdi-car-settings',
      //   link: '/claims'
      // },
      //{
      //   name: 'customers',
      //   icon: 'mdi-account-multiple',
      //   link: '/customers'
      // }
    ])

    function getTitle(value: string){
          localStorage.setItem('title', value)
          title.value = localStorage.getItem('title')
      }

    return {routes, title, getTitle}
  }
})
</script>
