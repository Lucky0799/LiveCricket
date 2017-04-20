/*jslint vars: true, plusplus: true, devel: true, nomen: true, regexp: true, indent: 4, maxerr: 50 */
/*global $, window, location, CSInterface, SystemPath, themeManager*/


var cricEngine = (function (){

	'use strict';
	var currentmatch;
	var isfirstTime = true;
	
	function init()
	{
		util.setBusyCursor();
		$.get("https://cricapi.com/api/cricket?apikey=BAb6yQLXIvgpwKi1R3dA41nB5YU2", function(matches) {
			matches.data.forEach(function(md) {
				rendermatch(md);
			});
		});
	}


	function rendermatch(match)
	{
		var button = $('<button id="btn_test" class="topcoat-button--large hostFontSize match-button">Call ExtendScript</button>');
		button.text(match.title).data(match).on('click', match, function(event){
				currentmatch = match;
				openMatch(match);
			});
		$("#allMatches").append(button);
		util.clearBusyCursor();
	}

	
	function openMatch(match)
	{
		$.post("https://cricapi.com/api/cricketScore?apikey=BAb6yQLXIvgpwKi1R3dA41nB5YU2",
			   { apikey: "BAb6yQLXIvgpwKi1R3dA41nB5YU2", unique_id: match.unique_id },
				 function(details){
					showScore(details);
				});
	}
	
	function showScore(score)
	{
		if(score.score === $("#batsman1").text()) 
		{
			console.log("Same Score");
			return;
		}
		console.log("adding new Score");
		$("#allMatches").hide();
		$("#score").show();
		$("#type").text(score.type);
		$("#teams").text(score["team-1"] + " v/s " + score["team-2"]);
		$("#batsman1").text(score.score);
		$("#batsman2");
		$("#bowler");
		$("#tagline").text(score["innings-requirement"]);
		
		if(isfirstTime === true)
		{
			window.setInterval(function(){
				console.log("Fetching new score");
				openMatch(currentmatch);
			}, 4000);
			
			isfirstTime = false;
		}
	}

	return {
		init: init
	};
}());


/**			TODO

	1.	Add team logos insted of names
	2.	Style it like a pro
	3.	Why loading circle is not coming


**/


(function () {
    'use strict';

    var csInterface = new CSInterface();
	
    function init() {
                
        themeManager.init();
        
    }
        
    init();

	cricEngine.init();
}());
    

