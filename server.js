const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
//initialize body parser middlewares
app.use(bodyParser.urlencoded({ 
    extended: true 
}));
app.use(bodyParser.json());
//importing keys
const db = require('./config/keys').mongoURI;
//importing routes
const user = require('./routes/api/user');
const posts = require('./routes/api/posts');
const profile = require('./routes/api/profile');
//connect to mongoDB
mongoose
.connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB succesfully connected')).
catch(err => console.log(err))
//initialising passport middlewares
require('./config/passport')(passport);
//app.use(passport.initialise);
//routes
app.get('/', (req, res) => res.send('Hello There!'));
app.use('/api/user',user);
app.use('/api/posts',posts);
app.use('/api/profile',profile);
//connecting to server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`application will be running at port ${PORT}`));