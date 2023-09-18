const express = require('express');
const cors = require('cors');
import routes from './src/routes';

const app = express();
app.use(cors());
const port = process.env.PORT || 3000;

app.use('/', routes)

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
