const passport = require('passport');
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');
const config = require('config');
const express = require('express');

require('./services/passport');

const home = require('./routes/home');
const auth = require('./routes/auth');
const users = require('./routes/users');

const app = express();

mongoose.connect(config.DB.mongoURI, { useNewUrlParser: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error(error.message));
// NPM middleware
app.use(
  cookieSession({ // req.session == user.id
    name: 'MERN cookie',
    maxAge: (30 * 24 * 60 * 60 * 1000),
    keys: [config.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session()); // req.user == <USER INSTANCE>
// Routes
app.use(home);
app.use('/auth/google', auth);
app.use('/users', users);


const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
