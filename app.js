require('dotenv').config();
const express = require('express');
const expressLayout = require('express-ejs-layouts');
const connectDB = require('./server/config/db');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo');    
const { isActiveRoute } = require('./server/helpers/routeHelpers');

const app = express();
const PORT = 3000 || process.env.PORT;

app.use(express.static('public'));

//connect DB
connectDB();
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl:process.env.MONGODB_URI
    }), 
}));
//Templating Engine
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine' , 'ejs');

app.locals.isActiveRoute = isActiveRoute;

app.use('/', require('./server/route/main'));
app.use('/', require('./server/route/admin'));

app.listen(PORT, ()=> {
    console.log(`listening to port ${PORT}`);
})