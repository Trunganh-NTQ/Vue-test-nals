import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import axios from 'axios';
import VeeValidate, { Validator, ValidationObserver, ValidationProvider } from 'vee-validate';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

// import css
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import '../src/assets/css/main.css';
import '../src/assets/css/main.scss';
import '../src/assets/css/main.sass';

axios.defaults.withCredentials = true
axios.defaults.baseURL = process.env.VUE_APP_API_URL

Vue.config.productionTip = false;

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

// comfig extend
window._ = require('lodash');
const toastr = require('toastr');
window.toastr = toastr;

// START: vee-validation configuration
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);
Vue.use(VeeValidate);
Validator.extend('email', value => {
  var pattern = new RegExp('^\\w+([-+.\']\\w+)*@\\w+([-.]\\w+)*\\.\\w+([-.]\\w+)*$');
  return !!pattern.test(value);
});
// END: vee-validation configuration

// Automatically import components
const files = require.context('../src', true, /\.vue$/i);
files.keys().map((key) => {
  const component = key
    .split('/')
    .pop()
    .split('.')[0];
  Vue.component(component, files(key).default);
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');
