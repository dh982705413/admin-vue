import Vue from 'vue'
import Vuex from 'vuex'
import breadcrum from '@/store/breadcrum'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    breadcrum
  }
})
