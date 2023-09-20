const admin = require('firebase-admin');
const serviceAccount = require('../codeway-task-33a0d-firebase-adminsdk-88mu9-d9ad6f78c3.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://codeway-task-33a0d.firebaseio.com'
});

export default admin;
