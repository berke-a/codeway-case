const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

import routes from './src/routes';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
  
app.use('/', routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
