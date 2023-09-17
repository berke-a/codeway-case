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
    res.send({
      'status': 'success',
      'data': configurations,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      'status': 'error',
      'message': 'Error while fetching configurations'
    });
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
      toHumanReadableFormat(doc.data().createDate.toDate())
    );
    configurationArray.push(configuration);
  });
  return configurationArray;
}

function camelToSnake(str: string) {
  return str.replace(/[A-Z]/g, (c: string) => '_' + c.toLowerCase());
}

function toHumanReadableFormat(date: Date): string {
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // +1 because months are 0-based
  const year = date.getFullYear();
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
