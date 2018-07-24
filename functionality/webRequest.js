const request = require('request');
const ft_server = require('../server');


const apiKey = '5ce0dd9d7b6d49f6a05cffba4222f420';


module.exports.getRequest = (newsSelected,searchOption,searchResult,this_header,header_body,callback) =>{
	var get_body; 

	if (searchOption != "top-headlines"){
		searchOption = 'everything';
	} 

	var this_url = `https://newsapi.org/v2/${searchOption}?`+
			  	   `sources=${newsSelected}&`+
			  	   `q=${searchResult}&`+
			  	   //`sortBy=popularity&`+
			  	   `apiKey=${apiKey}`

	request({
			url:this_url,
			headers:this_header,
			body:header_body
	}
	,(error, response, body)=>{
		if(error && response.statusCode !=200){
			return callback(error);
		}
		callback(null,body)
	});
}


module.exports.getURL = (jsonObject)=>{

	var obj = jsonObject.articles;

	var JsonObj = {}
	var jsonText = [];
	for (var i=0; i < Object.keys(obj).length; i++) { 
    	const this_author =  obj[i].author;
    	const this_title = obj[i].title;
    	const this_description = obj[i].description;
    	const this_url = obj[i].url;
    	const this_pub = obj[i].publishedAt;

    	jsonText.push({
    		title:this_title,
    		author:this_author,
    		url:this_url,
    		description:this_description,
    		publishedAt:this_pub
    	});
	}

	JsonObj = JSON.stringify(jsonText);


	//console.log(JSON.stringify(JsonObj,null,4))
	return jsonText;
}
