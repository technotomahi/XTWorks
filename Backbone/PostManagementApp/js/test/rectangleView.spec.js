describe("Rectangle View", function() {

    var rectangleView;

    describe("With lengrh 70 and width 40", function() {
        beforeEach(function(){
            var rectangle = new app.rectangle({
                length: 70, 
                width: 40
            });

            rectangleView = new app.rectangleView({
                model: rectangle
            });
            rectangleView.render();
        });

        it("It should render a div ", function(){
            expect(rectangleView.el.tagName).toBe("DIV");
        });

        
        it("It whould render with class rectangle ", function(){
            expect(rectangleView.$el.hasClass('rectangle')).toBe(true);
        });
    });
});