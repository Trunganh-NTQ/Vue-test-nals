import { API } from '../api';

export const state = {
  blogs: {},
  totalRows: 0,
  perPage: 20,
  queryParams: {
    page: 1,
    search: '',
  }
};

export const getters = {
  getQueryParams(state) {
    return state.queryParams;
  }
};

export const mutations = {
  setBlogs(state, blogs) {
    state.blogs = blogs;
  },

  setPagination(state, pagination) {
    state.totalRows = pagination.count;
    state.queryParams.page = pagination.page;
  },

  setQueryParam(state, param) {
    Object.assign(state.queryParams, param);
  },
};

export const actions = {
  async getBlogs(_, query) {
    try {
      const response = await API.get('/api/v2/blogs/', query);
      _.commit('setBlogs', response.data.data.items);
      _.commit('setPagination', response.data.pagination);
      return response;
    } catch (error) {
      return error.response.data;
    }
  },

  async getBlog(_, query) {
    try {
      return await API.get(`/api/v2/blogs/${query.id}`, query);
    } catch (error) {
      return error.response.data;
    }
  },

  async newBlog(_, query) {
    try {
      return await API.post(`/api/v2/blogs/`, query);
    } catch (error) {
      return error.response.data;
    }
  },


  async updateBlog(_, query) {
    try {
      return await API.put(`/api/v2/blogs/${query.id}`, query.formData);
    } catch (error) {
      return error.response.data;
    }
  },
};
