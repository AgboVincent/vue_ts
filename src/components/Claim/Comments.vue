<template>
  <div>
    <div class="w-full flex -mt-5 mb-10">
      <Table :items="comments" :headers="[$t('date'), $t('sender'),$t('comment')]" :page="currentPage" :total-pages="total">
        <template v-slot:default="{ item: row, index }">
          <td>{{ formatDateTime(row.created_at) }}</td>
          <td>{{ $t(row.author.type )}}</td>
          <td>{{ row.comment }}</td>
        </template>
      </Table>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, onMounted, PropType, ref} from "vue";
import {ClaimType, CommentType} from "../../types";
import Table from './../Table.vue'
import TextField from "../TextField.vue";
import {claimCommentsRequest} from "../../requests";

export default defineComponent({
  name: 'ClaimComments',
  components: {TextField, Table},
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
      comments.value.splice(0)
      claimCommentsRequest(props.claim.id, page)
          .then(({data}) => {
            currentPage.value = data.meta.currentPage
            total.value = data.meta.last
            comments.value.push(...data.data)
          })
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
