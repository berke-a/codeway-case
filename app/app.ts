import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

import configurationRouter from './src/routes/configuration.routes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))

app.use('/configurations', configurationRouter);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
