import { API } from '../api';

export const state = {

};

export const getters = {

};

export const mutations = {
};

export const actions = {
  async register(_, query) {
    try {
      return await API.post('/api/v2/users', query);
    } catch (error) {
      return error.response.data;
    }
  },
};
