import { mapActions } from 'vuex'

export default {
    ...mapActions(['setUser']),

    loginUser() { 
      this.isLoading = true  
      if (!this.validate()) {
          this.isLoading = false
          this.showToast('error', 'Usuário ou senha Incorreta!')
          return 
      }

      this.setUser(JSON.stringify(this.model))
      
      setTimeout(() => {
          this.isLoading = false
          this.$router.push('/home')
      }, 2000)
  },

  validate() {
      return (this.model.user !== null && this.model.password !== null) ? true : false 
  }
}