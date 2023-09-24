import admin, { ServiceAccount } from 'firebase-admin';
import serviceAccount from '../codeway-task-33a0d-firebase-adminsdk-88mu9-d9ad6f78c3.json' assert { type: 'json' };


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: process.env.DB_URL
});

export default admin;
