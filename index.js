//Variáveis de Ambiente
require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Auth = require('./routes/Auth');
const UserRoutes = require('./routes/User');
const NewsRoutes = require('./routes/News');

//setting JSON configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//configure routes
app.use('/News', NewsRoutes);
app.use('/Auth', Auth);
app.use('/Users', UserRoutes);
//DB Connection
mongoose.connect('mongodb://localhost:27017/NewsApp', { useNewUrlParser: true, useUnifiedTopology: true }).then((result)=>{
  console.log('DB Connected');

  app.listen(3000, () => {
    console.log('App listening on port 3000');
  });
}).catch((error)=>{
  console.log(error);
});




