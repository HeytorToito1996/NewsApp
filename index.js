const express = require('express');
const app = express();
const Auth = require('./routes/Auth');
const UserRoutes = require('./routes/User');
const NewsRoutes = require('./routes/News');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/News', NewsRoutes);
app.use('/Auth', Auth);
app.use('/Users', UserRoutes);


app.listen(3000, () => {
  console.log('App listening on port 3000');
});

