const dotenv = require('dotenv');
dotenv.config();
const express = require ('express');
const cors = require('cors');
const app = express();
const connectDB = require('./db/db');
const userRoutes = require('./routes/user.routes');
const cookieParser = require('cookie-parser');
const saarthiRoutes = require('./routes/saarthi.routes');
const mapsRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');


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
console.log("Saarthi routes registered at /saarthi");

app.use('/maps', mapsRoutes);

app.use('/rides', rideRoutes);

app.use('/ride', rideRoutes);

module.exports = app;