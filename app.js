const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = express();
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');



dotenv.config();



//database

mongoose.connect(process.env.MONGO_URI, { useUnifiedTopology: true })
.then(() => {
    console.log("Connected to database");
});

//routes//
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');

//middleware//

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', postRoutes);
app.use('/api', userRoutes);


const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
        console.log("Server listening on port 8000");
    })