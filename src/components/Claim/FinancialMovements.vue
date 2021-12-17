<template>
  <div>
    <div class="w-full flex -mt-5 mb-10">

    </div>

    <financial-movement-modal></financial-movement-modal>


  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref} from "vue";
import {ClaimType, CommentType} from "../../types";
import Table from './../Table.vue'
import TextField from "../TextField.vue";
import {claimCommentsRequest} from "../../requests";
import FinancialMovementModal from "./FinancialMovementModal.vue";

export default defineComponent({
  name: 'ClaimComments',
  components: {TextField, Table, FinancialMovementModal},
  props: {
    claim: {
      type: Object as PropType<ClaimType>
    }
  },
  setup(props) {
    const comments = ref([] as Array<CommentType>),
        currentPage = ref(1),
        total = ref(1)

    function fetchComments(page: number = 1) {

    }

    onMounted(() => fetchComments(1))
    return {comments, currentPage, total}
  }
})
</script>

<style lang="scss" scoped>
img {
  object-fit: cover;
}
</style>
