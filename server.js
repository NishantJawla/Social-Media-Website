const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello There!'));
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=> console.log(`application will be running at port ${PORT}`));