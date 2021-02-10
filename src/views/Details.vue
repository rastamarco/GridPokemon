<template>
<div>
 <v-row>
   <v-col cols="12" sm="12" md="12" class="app-pokemon" v-if="!isMobile">
      <v-col cols="4" sm="5" md="5" class="card" >
         <v-img contain :src="pokemonSelected.images.large" max-height="490" max-width="500"/>
      </v-col>
      <v-col cols="6" sm="7" md="7" class="card-details">
          <v-col cols="12" sm="12" md="12" class="pokemon-details">
            <v-row>
              <v-col cols="12" sm="6" md="6" class="header">
                  <span>Nome: {{pokemonSelected.name}}</span>
                  <span>ID: {{pokemonSelected.id}}</span>
                  <span>Tipo: </span>
                  <v-list dense >
                      <v-list-item v-for="(item, i) in pokemonSelected.types" :key="i" no-action>
                        <v-list-item-icon>
                          <v-icon >mdi-hops</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="item"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                  </v-list>
                  <span>Fraqueza: </span>
                  <v-list>
                      <v-list-item v-for="(item, i) in pokemonSelected.weaknesses" :key="i" no-action>
                        <v-list-item-icon>
                          <v-icon >mdi-heart-broken</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="item.type"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                  </v-list>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="content">
                  <v-list dense>
                    <v-list-group 
                      v-model="attackSelected">
                      <template v-slot:activator>
                        <v-list-item-content >
                          <v-list-item-title>Lista de Ataques</v-list-item-title>
                        </v-list-item-content>
                      </template>
                      <v-dialog v-model="dialog" persistent width="100%" >
                        <template v-slot:activator="{ on, attrs }">
                          <v-list-item v-for="item in pokemonSelected.attacks" :key="item.name" v-on="on" v-bind="attrs">
                            <v-list-item-content>
                              <v-list-item-title v-text="item.name" @click="SelectItem(item)"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                        <ListAttacks v-bind="{pokemonAttack}" v-on="{CloseAtkDetails}" class="modal" />
                      </v-dialog>
                    </v-list-group>
                  </v-list>
              </v-col>
            </v-row>
          </v-col>
      </v-col>
    </v-col>
 </v-row>
  <v-row>
   <v-col cols="12" sm="12" md="12" class="app-pokemon" v-if="isMobile">
      <v-col cols="12" sm="5" md="5" class="card" >
         <v-img contain :src="pokemonSelected.images.large" max-height="400" max-width="300"/>
      </v-col>
      <v-col cols="12" sm="7" md="7" class="card-details">
          <v-col cols="12" sm="12" md="12" class="pokemon-details">
            <v-row>
              <v-col cols="12" sm="12" md="12" class="header">
                  <span>Nome: {{pokemonSelected.name}}</span>
                  <span>ID: {{pokemonSelected.id}}</span>
                  <span>Tipo: </span>
                  <v-list dense >
                      <v-list-item v-for="(item, i) in pokemonSelected.types" :key="i" no-action>
                        <v-list-item-icon>
                          <v-icon >mdi-hops</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="item"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                  </v-list>
                  <span>Fraqueza: </span>
                  <v-list>
                      <v-list-item v-for="(item, i) in pokemonSelected.weaknesses" :key="i" no-action>
                        <v-list-item-icon>
                          <v-icon >mdi-heart-broken</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                          <v-list-item-title v-text="item.type"></v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>
                  </v-list>
              </v-col>
              <v-col cols="12" sm="6" md="6" class="content">
                  <v-list dense>
                    <v-list-group 
                      v-model="attackSelected">
                      <template v-slot:activator>
                        <v-list-item-content >
                          <v-list-item-title>Lista de Ataques</v-list-item-title>
                        </v-list-item-content>
                      </template>
                      <v-dialog v-model="dialog" persistent width="100%" >
                        <template v-slot:activator="{ on, attrs }">
                          <v-list-item v-for="item in pokemonSelected.attacks" :key="item.name" v-on="on" v-bind="attrs">
                            <v-list-item-content>
                              <v-list-item-title v-text="item.name" @click="SelectItem(item)"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </template>
                        <ListAttacks v-bind="{pokemonAttack}" v-on="{CloseAtkDetails}" class="modal" />
                      </v-dialog>
                    </v-list-group>
                  </v-list>
              </v-col>
            </v-row>
          </v-col>
      </v-col>
    </v-col>
 </v-row>


</div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

import ListAttacks from '../views/ListAttacks.vue';

@Component({
  components:{
    ListAttacks
  }
})

export default class Details extends Vue {
  @Action SetBackHome

  private isMobile: Boolean = false;
  private pokemonSelected: any = null;
  private dialog:boolean = false;
  private attackSelected: boolean = true;
  private pokemonAttack: any = null;
  private sizeModal: any = null;

  public async SelectItem(pokemon: any): Promise<void>{
    this.pokemonAttack = pokemon;
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
    const poke = window.localStorage.getItem('pokemon')
    if (poke !== null){
      this.pokemonSelected = JSON.parse(poke)
    }
    this.SetBackHome({backHome: true})
  }

  public CloseAtkDetails():void{
    this.dialog = false;    
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
  height: 100%;
}


.app-pokemon .card-details{
  display:flex;
  flex-direction:column;
  align-items: flex-start;
  justify-content: flex-start;
  height: 100%;
  width: 100%;
}

.app-pokemon .card-details .pokemon-details{
  display:flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}

.app-pokemon .card-details .pokemon-details .header{
  display:flex;
  flex-direction: column;
  height: 70%;
}

.app-pokemon .card-details .pokemon-details .content{
  display:flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 100%;
}

.modal{
  margin:0;
}


@media screen and (min-width: 320px) and (max-width: 640px) {
  .app-pokemon{
      display:flex;
      flex-direction:row;
      justify-content: flex-start;
      justify-content: flex-start;
      flex-wrap: wrap;
      align-items: flex-start;
      width: 100%;
      height: 85vh;
      margin-top: 2%;
      margin-left: 3%;
      padding-right: 6%;
  }

  .app-pokemon .card-details .pokemon-details .header{
    display:flex;
    flex-direction: column;
    height: 70%;
    font-size: 12px;
  }
}



</style>
