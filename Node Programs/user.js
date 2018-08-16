function User(name,city)
{
    this.name=name;
    this.city=city;
    this.greet=function(){
        console.log("Welcome "+this.name);
    }
}
User.prototype.print=function(){
    console.log(this.name+" "+this.city);
}
module.exports=User;