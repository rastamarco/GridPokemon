<template>
  <v-app >
    <v-app-bar app color="primary" dark>
        <h2 v-if="!backHome" >Pokémon</h2>
        <h2 v-if="backHome" @click="StateRouter(false)" class="btn-home"> 
          <v-icon>mdi-arrow-left-bold-circle-outline</v-icon>
          Home 
        </h2>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn icon absolute right v-bind="attrs" v-on="on" style="margin-right: 2%;"><v-icon>mdi-panorama-horizontal</v-icon></v-btn> 
          </template>
          <span>English</span>
        </v-tooltip>
        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
           <v-btn icon absolute right  v-bind="attrs" v-on="on" ><v-icon>mdi-subtitles</v-icon></v-btn> 
          </template>
          <span>Português</span>
        </v-tooltip>
    </v-app-bar>
    <v-main class="app">
       <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, Getter } from 'vuex-class';

@Component
export default class App extends Vue{
  @Action SetBackHome

  @Getter backHome

  public async StateRouter(state: boolean): Promise<void>{
    await this.SetBackHome({backHome: state})
    this.$router.push('/');
  }

}
</script>
<style scoped>
.btn-home{
  cursor: pointer;
}


</style>
