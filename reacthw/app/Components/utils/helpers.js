
var axios = require('axios');

// New York Times API
var nytAPI = "ee02f5b0d28048f7aae742325d5ff8de";

// Helper Functions
var helpers = {

	runQuery: function(topic, startYear, endYear){

		
		var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" + nytAPI + "&q=" + topic + "&begin_date=" + startYear + "0101&end_date=" + endYear + "0101";

		return axios.get(queryURL)
			.then(function(response){

				var newResults = [];
				var fullResults = response.data.response.docs;
				var counter = 0;

				
				for(var i = 0; i < fullResults.length; i++){

					if(counter > 4) {
						return newResults;
					}

					if(fullResults[counter].headline.main && fullResults[counter].pub_date && fullResults[counter].web_url) {
						newResults.push(fullResults[counter]);
						counter++;
					}
				}

				return newResults;
		})

	},


	
	postArticle: function(title, date, url){

		axios.post('/api/saved', {title: title, date: date, url: url})
		.then(function(results){

			console.log("Posted to MongoDB");
			return(results);
		})
	}

}



module.exports = helpers;