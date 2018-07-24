'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const request = require('request');


const routing =require('./routes/home.route');
const webreq = require('./functionality/webRequest')

hbs.registerPartials(__dirname + '/views/partials')

hbs.registerHelper('toJSON', function(obj) {
    return JSON.stringify(obj, null, 3);
});


var app = express();
app.set('view engine','hbs'); // thats all thats needed for handlbars. stick in views
app.use(express.static(__dirname+'/public')); // sending static pages


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



//middleware
app.use((req,res,next)=>{
	var now = new Date().toString();
	next();
})


app.use(routing); // taken from routing


app.listen(3000,()=>{
	console.log('Server is running')
});

