require ('dotenv').config();

const express = require('express');
// const mongoose = require('mongoose');
const cors = require("cors")
const userRoutes = require('./routes/userRoutes');
const customerRoutes = require('./routes/customerRoutes');
// const participationDetailsRoutes = require('./routes/participationDetailsRoutes');
// const auth = require("./middleware/auth");

// const {config} = require('./auth.config');
// const { requiresAuth } = require('express-openid-connect');
const ConnectDB = require('./connectDB');

//express app
const app = express();

app.use(cors())

//middleware
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
});

//routes
app.use('/api/users', userRoutes);
app.use('/api/customers', customerRoutes);
// app.use('/api/tickets', participationDetailsRoutes);


// const { auth } = require('express-openid-connect');


// auth router attaches /login, /logout, and /callback routes to the baseURL
// app.use(auth(config));

// req.isAuthenticated is provided from the auth router
// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
// });

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

//connect to db
// mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
ConnectDB();

//listen for requests
app.listen(process.env.PORT, () => {
  console.log('listening for requests on port', process.env.PORT);
});

app.get('/', (req, res) => {
  res.send("<h1>Hello world</h1>");
});