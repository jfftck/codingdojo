function Interprete() {
    var self = this;

    self.firstOriginal = function() {
        console.log(first_variable);
        var first_variable = "Yipee I was first!";
        function firstFunc() {
            first_variable = "Not anymore!!!";
            console.log(first_variable)
        }
        console.log(first_variable);
    };

    self.firstModified = function() {
        var first_variable;
        console.log(first_variable);  // undefined

        function firstFunc() {
            first_variable = "Not anymore!!!";
            console.log(first_variable)
        }
        
        first_variable = "Yipee I was first!";
        console.log(first_variable); // "Yipee I was first!"
    };

    self.secondOriginal = function() {
        var food = "Chicken";
        function eat() {
            food = "half-chicken";
            console.log(food);
            var food = "gone";       // CAREFUL!
            console.log(food);
        }
        eat();
        console.log(food);
    };

    self.secondModified = function() {
        var food;
        function eat() {
            var food;
            food = "half-chicken";
            console.log(food); // "half-chicken"
            food = "gone";       // CAREFUL!
            console.log(food); // "gone"
        }
        food = "Chicken";
        eat();
        console.log(food); // "Chicken"
    };

    self.thirdOriginal = function() {
        var new_word = "NEW!";
        function lastFunc() {
            new_word = "old";
        }
        console.log(new_word);
    };

    self.thirdModified = function() {
        var new_word;
        function lastFunc() {
            new_word = "old";
        }

        new_word = "NEW!";
        console.log(new_word); // "NEW!"
    };

    return self;
}

interprete = new Interprete();

interprete.firstOriginal();
interprete.firstModified();

interprete.secondOriginal();
interprete.secondModified();

interprete.thirdOriginal();
interprete.thirdModified();