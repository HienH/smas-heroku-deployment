const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const cors = require('cors');
const app = express();

// use env config
if (process.env.NODE_ENV !== 'production') require('dotenv').config()

// Connect to mongoose
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true });
mongoose.connection.on('connected', () => {
    console.log('Connected to MONGO DB: ' + process.env.DATABASE)
});
mongoose.connection.on('error', (error) => {
    console.log('MONGO DB connection error: ' + error)
});

app.use(cors());
app.use(bodyParser.json());

//Set static folder -- !IMPORTANT
app.use(express.static(path.join(__dirname, 'public')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'))
})

// Routers
const userRouter = require('./routes/user.router');


app.use('/user', userRouter);
// port
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is running on port ${port}`)
}); 