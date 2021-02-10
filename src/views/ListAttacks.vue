<template>
 <v-row>
   <v-col cols="12" sm="12" md="12" class="app-pokemon">
       <v-card>
        <v-card-title class="headline">
          Detalhes do Ataque
        </v-card-title>
        <v-card-text>
            <span><b>Custo de Mana:</b> {{pokemonAttack.convertedEnergyCost}}</span><br>
            <span><b>Dano:</b> {{pokemonAttack.damage}}</span><br>
            <span><b>Nome:</b> {{pokemonAttack.name}}</span><br>
            <span><b>Descrição:</b> {{pokemonAttack.text}}</span>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="CloseAttackDetails()" >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
   </v-col>
 </v-row>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class ListAttacks extends Vue {
  @Prop() pokemonAttack!:any

  public CloseAttackDetails(): void{
      this.$emit('CloseAtkDetails');
  }
}
</script>
<style scoped>
.app-pokemon{
  display:flex;
  flex-direction:row;
  height: 50vh;
  background: white;
}
</style>
