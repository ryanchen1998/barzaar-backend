const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv/config');

app.use(cors());
app.options('*', cors());

// Middleware
app.use(express.json());
app.use(morgan('tiny'));

// Routes
const productsRoutes = require('./routes/products');
const usersRoutes = require('./routes/users');

const api = process.env.API_URL;

app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);

// DB connection
mongoose.connect(process.env.CONNECTION_STRING, { 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(()=> {
    console.log('Database connection is ready...');
})
.catch((err)=>{
    console.log(err);
})

app.listen(3000, () => {
    console.log(api);
    console.log('server is running http://localhost:3000');
});

