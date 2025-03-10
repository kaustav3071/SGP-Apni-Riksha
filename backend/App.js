const dotenv = require('dotenv');
dotenv.config();
const express = require ('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const saarthiRoutes = require('./routes/saarthi.routes');

app.use(cookieParser());
connectDB();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.use('/users', userRoutes);

app.use('/saarthi', saarthiRoutes);


module.exports = app;