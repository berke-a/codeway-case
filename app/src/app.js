const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('../codeway-task-33a0d-firebase-adminsdk-88mu9-d9ad6f78c3.json');

const app = express();
const port = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://codeway-task-33a0d.firebaseio.com'
});

const db = admin.firestore();

app.get('/', (req, res) => {
    res.send('Hello from Node.js with Firebase!');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
