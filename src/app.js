const express = require('express');
const app = express();
const mongoose = require("mongoose")
const contactRoute = require('../api/route/contact');
const userRoute = require('../api/route/user');
const bodyParser = require('body-parser');

const port = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://sahilkhan:dwv3duiYnLMRH5n6@cluster0.3wbgoiy.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error', err=>{
    console.log('connection failed');

})

mongoose.connection.on('connected', connected=>{
    console.log('connected with the data base');

});


app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/contact', contactRoute);
app.use('/user', userRoute);


app.use('/', (req, res, next)=>{
    res.status(200).json({
        msg:'bad request'
    })
})


app.listen(port, ()=>{
    console.log("app is running ", port)
})