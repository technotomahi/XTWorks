 describe("Rectangle", function() {

    var rectangle;
    beforeEach(function() {

        rectangle = new app.rectangle();
        rectangle.set({
            length: 7, 
            width: 4
        });
    });

    describe("with length 7 and width 4", function() {
        it("should have an area of 28", function() {
            expect(rectangle.area()).toBe(28);
        })
    });
 });