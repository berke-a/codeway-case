import admin from './firebaseConfig';

export default async function checkAuth(req: any, res: any, next: any) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res.status(401).send('Missing authorization header');
    }

    const token = authHeader.split('Bearer ')[1];
    if (!token) {
        return res.status(401).send('Malformed authorization header');
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    if (!decodedToken) {
        return res.status(401).send('Invalid token');
    }

    req.user = decodedToken;
    return next();
};
