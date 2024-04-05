require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('public'));

//connect DB
connectDB();
app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine' , 'ejs');

app.use('/', require('./server/route/main'))

app.listen(PORT, ()=> {
    console.log(`listening to port ${PORT}`);
})