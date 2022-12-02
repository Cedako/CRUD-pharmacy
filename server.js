const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');
const MONGODB_URI = 'mongodb+srv://Admin:Admin1@crud.ic0v6ve.mongodb.net/?retryWrites=true&w=majority';
const employeeRouter = require('./routes/employeeRoutes');
const productRouter = require('./routes/productRoutes');
const ticketRouter = require('./routes/ticketRoute');
require('./passport');
const app = express();

//EJS
app.set('view engine', 'ejs');

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());


//router
app.use("/", employeeRouter);
app.use("/products", productRouter);
app.use("/buy", ticketRouter);


//server
app.listen(3000, () => console.log('Listening on PORT 3000'));

//Connect and configure database
mongoose.connect(MONGODB_URI || "mongodb://localhost/CRUD",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (err) => {
        if (err) {
            console.log(err)
        } else {
            console.log("Connected to MongoDB")
        }
    }
);