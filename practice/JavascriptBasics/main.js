 
//"use strict"
// Use strict test 
let a = "Its a ";
// let a = "sdfsf";
// var a = "apple";
b = "sdfsssdfsfsfsdfsdf";
console.log(b);




// Scope test
console.log("=========================")
console.log("========SCOPE start======")
var counter = 1;
function mf(){
 for(var j = 0; j <= 12; j++)
 {
  j++;
  k = 123;
 }

 console.log(j)
}

mf();

// It will be undefined here 
//console.log(j)
console.log(k)

console.log("=========================")
console.log("========SCOPE= End=====")


// querySelector 
var test = document.querySelectorAll('li');
console.log(test[2].innerHTML); 

// Prototype
var person  = function()
{
var a = 11;
var b = 12;
}



person.prototype.c = 13

//alert(new person().c);

// Arry methods
var numbers = [1, 25, 3, 4 ];
var sortedOnes = numbers.sort(function(a, b){ return a-b});
//console.log(sortedOnes);

var defaultSortedOnes = numbers.sort();

//console.log(defaultSortedOnes);


// Query selector
var elements = document.querySelectorAll("li");
console.log(elements[0]);


// global NAMESPACE


var com = com || {};
    com.oeGeek =   com.oeGeek  || {};

   com.oeGeek.Animal =  function(type)
    {

    };

    com.oeGeek.Animal.prototype.version = "2.00";
var anmlCat = new com.oeGeek.Animal('Cat');
    console.log("GLOBAL NAMESPACE")
    console.log(com.oeGeek.Animal.prototype.version);





