const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require("swagger-ui-express");
const bodyParser = require('body-parser');
const specs = require("./src/helpers/swaggerOptions");
const multer = require('multer');
const cors = require('cors');
const app = express();
require('dotenv').config();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/public', express.static('public'));

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

app.use(multer({ storage: storage }).single('logo'));
// app.use(multer({ storage: storage }).array('personal_images', 5));
// app.use(multer({ storage: storage }).array('studio_images', 5));


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB Connected...'))
    .catch(err => console.log(err));

// Routes
app.use("/lists", require('./src/routes/lists'));
app.use("/schools", require('./src/routes/schools'));
app.use("/user", require('./src/routes/user'));
app.use(require('./src/routes/auth'));


app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs, { explorer: true }));
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server is up on port ${port}`);
}); 