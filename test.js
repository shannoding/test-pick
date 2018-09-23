var tests = [
{
	"label": "LHS Website",
	"link": "https://lhs.fuhsd.org/"
},
{
	"label": "LHS Student",
	"link": "https://lhs.fuhsd.org/student-portal"
},
{
	"label": "Quiz #3",
	"link": "#number-three"
}
];

var select = document.getElementById("options");
var submit = document.getElementById("submit");

fillOptions();

function fillOptions() {
	var option;
	for (var i = 0; i < tests.length; i++) {
		option = document.createElement("option");
		option.setAttribute("value", i);
		option.appendChild(document.createTextNode(tests[i].label));
		select.appendChild(option);
	}
}

submit.addEventListener("click", function() {
	var selected = select.options[select.selectedIndex].value;
	if (selected !== "") {
		window.location.href = tests[selected].link;
		console.log("redirected");
	}
});
