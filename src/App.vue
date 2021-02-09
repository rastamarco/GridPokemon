<template>
  <v-app  >
    <v-app-bar app color="primary" dark>
        <h2>Pokémon</h2>
    </v-app-bar>
    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import {
  Component,
  Vue
} from 'vue-property-decorator';
import Home from './views/Home.vue';

@Component({
  components: {
    Home,
  },
})
export default class App extends Vue{
  
}
</script>
