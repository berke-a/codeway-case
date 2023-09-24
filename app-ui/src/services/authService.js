import { auth } from '../firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';

export default class AuthService {
    constructor(store) {
        this.store = store;
        this.tokenRefreshInterval = null;
    }
    async signin(email, password) {
        try {
            await signInWithEmailAndPassword(auth, email, password)
            const token = await auth.currentUser.getIdToken();
            return { success: true, token: token, user: auth.currentUser }
        } catch (error) {
            console.error(error);
            return { success: false, message: error.message };
        }
    }

    async signout() {
        await auth.signOut();
    }
}