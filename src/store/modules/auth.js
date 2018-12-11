/* eslint-disable no-unused */
import api from '../../api/authorize';
import qs from 'qs';

const state = {
  token: window.localStorage.getItem('access-token') || null,
};

const getters = {
  isLoggedIn: state => Boolean(state.token)
};

const actions = {  
  login: () => {
    api.login();
  },
  finalizeLogin({commit}, hash) {
   const accessToken = qs.parse(hash.replace('#', '')).access_token; 
   commit('setToken', accessToken);
   window.localStorage.setItem('access-token', accessToken);
  },
  logout: ({commit}) => {
    commit('setToken', null);
    window.localStorage.removeItem('access-token');
  },
};

const mutations = {
  setToken: (state, token) => {
    state.token = token;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};