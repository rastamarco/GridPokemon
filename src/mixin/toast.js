import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import iziToast from 'izitoast'

Vue.mixin({
  methods: {
    ...mapActions(['setPaginate', 'setTotalRows']),
    
    showToast(type, message, title = '') {
      iziToast[type]({ title, message })
    }
  },

  computed: {
    ...mapGetters(['getPagination'])
  }
})