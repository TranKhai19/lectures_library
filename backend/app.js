const express = require('express');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const lecturesRoute = require('./routes/lectures');
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(fileUpload());
app.use('/api/lectures', lecturesRoute);

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, '../')));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});