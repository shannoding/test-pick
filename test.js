var tests = [
{
	"label": "LHS Website",
	"link": "https://lhs.fuhsd.org/",
	"visible": true
},
{
	"label": "LHS Student",
	"link": "https://lhs.fuhsd.org/student-portal",
	"visible": true
},
{
	"label": "Quiz #2",
	"link": "#quiz-two",
	"visible": false
},
{
	"label": "Quiz #3",
	"link": "#number-three",
	"visible": true
}
];

var select = document.getElementById("options");
var submit = document.getElementById("submit");

// tabletop code at https://github.com/jsoma/tabletop
// gets rows of Google Sheet
var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/10MKPG0vyIZPhQBdYxySfKjDEZH32bTupaiDBlODPXtY/';

  function init() {
    Tabletop.init( { key: publicSpreadsheetUrl,
                     callback: showInfo,
                     simpleSheet: true } )
    console.log("done init");
  }

  function showInfo(data, tabletop) {
  	for (var i = 0; i < data.length; i++) {
  		var testEntry = {
  			"label": data[i]['Label'],
  			"link": data[i]['Link'],
  			"visible": (data[i]['Visible'].toLowerCase() === 'true')
  		}
  		tests.push(testEntry);
  	}
    console.log(data);
    fillOptions();
   	document.getElementById("splash").style.display = "none";
  }


init();

function fillOptions() {
	var option;
	for (var i = 0; i < tests.length; i++) {
		if (tests[i].visible) {
			option = document.createElement("option");
			option.setAttribute("value", i);
			option.appendChild(document.createTextNode(tests[i].label));
			select.appendChild(option);
		}
	}
	console.log("filled options");
}

submit.addEventListener("click", function() {
	var selected = select.options[select.selectedIndex].value;
	if (selected !== "") {
		window.location.href = tests[selected].link;
		console.log("redirected");
	}
});
