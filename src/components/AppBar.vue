<template>
  <div class="h-[80px] w-full flex items-center justify-between">
    <div class="w-1/2">
      <slot>
        <router-link to="/" class="flex items-center" v-if="navigator">
          <v-icon size="large" class="mr-5">mdi-arrow-left</v-icon>
          {{ navigator || 'Back' }}
        </router-link>
      </slot>
    </div>
    <div>
      <div>
        <ui-menu-anchor>
          <v-btn @click="openTranslate = true">Select Language</v-btn>
          <ui-menu v-model="openTranslate">
            <ui-menuitem v-for="item in countries" class="vg-container " :key="item.id" @click="translate(item.code)"
                         :title="item.title">
              {{ item.title }}
            </ui-menuitem>

          </ui-menu>
        </ui-menu-anchor>
      </div>

      <div id="google_translate_element2"></div>
    </div>
    <ui-menu-anchor position="bottom right">
      <v-avatar
          v-ripple
          @click="open = true"
          color="primary lighten-2 cursor-pointer"
          rounded
          v-if="$store.state.profile.first_name"
          size="40"
      >
        {{ `${$store.state.profile.first_name[0]} ${$store.state.profile.last_name[0]}` }}
      </v-avatar>
      <ui-menu v-model="open">
        <div>
          <p class="text-text-dark text-sm p-4 font-bold">
            {{ $store.state.profile.first_name }} {{ $store.state.profile.last_name }}
            <span class="text-text text-xs font-normal">{{ $store.state.profile.email }}</span>
          </p>
          <router-link to="/settings" class="text-text block p-4 text-xs">Profile Settings</router-link>
          <router-link to="/logout" class="block text-xs text-text p-4">Logout</router-link>
        </div>
      </ui-menu>
    </ui-menu-anchor>
  </div>
</template>
<script lang="ts">
import {defineComponent, ref} from "vue";

export default defineComponent({
  props: {
    navigator: {
      type: [String, Boolean],
      default: ''
    },
    title: {
      type: String,
      default: ''
    }
  },
  setup() {
    const open = ref(false)
    const countries = ref([
      {
        code: "en",
        title: "English"
      }, {
        code: "fr",
        title: "French"
      }
    ])

    function translate(code: string) {
      window.location = `#googtrans(${code})`;
      location.reload()
    }

    const openTranslate = ref(false)
    return {open, translate, countries, openTranslate}
  }
})
</script>
