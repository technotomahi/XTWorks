function Mobile(name,price,brand)
{
    this.name=name;
    this.price=price;
    this.brand=brand;
    this.show=function()
    {
        console.log("NAME : "+this.name+"  PRICE : "+this.price+"  BRAND : "+this.brand);
    }
}
    Mobile.prototype.discount=function()
    {
        if(this.brand=="samsung")
        {
            this.price=this.price-this.price/10;
            console.log("Congratulations , you got 10% discount ");
        }
        else
            console.log("Sorry ,No discount :)");
    }
module.exports=Mobile;