export const state = {
  loading: false,
  success: null,
  submitted: false,
  search: false,
};

export const mutations = {
  SET_LOADING(state, loading) {
    state.loading = loading;
  },

  SET_SUCCESS(state, success) {
    state.success = success;
  },

  SET_SUBMITTED(state, submitted) {
    state.submitted = submitted;
  },

  SET_SEARCH(state, loading) {
    state.search = loading;
  },
};

export const getters = {
  getLoading(state) {
    return state.loading;
  },

  getSearch(state) {
    return state.search;
  }
};

export const actions = {
  setLoading(context, loading) {
    context.commit('SET_LOADING', loading);
  },

  setSuccess(context, success) {
    context.commit('SET_SUCCESS', success);
  },

  setSubmitted(context, submitted) {
    context.commit('SET_SUBMITTED', submitted);
  },

  setSearch(context, search) {
    context.commit('SET_SEARCH', search);
  },
};
