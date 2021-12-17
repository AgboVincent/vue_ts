<template>
  <div>
    <v-dialog  justify="center"
        v-model="dialog"
        min-width="500"
    >
      <template v-slot:activator="{ props }">
        <v-btn
            color=" lighten-2"
            dark
            v-bind="props"
        >
          Add
        </v-btn>
      </template>

      <v-card>
        <v-card-title class="text-h5 grey lighten-2">
          Add Financial Movement
        </v-card-title>

        <v-card-text>
          <v-form v-model="valid">
            <text-field
                type="select"
                v-model="firstname"

                label="Nature"
                required
            ></text-field>


          </v-form>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
              color="primary"
              variant="text"
              @click="dialog = false"
          >
            I accept
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref} from "vue";
import {ClaimType, CommentType} from "../../types";
import Table from './../Table.vue'
import TextField from "../TextField.vue";
import {claimCommentsRequest} from "../../requests";

export default defineComponent({
  components: {TextField, Table},
  data(){
    return {

    }
  },
  props: {

  },
  setup(props) {



    return {}
  }
})
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
</style>
