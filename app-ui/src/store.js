import {createStore} from 'vuex';
import axios from 'axios';

export default createStore({
  state: {
    token: null,
  },
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const response = await axios.post('http://localhost:3000/login', { email, password });
        commit('SET_TOKEN', response.data.token);
        return { success: true };
      } catch (error) {
        return { success: false, message: error.response.data.message };
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.token
  }
});
