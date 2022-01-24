<template>
  <div v-if="show">
    <!-- MODAL GENÉRICO INSTANCIADO COMO FAVORITOS AGORA -->
    <modal :show="show" :title="'Favoritos'" @close="$emit('close')" >
      <!-- SLOT SOBRESCRITO -->
      <div class="favorites-content" slot="main" v-if="getFavoritePokemons.length > 0">
        <!-- APÓS TER OS FAVORITOS, ITERO SOBRE ELES COLOCANDO NESSE CARD -->
        <div class="details-favorites" v-for="pokemon in getFavoritePokemons" :key="pokemon.id">
          <v-card elevation="5" outlined width="125px">
            <h5 style="padding-top: 10px;">{{ pokemon.name.toUpperCase() }}</h5>
            <v-img
                  max-height="150"
                  max-width="250"
                  :src="pokemon.img"
            ></v-img>
            <v-icon
              :id="'btnIdRemove'"
              @click="removeFavorite(pokemon.id)"
              style="padding-bottom: 10px;"
              size="1.5em"
              title="Remover dos Favoritos"
              color="#FF4500"
              >
              mdi-delete
            </v-icon>
          </v-card>

        </div>
      </div>
      <!-- COMPONENTE PARA VISUALIZAÇÃO SEM FAVORITOS -->
      <div class="not-favorite" slot="main" v-if="getFavoritePokemons.length === 0">
          <h3>Você ainda não possui nenhum Pokémon Favorito!</h3>
      </div>
    </modal>
  </div>
</template>
<script>
import Modal from '../../components/modal'
import Home from './home'
import { mapGetters } from 'vuex'

export default {
  components :{
    Modal
  },

  props: {
    show: {
      type: Boolean,
      default: false
    }
  },

  methods: Home,

  computed: {
      ...mapGetters(['getListPokemons', 'getFavoritePokemons'])
  }
}
</script>
<style scoped>
.favorites-content{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: flex-start;
  flex-wrap: wrap;
  overflow-y: auto;
  padding-bottom: 5%;
  height: 65vh;
  width: 120vh;
  padding-left: 8%;
}

.favorites-content::-webkit-scrollbar-track{
  background-color: #F4F4F4;
}

.favorites-content::-webkit-scrollbar{
  width: 5px;
  background: #F4F4F4;
}

.favorites-content::-webkit-scrollbar-thumb{
  background: silver;
}

.not-favorite{
  display: flex;
  flex-direction: row;
  width: 115vh;
  align-items: center;
  justify-content: center;
}

.details-favorites{
  display: flex;
  flex-direction: column;
  align-items: center;
}

</style>