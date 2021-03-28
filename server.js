const express = require('express');
const app = express();
const mongoose = require('mongoose');
//importing keys
const db = require('./config/keys').mongoURI;
//connect to mongoDB
mongoose
.connect(db,{useNewUrlParser: true, useUnifiedTopology: true})
.then(()=> console.log('DB succesfully connected')).
catch(err => console.log(err))
app.get('/', (req, res) => res.send('Hello There!'));
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`application will be running at port ${PORT}`));