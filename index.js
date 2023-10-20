//Variáveis de Ambiente
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Auth = require('./routes/Auth');
const UserRoutes = require('./routes/User');
const PostRoutes = require('./routes/Posts');

//setting JSON configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//setting public files
app.use(express.static(__dirname + '/public'));
//Configuring Session
app.use(require('express-session')({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.set("view cache", false);
//setting routes
//configure routes
app.use('/Posts', PostRoutes);
app.use('/Auth', Auth);
app.use('/Users', UserRoutes);
//DB Connection
mongoose.connect(process.env.STRING_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }).then((result)=>{
  console.log('DB Connected');
  app.listen(3000, () => {
    console.log('App listening');
  });
}).catch((error)=>{
  console.log(error);
});

module.exports = app;





