<template>
  <div >
    <container>
      <template v-slot:main>
          <v-col cols="12" sm="12" md="12" class="login-content">
            <div class="content">
              <v-card class="card-login" outlined tile>
                <v-card-text>
                  <p class="text--primary">
                    Login 
                  </p>    
                </v-card-text>
                <v-text-field
                  v-model="model.user" 
                  label="Usuário" 
                  placeholder="souza.marco04@gmail.com" 
                  outlined
                  dense>
                  </v-text-field>
                <v-text-field 
                  v-model="model.password"
                  label="Senha" 
                  :type="'password'" 
                  placeholder="******" 
                  counter 
                  outlined
                  dense>
                </v-text-field>
                <v-card-actions>
                    <v-btn text color="primary" @click="loginUser()">
                      Entrar
                    </v-btn>
                  </v-card-actions>
              </v-card>
              <v-progress-circular indeterminate :size="50" v-if="isLoading"> </v-progress-circular>
            </div>
          </v-col>
      </template>
  </container>
  </div>
</template>

<script>
import container from '../../components/container'
import login from './login'

export default {
  components: {
    container
  },

  data() {
    return {
      model: {
        user: null,
        password: null
      },
      isLoading: false
    }
  },

  methods: login

}
</script>

<style scoped>
.login-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0;
}

.content{
  width: 75vh;
  max-height: 60vh;
  padding:0;
}

.content .card-login{
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-left: 5%;
  padding-right: 5%;
}

</style>
