import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import AuthService from './services/authService';

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
    async signin({ commit }, payload) {
      try {
        const authService = new AuthService(this);
        const response = await authService.signin(payload.email, payload.password);

        if (!response.success) {
          console.error(response.message);
          return { success: false, message: 'Invalid email or password' }
        }

        commit('SET_USER', response.user);
        commit('SET_TOKEN', response.token);

        return { success: true }
      } catch (error) {
        console.error(error);
        return { success: false, message: 'Invalid email or password' }
      }
    },
    async signout({ commit }) {
      const authService = new AuthService(this);
      await authService.signout();
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
    }
  },
  getters: {
    token: state => state.token,
    user: state => state.user
  }
});
