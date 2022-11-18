<template>
    <Table
      :headers="[
        'Customer',
        'Email',
        'Policy',
        'Date of claim',
        ''
      ]"
      :items="data"
      :page="page"
      @update:page="$event => $emit('update:page', $event)"
      :total-pages="total">
    <template v-slot:default="{ item: row }">
      <td>{{ row.user.name }}</td>
      <td>{{ row.user.email }}</td>
      <td>{{ row.policy }}</td>
      <td>{{ formatDateTime(row.created_at) }}</td>
      <td>
        <ui-menu-anchor position="bottom right">
          <v-btn icon="mdi-dots-horizontal" color="transparent" elevation="0" @click="openCollectionOption(row)"/>
          <ui-menu v-model="row.open" class="p-0">
            <ui-menuitem value="View" @click="openCollectionDetail(row)">
              <router-link :to="{ name: 'collectionsDetails', params: { rowData: row, id:row.id } }">
                <div class="option">
                  {{ "View" }}
                </div>
              </router-link>
            </ui-menuitem>
          </ui-menu>
        </ui-menu-anchor>
      </td>
    </template>
  </Table>
</template>

<script lang="ts">
import { defineComponent, ref, SetupContext } from 'vue';
import Table from './Table.vue';

export default defineComponent({
    name: "ColldctionTable",
    components: {Table},
    props: {
    data: {
      type: Array
    }, 
    total: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 0
    }
  },
   emits: ['update:page'],
    setup(_, {emit}: SetupContext) {
         
        
         function openCollectionOption(row: any) {
            row.open = true;
         }

         function openCollectionDetail(row: any) {
            this.$router.push({ name: 'collectionsDetails', 
            params: {
                rowData: row ,
                id: row.id
                }
            })
        }
        return {openCollectionOption, openCollectionDetail}
        
    },
})
</script>


<style scoped>

</style>