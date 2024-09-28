const express = require('express');
const app = express();
const cors=require('cors');
const dotenv = require('dotenv');
const RegNo = require('./models/registrationNumber');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const mongoose=require("mongoose");

dotenv.config(); 


connectDB(); 

app.use(express.json());

app.set('view engine', 'ejs');
app.use(cors({
    origin: 'http://localhost:5173', 
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true
}));

app.use('/api', userRoutes);


app.get('/', (req, res) => {
    res.render('index', { name: 'World' });
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

