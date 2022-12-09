require('dotenv').config();
const express = require('express');
const dotenv = require('dotenv');
const app = express();
const routes = require('./routes/routes');
const mongoose = require('mongoose');
const cors = require('cors');

const dbstring = process.env.DATABASE_URL;
mongoose.connect(dbstring);

const db = mongoose.connection;

db.on('error',(error)=>{
    console.log(error);
});
db.once('connected',()=>{
    console.log("Database Connected");
});
dotenv.config({path:'.env'});
const PORT = process.env.PORT || 8050;
app.use(express.json());

app.use(cors());
app.use('/server',routes);

app.listen(PORT,()=>{
    console.log(`Server hosted on http://localhost:${PORT}/server`);
})