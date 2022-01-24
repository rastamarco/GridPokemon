<template>
  <!-- Componente de tabela/Grid genérico, contém paginação instanciada já, substituindo o método nativo de search por um pessoal -->
  <v-data-table
    :options.sync="pagination"
    :headers="headers"
    :items="listSearch"
    :items-per-page="20"
    :server-items-length="getTotalRows ? getTotalRows : listSearch.length"
    :fixed-header="true"
    :hide-default-footer="listItems.length === 0"
    :footer-props="{
      'items-per-page-text': `Por Página`,
      'items-per-page-options': [20, 30, 50, 100],
      'show-first-last-page': false,
      'show-current-page': true
    }"
    :single-expand="true"
    :search="search"
    height="100%"
    :item-key="itemKey"
    class="table-component"
  >
    <template v-slot:item.action="{ item }">
      <!-- Esse template vê o item que contém a tag "action" e coloca um icone , que ao clicar emit um evento retornando o item clicado -->
      <template>
        <div class="container-actions">
          <v-icon
              :id="'btnId'+item.name"
               @click="showItem(item)"
              class="icon-action-content-edit"
              size="1.7em"
              title="Detalhes"
              >
              mdi-eye
            </v-icon>
        </div>
      </template>
    </template>
  </v-data-table>
</template>
<script>
import { mapGetters } from 'vuex'

export default {
  props: {
    listItems: {
      type: Array,
      default: () => []
    },
    headers: {
      type: Array,
      default: () => []
    },
    itemsPerPage: {
      type: Number,
      default: 10
    },
    footerProps: {
      type: Object,
      default: () => {}
    },
    search: {
      type: String,
      default: ''
    },
    itemKey: {
      type: String,
      default: 'id'
    }
  },

  data() {
    return {
      pagination: {}
    }
  },

  methods: {
    //Retorna o item selecionado pelo icone do Grid
    showItem(item) {
      let itemIdx = this.listItems.indexOf(item)
      if (itemIdx !== -1) {
        item.indexList = itemIdx
      }
      
      this.$emit('showItem', item)
    }
  },

  watch: {
    //Método que verifica a paginação da tabela, qualqeur interação com a paginaçao cai aqui e insere globalmente
    pagination: {
      handler (value) {
        this.setPaginate(value)
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters(['getTotalRows']),
    //Método search que substitui o nativo, pois com a paginação quebra o nativo 
    listSearch() {
      return this.listItems.filter(i => {
          return Object.values(i).join(',').toUpperCase().includes(this.search.toUpperCase())
      })
    }
  },

  // Limpamos a paginação antes de destruir o componente
  beforeDestroy() {
    this.setPaginate({ itemsPerPage: 20, page: 1 })
    this.setTotalRows(0)
  }
}
</script>

<style scoped>
.container-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.icon-action-content {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.icon-action-content-edit:hover {
  color: #00437a;
}

.table-component {
  display: flex;
  flex-direction: column;
  height: auto;
  margin-bottom: 36px;
}

.table-component ::-webkit-scrollbar-track{
  background-color: #F4F4F4;
}

.table-component ::-webkit-scrollbar{
  width: 5px;
  background: #F4F4F4;
}

.table-component ::-webkit-scrollbar-thumb{
  background: silver;
}
</style>
