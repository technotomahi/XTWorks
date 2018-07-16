class Greeter
{
    //console.log("Hi");
    constructor (greeting)
    {
        this.greeting = greeting; 
    }

    greet() 
    {
        return this.greeting;
      
        //document.write("This is the greeting from javascript Greeter : Message - " +  this.greeting);x``

    }
}
//import Greater from './src/js/greeter.js';
//require('./src/css/styles.css');

document.write("Hello from Javascript");

var greeterObj = new Greeter("from Index hello");
//var greeterObj = new Greeter1("from greeter1 hello");
document.write('<h1>Hello World from the server'+ greeterObj.greet() +' </h1>');

//alert("hi");