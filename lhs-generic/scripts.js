var tests = []; // array of objects with "label", "link", and "visible" 

var form = document.getElementById("form");
var submit = document.getElementById("submit");
var options = document.getElementsByClassName("option");
var selected = -1;

// tabletop code at https://github.com/jsoma/tabletop
// gets rows of Google Sheet
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1LkaiDhbaWczg_KrGBxGPB4aStQBnITVPUpota8lUuVc/edit';
// url must be set to viewable by everyone
  function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                     callback: showInfo,
                     simpleSheet: true } )
    // initializes Tabletop to get data and do the showInfo callback
    console.log("done init");
  }

  function showInfo(data, tabletop) { // called after data from sheet is loaded
	// data is an array of javascript objects (each representing a row) with the top row as keys and the target row as the values
  	for (var i = 0; i < data.length; i++) { // takes each object in data and populates the tests array
  		var testEntry = {
  			"label": data[i]['Label'],
  			"link": data[i]['Link'],
  			"visible": (data[i]['Visible'].toLowerCase() === 'true') // boolean
  		}
  		tests.push(testEntry);
  	}
    console.log(data);
    fillOptions();
  }


init(); // starts Tabletop

// displays the filled tests array in the HTML 
function fillOptions() {
	var option;
	for (var i = 0; i < tests.length; i++) {
		if (tests[i].visible) {
			option = document.createElement("div");
			option.setAttribute("class", "option");
			option.setAttribute("id", i);
			option.appendChild(document.createTextNode(tests[i].label));
			form.appendChild(option);
			// adds a new div per object in tests
			option.addEventListener("click", function() {
				if (selected == -1) {
					selected = this;
					selected.classList.toggle("selected");
				}
				else if(selected == this) { 
					selected.classList.remove("selected");
					selected = -1;
				}
				else if (selected) {
					selected.classList.remove("selected");
					selected = this;
					selected.classList.toggle("selected");
				}

				console.log(selected);
			});
		}
	}
	document.getElementById("loading").style.display = "none";
	console.log("filled options");
}


// takes user to the correct link when the button is clicked
submit.addEventListener("click", function() {
	if (selected) {
		window.location.href = tests[selected.id].link;
		console.log("redirected");
	}
});
