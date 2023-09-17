const express = require('express');
const admin = require('firebase-admin');
const serviceAccount = require('../codeway-task-33a0d-firebase-adminsdk-88mu9-d9ad6f78c3.json');

import { Configuration } from './models/configuration.model';

const app = express();
const port = process.env.PORT || 3000;

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://codeway-task-33a0d.firebaseio.com'
});

const db = admin.firestore();




app.get('/', async (req: any, res: any) => {
  try {
    const configurations = await getConfigurations();
    res.send(configurations);
  } catch (error) {
    res.status(500).send("Error fetching configurations");
  }
});

async function getConfigurations() {
  const configurationArray: Configuration[] = [];
  const snapshot = await db.collection('Configurations').get();
  snapshot.forEach((doc: any) => {
    const configuration = new Configuration(
      camelToSnake(doc.id),
      doc.data().value,
      doc.data().type,
      doc.data().description,
      doc.data().createDate
    );
    configurationArray.push(configuration);
  });
  return configurationArray;
}

function camelToSnake(str: string) {
  return str.replace(/[A-Z]/g, (c: string) => '_' + c.toLowerCase());
}


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
