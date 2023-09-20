import { createStore } from 'vuex';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';
import createPersistedState from 'vuex-persistedstate'

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
    async login({ commit }, { email, password }) {
      try {
        await signInWithEmailAndPassword(auth, email, password)
        const token = await auth.currentUser.getIdToken();
        commit('SET_USER', auth.currentUser);
        commit('SET_TOKEN', token);
        return { success: true }
      } catch (error) {
        console.error(error);
        return { success: false, message: error.message };
      }
    },
    async logout({ commit }) {
      await auth.signOut();
      commit('SET_TOKEN', null);
      commit('SET_USER', null);
    }
  },
  getters: {
    token: state => state.token
  }
});
