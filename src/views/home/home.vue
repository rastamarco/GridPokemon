<template>
    <div >
    <container>
      <template v-slot:main>
        <v-col cols="12" sm="12" md="12" class="home-content">
              <datagrid
                :headers="headers"
                :list-items="items"
                :fixed-header="true"
                :enableRemove="false"
                :showExpand="false"
                height="100%"
                @editItem="value => getContent(value)"
                class="table-generated"
              /> 
        </v-col> 
      </template>
    </container>
    </div>
</template>
<script>
import container from '../../components/container'
import datagrid from '../../components/datatable'
import home from './home'

export default {
  components: {
    container,
    datagrid
  },

  data() {
    return {
      headers: [
          { text: 'Nome', align: 'start', value: 'name'},
          { text: 'Visualizar', value: 'action', sortable: false },
        ],
      items: []
    }
  },

  methods: home,

  watch: {
    getPagination(value) {
      this.getContent()
    }
  }
}
</script>
<style scoped>
.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0;
}

.table-generated{
  width: 100%;
}
</style>