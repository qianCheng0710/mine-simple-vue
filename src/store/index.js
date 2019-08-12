import Vue from 'vue';
import Vuex from 'vuex';
// modules
import user from './modules/user';

// getters
import getters from './getters';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user
  },
  getters
});
