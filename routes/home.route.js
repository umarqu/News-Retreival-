'use strict'


const express = require('express');
const router  = express.Router();
const webRequest = require('../functionality/webRequest');
const hbs = require('hbs');


router.get('/',(req,res)=>{
	res.render('home.hbs',{
		result:'results'
	});
});

router.get('/index',(req,res)=>{
	res.render('index.hbs');
});




router.get('/about',(req,res)=>{
	res.render('about.hbs');
});


router.post('/searchNews',(req,respond)=>{
	var searchResult = req.body.name_field;


	var newsSelected = req.body.news;
	var newsSearchOption = req.body.news;


	webRequest.getRequest(newsSelected,newsSearchOption,searchResult,
						  undefined,
						  undefined, function(err, body) {
  	if (err) {
  		console.log('Unable to connect ft servers.');
  	} else {
  		var obj = webRequest.getURL(JSON.parse(body));

  		console.log(obj)
		respond.render('searchNews.hbs',{
		result:obj
		})
	}
	});

});



module.exports = router;