import Greeter from 'greeter';
require('./css/styles.css');

document.write("Hello from Javascript");

var greeterObj = new Greeter();
document.write('<h1>Hello World from the server'+ greeterObj.greet() +' </h1>');

