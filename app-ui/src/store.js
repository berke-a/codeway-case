import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import AuthService from './authService';

export default createStore({
  plugins: [createPersistedState()],
  state: {
    token: null,
    user: null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
    }
  },
  actions: {
    async login({ commit }, payload) {
      try {
        const authService = new AuthService(this);
        const response = await authService.login(payload.email, payload.password);

        if (!response.success) {
          throw new Error(response.message);
        }

        commit('SET_USER', response.user);
        commit('SET_TOKEN', response.token);
        return { success: true }
      } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
      }
    },
    async logout({ commit }) {
      const authService = new AuthService(this);
      await authService.logout();
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
    }
  },
  getters: {
    token: state => state.token,
    user: state => state.user
  }
});
