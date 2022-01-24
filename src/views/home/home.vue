<template>
    <div >
      <!-- COMPONENTE GENÉRICO HERDADO -->
    <container>
      <!--  TEMPLATE DE CONTÉUDO  -->
      <template v-slot:main>
        <v-col cols="12" sm="12" md="12" class="home-content">
            <div class="header">

              <v-text-field
              v-model="search" 
              placeholder="Procurar..." 
              outlined
              hide-details
              append-icon="mdi-search-web"
              dense
              style="max-width: 400px;">
              </v-text-field>

              <div class="header-favoritos">

                <h5>Favoritos</h5> 
                <v-icon
                  :id="'btnIdFavoritos'"
                  @click="isFavorite = true"
                  class="icon-action-content-edit"
                  size="2.7em"
                  title="Favoritos"
                  color="#FFD700"
                  >
                  mdi-star
                </v-icon>
                <favorites :show="isFavorite"  @close="isFavorite = false"/>
              </div>

            </div>
            <div class="datagrid-space">

              <datagrid
                dense
                :search="search"
                :headers="headers"
                :list-items="getListPokemons"
                :fixed-header="true"
                @showItem="value => getItem(value)"
                class="table-generated"
                height="100%"
              /> 

            </div>
        </v-col>
        <!-- DETALHES DO ITEM SELECIONADO -->
        <div data-app>
          <details-home :show="showDetails" :pokemon="pokemonDetails" :favorite="isFavorite"   @close="showDetails = false"/>
        </div>
      </template>
      <!-- TEMPLATE FOOTER SOBRESCRITO -->
      <template v-slot:page-footer>
        <div class="footer"> 
          <h5 style="color: #fff;padding-top: 10px;"> Listagem de Pokémons - Marco Souza 2022</h5>
        </div>
      </template>
    </container>
    </div>
</template>
<script>
import container from '../../components/container'
import datagrid from '../../components/datatable'
import home from './home'
import DetailsHome from './details'
import Favorites from './favorites'
import { mapGetters, mapActions  } from 'vuex'

export default {
  components: {
    container,
    datagrid,
    DetailsHome,
    Favorites
  },

  data() {
    return {
      headers: [
          { text: 'Nome', align: 'start', value: '_name'},
          { text: 'Visualizar', value: 'action', sortable: false },
        ],
      items: [],
      search: '',
      routeChange: '',
      showDetails: false,
      pokemonDetails: {},
      isFavorite: false
    }
  },

  methods: home,

  computed: {
      ...mapGetters(['getListPokemons', 'getFavoritePokemons']),
  },

  watch: {
    getPagination(value) {
      this.getContent()
    }
  },
  
  beforeMount() {
    let favorites = JSON.parse(localStorage.getItem('favorites'))
    if (favorites) {
      this.setFavoritePokemons(favorites)
    }
  }
}
</script>
<style scoped>
.home-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding: 0;
  height: 100%;
}

.datagrid-space{
  width: 100%;
  height: 95%;
  overflow-y: hidden;
  padding-left: 1%;
}

.table-generated{
  width: 100%;
  max-height: 90%;
}

.header{
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  padding-left: 2%;
  padding-bottom: 1%;
  border-bottom: 1px solid silver;
}

.header-favoritos{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width:65%;
  height: 8vh;
}

.footer{
  display: flex;
  width: 100%;
  justify-content: center;
  height: 10vh;
  background-color: #35495E;
}
</style>