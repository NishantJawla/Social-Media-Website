const express = require('express');
const app = express();
const mongoose = require('mongoose');
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
//routes
app.get('/', (req, res) => res.send('Hello There!'));
app.use('/api/user',user);
app.use('/api/posts',posts);
app.use('/api/profile',profile);
//connecting to server
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`application will be running at port ${PORT}`));