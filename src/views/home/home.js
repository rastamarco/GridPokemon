import { mapActions } from 'vuex'
import axios from 'axios';

export default {
    async getContent() {
        // debugger
        const routeApi = `${process.env.API}`
        
        const response = await axios({
            method: 'get',
            url: routeApi
        })
        
        let pokemons = response.data.results
        pokemons.forEach(item => {
            item._action = "action"
        })

        this.items = pokemons
        console.log(response)
    },
}