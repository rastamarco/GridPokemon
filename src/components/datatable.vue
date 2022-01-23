<template>
  <v-data-table
    :options.sync="pagination"
    :headers="headers"
    :items="listItems"
    :items-per-page="20"
    :server-items-length="getTotalRows ? getTotalRows : listItems.length"
    :fixed-header="true"
    :hide-default-footer="listItems.length === 0"
    :footer-props="{
      'items-per-page-text': `Items por Página  `,
      'items-per-page-options': [20, 30, 50, 100],
      'show-first-last-page': true,
      'show-current-page': true
    }"
    :single-expand="true"
    :search="search"
    height="100%"
    :item-key="itemKey"
    class="table-component"
    @item-selected="value => $emit('selected', value)"
  >
    
    <template v-slot:item.action="{ item }">
      <template>
        <div class="container-actions">
            <v-icon
                @click="copyItem(item)"
                class="icon-action-content-edit"
                size="1.7em"
                title="Visualizar"
                >
                mdi-eye
            </v-icon>
        </div>
      </template>
    </template>
  </v-data-table>
</template>

<script>
import moment from 'moment'
import { mapGetters } from 'vuex'

export default {
  components: {
  },
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
    enableEdit: {
      type: Boolean,
      default: true
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
    copyItem(item) {
      let itemIdx = this.listItems.indexOf(item)
      if (itemIdx !== -1) {
        item.indexList = itemIdx
      }

      this.$emit('copy', item)
    }
  },

  filters: {
    formatDate(date) {
      if (!date) return ''
      return moment(date).format('DD/MM/YYYY')
    }
  },

  watch: {
    pagination: {
      handler (value) {
        this.setPaginate(value)
      },
      deep: true
    }
  },

  computed: {
    ...mapGetters(['getTotalRows']),

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

.automaticLoad {
  display: flex;
  justify-content: center;
  border: 2px solid #06b100;
  border-radius: 5px;
  color: #06b100;
  padding: 0 1em;
  font-weight: bolder;
  max-width: 50px;
}

.icon-action-content {
  display: flex;
  width: 100%;
  justify-content: space-around;
}

.icon-action-content-edit:hover {
  color: #00437a;
}

.icon-action-content-remove:hover {
  color: #f00;
}

.icon-action-content-log:hover {
  color: #00437a;
}

.table-history {
  padding: 0 !important;
}

.table-component {
  display: flex;
  flex-direction: column;
  height: auto;
  margin-bottom: 36px;
}

.table-container {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.input-search {
  margin: 1em 1em;
  width: 50% !important;
}
</style>
