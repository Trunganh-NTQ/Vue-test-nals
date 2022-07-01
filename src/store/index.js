import Vuex from 'vuex';
import Vue from 'vue';
import createPersistedState from "vuex-persistedstate";
import modules from './modules';

// Load Vuex
Vue.use(Vuex);
// Create store
export default new Vuex.Store({
  modules,
  plugins: [createPersistedState(
    {
      storage: window.sessionStorage,
      paths: ['global', 'system']
    }
  )],
  strict: process.env.NODE_ENV !== 'production'
});