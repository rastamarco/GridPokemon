<template>
  <div id="app">
    <header class="header-app">

      <div class="title">
        <span>Pokémons</span>
      </div>

      <div class="logout" v-show="getUser.user">
        <h5>Bem-Vindo: {{ getUser.user }} </h5>&nbsp;&nbsp;
        <v-icon
          :id="'btnIdlout'"
          @click="logout()"
          class="icon-action-content-edit"
          size="1.7em"
          title="Sair"
          color="#FFF"
          >
          mdi-logout
        </v-icon>
      </div>

    </header>
    <main >
      <router-view></router-view>
    </main>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'app',
  data() {
    return {
    }
  },

  methods: {
    ...mapActions(['setUser']),

    logout() {
      localStorage.removeItem('user')
      this.$router.push('/')
      window.location.reload()
    }
  },

  computed: {
      ...mapGetters(['getUser'])  
  },

  async beforeMount() {
    let user = JSON.parse(localStorage.getItem('user'))

    if (user)
      await this.setUser(user)
  }
}
</script>

<style>
body {
  margin: 0;
}

html, body{
  overflow-y: hidden;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  /* -webkit-font-smoothing: antialiased; */
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.header-app{
  display:flex;
  flex-direction: row;
}

.title{
  width: 50%;
}

.logout{
  width: 50%;
  display:flex;
  justify-content: flex-end;
  align-items: center;
}

main {
  text-align: center;
  margin-top: 40px;
}

header {
  margin: 0;
  height: 56px;
  padding: 0 16px 0 24px;
  background-color: #35495E;
  color: #ffffff;
}

header span {
  display: block;
  position: relative;
  font-size: 20px;
  line-height: 1;
  letter-spacing: .02em;
  font-weight: 400;
  box-sizing: border-box;
  padding-top: 16px;
}
</style>

<style src="izitoast/dist/css/iziToast.min.css"></style>
