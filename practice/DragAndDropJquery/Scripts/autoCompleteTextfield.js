/* This script and many more are available free online at
The JavaScript Source!! http://javascript.internet.com
Created by: Timothy Groves | http://www.brandspankingnew.net/ */
countries = new Array(
  "Aaliyah Evans",
  "Robert Samuelson",
  "James Peter",
  "Abbie",
  "Dorothy Charles",
  "Helen Parson",
  "Edward George",
  "Jaclyn Anderson",
  "Stuwart Sanderson",
  "Jake Young",
  "Paisley Case",
  "Judith Norman",
  "Nazareen Parez",
  "Adam Schlitt",
  "Lisa Blair",
  "Patrick Hernandez",
  "William Bell",
  "Tyler Reed",
  "Louis Morrison",
  "Roy Green",
  "June Rogers",
  "Rita Bailey",
  "Bosnia and Herzegovina",
  "Ann Morgan",
  "Blake Evans",
  "Jake Cooper",
  "Robert Richardson",
  "Feliz Sanchez",
  "Morgan Rice",
  "Laurie Smith",
  "Daniel Anderson",
  "Michael Hall",
  "Sandra Wright"
);

var sug = "";
var sug_disp = "";

function getCountry() {
  var input = document.forms['address_frm'].country.value;
  var len = input.length;
  sug_disp = ""; sug = "";

  if (input.length) {
    // get matching country from array
    for (ele in countries)
    {
      if (countries[ele].substr(0,len).toLowerCase() == input.toLowerCase())
      {
        sug_disp = input + countries[ele].substr(len);
        sug = countries[ele];
        break;
      }
    }
  }
  document.forms['address_frm'].sug_country.value = sug_disp;
  if (!sug.length || input == sug_disp)
    document.getElementById('sug_btn').style.display = "none";
  else
    document.getElementById('sug_btn').style.display = "block";
}


function setCountry() {
  document.forms['address_frm'].country.value = sug;
  hideSug();
}

function hideSug() {
  document.forms['address_frm'].sug_country.value = "";
  document.getElementById('sug_btn').style.display = "none";
}
