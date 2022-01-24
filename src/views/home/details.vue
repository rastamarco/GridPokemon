<template>
  <div v-if="show">
    <!-- MODAL GENÉRICO INSTANCIADO -->
    <modal :show="show" :title="'Detalhes'" @close="$emit('close')" >
      <!-- SLOT SOBRESCRITO -->
      <div class="details-content" slot="main" >
        <!-- LADO ESQUERDO DO MODAL -->
          <div class="details-image">
              <v-img
                max-height="150"
                max-width="200"
                :src="pokemon.sprites.front_default"
              />
              <h1 class="pokemon-name"> {{ pokemon.name }} </h1>
              <br />
              <div class="favorites"> 
                <h4> Adicione nos Favoritos </h4> 
                <v-icon
                  @click="addToFavorite(pokemon)"
                  size="1.7em"
                  title="Adicionar aos favoritos"
                  :color="'#FFD700'">
                  mdi-star
                </v-icon>
              </div>
          </div>
          <!-- LADO DIREITO DO MODAL -->
          <div class="other-details">

            <div class="details">
              <h4 > Habilidades: </h4>
              <div v-for="ability in pokemon.abilities" :key="ability.ability.name">
                <h5> - {{ability.ability.name.toUpperCase()}}</h5>
              </div>
              <br/> 
              <h4> Experiência: </h4>
              <h5>{{ pokemon.base_experience }} </h5>
            </div>

            <div class="details">
              <h4> Informações de Batalha: </h4> 
              <br />
              <div v-for="stats in pokemon.stats" :key="stats.stat.name" class="details-info">
                <h6><strong>{{stats.stat.name.toUpperCase()}}</strong></h6>
                <h6>Força: {{stats.effort}}</h6>
                <br />
              </div>
            </div>

          </div>
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
    },
    pokemon: {
      type: Object,
      default: {}
    },
    favorite: {
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
.details-content{
  display: flex;
  flex-direction: row;
  align-items: center;
  overflow: hidden;
  padding-bottom: 5%;
  height: 50vh;
  width: 120vh;
}

.details-image{
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 40vh;
  width: 30%;
}
.other-details{
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  height: 40vh;
  width: 70%;
}

.details{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 40vh;
  width: 50%;
}

.pokemon-name{
  font-size: 20px;
  color: darkslategrey;
  text-transform: uppercase;
}

.details-info{
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

</style>