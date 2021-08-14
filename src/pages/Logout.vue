<script lang="ts">
import {useStore} from "../store";
import {defineComponent} from "vue";
import {useRouter} from "vue-router";

export default defineComponent({
  setup() {
    const {dispatch} = useStore(),
        {push} = useRouter()

    dispatch('logout')
        .then(() => push('/login'))
  },
  render(h) {
    return h('h1', 'Logging out...')
  }
})
</script>
