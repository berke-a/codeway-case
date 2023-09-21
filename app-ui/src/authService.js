import { auth } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default class AuthService {
    constructor(store) {
        this.store = store;
        this.tokenRefreshInterval = null;
    }
    async login(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            const token = await auth.currentUser.getIdToken();
            this.startTokenRefresh();
            return { success: true, token: token, user: auth.currentUser }
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }

    async logout() {
        await auth.signOut();
        this.stopTokenRefresh();
    }

    startTokenRefresh() {
        this.tokenRefreshInterval = setInterval(async () => {
            const user = auth.currentUser;
            if (user) {
                const newToken = await user.getIdToken(true);
                this.store.commit('SET_TOKEN', newToken);
            }
        }, 50 * 60 * 1000);
    }

    stopTokenRefresh() {
        clearInterval(this.tokenRefreshInterval);
        this.tokenRefreshInterval = null;
    }
}