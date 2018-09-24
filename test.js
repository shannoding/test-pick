var tests = []; // array of objects with "label", "link", and "visible" 

var select = document.getElementById("options");
var submit = document.getElementById("submit");

// tabletop code at https://github.com/jsoma/tabletop
// gets rows of Google Sheet
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/10MKPG0vyIZPhQBdYxySfKjDEZH32bTupaiDBlODPXtY/';
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

// displays the filled tests array in the HTML select
function fillOptions() {
	var option;
	for (var i = 0; i < tests.length; i++) {
		if (tests[i].visible) {
			option = document.createElement("option");
			option.setAttribute("value", i);
			option.appendChild(document.createTextNode(tests[i].label));
			select.appendChild(option);
			// adds a new option tag to the select dropdown per object in tests
		}
	}
	console.log("filled options");
}

// takes user to the correct link when the button is clicked
submit.addEventListener("click", function() {
	var selected = select.options[select.selectedIndex].value;
	if (selected !== "") {
		window.location.href = tests[selected].link;
		console.log("redirected");
	}
});
