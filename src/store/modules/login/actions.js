export default {
    setUser(context, user) {
        context.commit('SET_USER', user)
        localStorage.setItem('user', JSON.stringify(user))
    }
}