import admin from './firebaseConfig.js';

export default async function checkAuth(req: any, res: any, next: any) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('Authorization header is missing');
        }

        const token = authHeader.split('Bearer ')[1];
        if (!token) {
            throw new Error('Token is missing');
        }

        const decodedToken = await admin.auth().verifyIdToken(token);
        if (!decodedToken) {
            throw new Error('Token is invalid');
        }

        req.user = decodedToken;
        return next();
    } catch (err: any) {
        if (err.code === 'auth/id-token-expired') {
            return res.status(401).send('Token has expired. Please reauthenticate.');
        } else {
            // Handle other errors here
            return res.status(401).send(`Authentication error: ${err.message}`);
        }
    }
};
