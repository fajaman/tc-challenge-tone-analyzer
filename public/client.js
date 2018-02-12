'use strict';
// notes:
//
// * This file is bundled by webpack-dev-middleware into bundle.js
//
// * The require('watson-developer-cloud/language_translator/v2') could also be written as require('watson-developer-cloud').LanguageTranslatorV2,
//   but that version results in a much larger bundle size.
//
// * Tokens expire after 1 hour. This demo simply fetches a new one for each translation rather than keeping a fresh one.
//
// * fetch() is a modern version of XMLHttpRequest. A pollyfill is available for older browsers: https://github.com/github/fetch

var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
var fs = require('fs');


var input = document.getElementById('input');
var output = document.getElementById('output');
window.spec = '';
window.results = '';
window.specArray = [];
window.resultsArray = [];
window.challengeIdArray = [];
window.sorted = [];
window.sortedArray = [];
window.i = 0;
window.y = 0;
window.challengeLength;

/**
 * @return {Promise<String>} returns a promise that resolves to a string token
 */
 
 //fetch active challenges endpoint and save challenge id
 
 function getChallenges(){
 	    fetch('https://api.topcoder.com/v3/challenges?filter=status=ACTIVE').then(function(res){	
	   return res.json().then(function(active){  
	   
	   window.challengeLength = active.result.content.length;
	   console.log(active.result.content.length);
	   		 console.log(active.result.content);
for (var i = 0;i<window.challengeLength;i++){	
			var challengeId = active.result.content[i].id; 
	   window.challengeIdArray.push(challengeId);
		}
			
 	});
	});
	
		 
	   }
	   
	   //fetch challenge details for all ids
	   
 function getDetails(){
	if(window.i<window.challengeLength){
		var challengeString = window.challengeIdArray[i];
var url = 'https://api.topcoder.com/v3/challenges/'+ challengeString;
console.log(url);
		fetch(url).then(function(response){
			return response.json().then(function(specifications){
				//var specParsed = JSON.parse(specifications);
				window.spec = specifications.result.content.detailedRequirements;			
				window.specArray.push(window.spec);
				// getToken().then(analyze);
				 
		
				
				console.log(window.i + ' '+window.spec);
				window.i++;
				detailsTimeout();
				var loading;
				loading =  window.i+'/'+window.challengeLength ;
				document.getElementById('loading').innerHTML = loading;

		//	   }
		//	}
		
});
});

			}else{
				
				getToken().then(analyze);
				
				
			}
 }
 

 
//get auth token and use ToneAnalyzer
 
function getToken() {
  return fetch('/api/token/tone_analyzer').then(function(response) {
    return response.text();
  });
}

function analyze(token) {

  var toneAnalyzer = new ToneAnalyzerV3({
    token: token,
    version_date: '2016-05-19'
  });

	

if(window.y<window.challengeLength){	
  toneAnalyzer.tone(
    {
      text: window.specArray[window.y]
    },
    function(err, result) {
      if (err) {
        output.innerHTML = err;
        return console.log(err);
      }
	
	  window.results = JSON.stringify(result, null, 2) + window.y;
	  window.resultsArray.push(window.results);
	
	
	  console.log(window.results);
 
 			var loadingTone;
				loadingTone =  window.y+'/'+window.challengeLength ;
				document.getElementById('tone').innerHTML = loadingTone;
	 analyzeTimeout();

     // output.innerHTML = JSON.stringify(result, null, 2);
    }
  );

}else{initLog();}  // <----
  }
//set timeout functions
  function analyzeDetails(){
   getToken().then(analyze)
   window.y++;
  }
  
  function analyzeTimeout(){	  
	  setTimeout(analyzeDetails,100);	  
  }
  
  //Write structured data to text file 'log.txt' on button click , or, make this as a function and execute it in else case above to avoid click
  


function initLog() {
	var separateRes = '\n>>> TONE ANALYSIS RESULTS <<<\n';
	var prefix = '\n### CHALLENGE # ';
	var sufix = '\n################################################################\n';
	for(var i = 0;i<window.challengeLength;i++){
		
	window.sorted = [prefix + window.challengeIdArray[i] + sufix + window.specArray[i] +  sufix + separateRes + window.resultsArray[i] + sufix ];
	window.sortedArray.push(window.sorted);
	
	//console.log(window.sortedArray[0]);
	
	//console.log(window.challengeIdArray);
  //getToken().then(analyze);
   //getDetails();
   //document.getElementById("data").innerHTML = window.challengeIdArray;
   fetch('/api/writefile',{
    method: 'post',
	  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
    body: JSON.stringify(window.sortedArray[i])
  }).then(function(response) {

  var complete = 'All done. Check root folder for generated text file.'
  document.getElementById('tone').innerHTML = complete;
	document.getElementById('complete').innerHTML = complete;

    return response.text();
	
  });
}
}
setTimeout(getChallenges,10);
setTimeout(getDetails,5000);
function detailsTimeout(){
setTimeout(getDetails,1000);
}





