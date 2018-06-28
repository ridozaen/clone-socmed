const express = require('express');
const app = express();
require('dotenv').config();
const routes = require('./routes');
const cors = require('cors');
const port = process.env.PORT || 3000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.use('/twitt', routes);

app.listen(port, ()=>{
    console.log('Server up on 3000')
})