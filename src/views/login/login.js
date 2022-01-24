import { mapActions } from 'vuex'

export default {
  ...mapActions(['setUser']),

  //Faz o Login do Usuário
  loginUser() { 
    this.isLoading = true 

    if (!this.validate()) {
        this.isLoading = false
        this.cleanModel()
        this.showToast('error', 'Informe Usuário e Senha Corretos!')
        return 
    }

    //Seta um Time out só pra dar um delay pra na hora de logar rsrs
    setTimeout(() => {
        this.setUser(this.model)
        this.isLoading = false
        this.$router.push('/home')
    }, 2000)
  },

  //Verifica se a model para fazer login está com os valores corretos
  validate() {
    if (this.model.user === null || this.model.password === null)
      return false

    return (this.model.user.indexOf('@') !== -1 && this.model.password !== null) ? true : false 
  },

  cleanModel() {
    this.model.user = null
    this.model.password = null
  }
}