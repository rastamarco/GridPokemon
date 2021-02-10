<template>
 <v-row>
   <v-col cols="12" sm="12" md="12" class="app-pokemon" v-if="!isMobile">
      <v-col cols="5" sm="6" md="4" class="card" v-for="pokemon in allPokemons" :key="pokemon.id"  >
        <v-hover v-slot="{ hover }" >
          <v-img  contain :src="pokemon.images.large" max-height="350" max-width="350" @click="SelectCard(pokemon)">
            <v-expand-transition >
              <div v-if="hover" class="pokemon-hover">
                <small class="pokemon-hover-text"><b>Nome: {{pokemon.name}}</b></small>
                <small class="pokemon-hover-text"><b>Id: {{pokemon.id}}</b></small>
                <small class="pokemon-hover-text"><b>Tipo: </b></small>
                <v-list dense style="background: orange;" >
                      <v-list-item v-for="(item, i) in pokemon.types" :key="i" no-action dense>
                        <v-list-item-icon>
                          <v-icon >mdi-hops</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="item" style="font-weight:bold;color:black;"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                  </v-list>
              </div>
            </v-expand-transition>
        </v-img>
        </v-hover>
      </v-col>
   </v-col>
   <v-col cols="12" sm="12" md="12" class="app-pokemon" v-if="isMobile">
      <v-col cols="12" sm="12" md="12" class="card-mobile">
        <Carousel class="card-imgs">
          <Slide v-for="pokemon in allPokemons" :key="pokemon.id" class="card-slides" >
            <v-hover v-slot="{ hover }" >
                  <v-img contain :src="pokemon.images.large" max-height="350" max-width="310" @click="SelectCard(pokemon)" >
                   <v-expand-transition >
                    <div v-if="hover" class="pokemon-hover">
                    <small class="pokemon-hover-text"><b>Nome: {{pokemon.name}}</b></small>
                    <small class="pokemon-hover-text"><b>Id: {{pokemon.id}}</b></small>
                    <small class="pokemon-hover-text"><b>Tipo: </b></small>
                    <v-list dense style="background: orange;" >
                      <v-list-item v-for="(item, i) in pokemon.types" :key="i" no-action dense>
                        <v-list-item-icon>
                          <v-icon >mdi-hops</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="item" style="font-weight:bold;color:black;"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                    </v-list>
                  </div>
                </v-expand-transition>
              </v-img>
            </v-hover>
          </Slide>
        </Carousel>
      </v-col>  
    </v-col>
 </v-row>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Carousel, Slide } from 'vue-carousel';
import { Action, Getter } from 'vuex-class';

@Component({
  components:{
    Carousel,
    Slide
  }
})
export default class Home extends Vue {
  @Action GetAllPokemons
  @Action SetBackHome

  @Getter allPokemons

  private isMobile: Boolean = false;
  
  public async SelectCard(pokemon: any): Promise<void>{
    console.log(pokemon);
    window.localStorage.setItem('pokemon', JSON.stringify(pokemon))
    await this.SetBackHome({backHome: true})
    this.$router.push('Details');
  }

  beforeMount(){
    if( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i) ){
        this.isMobile = true 
    } else {
        this.isMobile = false
    }
  }

  async mounted(){
      if(this.allPokemons === null){
        await this.GetAllPokemons();
      }
  }
}
</script>
<style scoped>
.app-pokemon{
  display:flex;
  flex-direction:row;
  justify-content: flex-start;
  flex-wrap: wrap;
  align-items: flex-start;
  width: 100%;
  height: 85vh;
  margin-top: 2%;
  margin-left: 3%;
  padding-right: 6%;
}

.app-pokemon .card{
  display:flex;
  flex-direction:column;
  height: 75%;
  cursor: pointer;
}

.app-pokemon .card:hover{
  background: white;
  opacity: 0.8;
}


.app-pokemon .card .details{
  display:flex;
  flex-direction:column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
}

.app-pokemon .card .details .details-pokemon{
  display:flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.pokemon-hover{
  background: orange;
  display:flex;
  flex-direction: column;
  opacity: 0.9;
  height: 40%;
  margin-left: 12%;
  margin-right: 12%;
}

.pokemon-hover-text{
  color: black;
  font-weight: bold;
  margin-left: 5%;
  margin-top: 5%;
}

.app-pokemon .card-mobile{
  display:flex;
  flex-direction:column;
  height: 100%;
}

.app-pokemon .card-mobile .card-imgs{
  display:flex;
  flex-direction: column;
  height: 100%;
}

.app-pokemon .card-mobile .card-imgs .card-slides{
  display:flex;
  flex-direction: column;
  height: 70vh;
  cursor: pointer;
}

.app-pokemon .card-mobile .card-imgs .card-slides:hover{
  background: white;
  opacity: 0.8;
}

.app-pokemon .card-mobile .card-imgs .card-slides .card-details{
  display: flex;
  flex-direction: column;
  height: 95%;
  width: 100%;
}


@media screen and (min-width: 320px) and (max-width: 600px) {
  .pokemon-hover{
    background: orange;
    display:flex;
    flex-direction: column;
    opacity: 0.9;
    height: 40%;
    margin-left: 5%;
    margin-right: 5%;
    margin-top: 25%;
  }
}

</style>
