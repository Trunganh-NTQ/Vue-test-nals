import axios from 'axios';

export const API = {
  setHeader() {
    // const tokenDom = document.querySelector('meta[name=csrf-token]');
    // if (tokenDom) {
      // const csrfToken = tokenDom;
      // axios.defaults.headers.common['X-CSRF-Token'] = csrfToken;
      // axios.defaults.headers.common.Accept = 'application/json';
      axios.defaults.headers.common['Content-Type'] = 'application/json';
      axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
      axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
      axios.defaults.headers.common['Access-Control-Allow-Credentials'] = true;
      axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
    // }
  },

  get(resource, data) {
    this.setHeader();
    return axios.get(process.env.VUE_APP_BASE_URL + resource, {
      params: data
    });
  },

  post(resource, data) {
    this.setHeader();
    return axios.post(process.env.VUE_APP_BASE_URL + resource, data);
  },

  put(resource, data) {
    this.setHeader();
    return axios.put(process.env.VUE_APP_BASE_URL + resource, data);
  },

  delete(resource) {
    this.setHeader();
    return axios.delete(process.env.VUE_APP_BASE_URL + resource);
  }

};