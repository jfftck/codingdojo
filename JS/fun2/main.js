function Fun2() {
    var self = this;

    self.testStart = 10;
    self.testFinish = 20;
    self.testArray = [1, 5, 90, 25, -3, 0];

    self.init = function() {
        self.sumOfNumbers(self.testStart, self.testFinish);

        self.minimumValue(self.testArray);

        self.averageValue(self.testArray);
    };

    self.display = function() {
        for (var i = 0, len = self.x.length; i < len; i++) {
            console.log(self.x[i]);
        }
    };

    self.add100 = function() {
        self.x.push(100);
    };

    self.replaceArray = function() {
        self.x = ["hello", "world", "JavaScript is Fun"];
    };

    self.sumOfNumbers = function(start, finish) {
        var sum = 0;

        if (start === undefined) {
            start = 0;
        }

        if (finish === undefined) {
            finish = 500;
        }

        if (start > finish) {
            var temp = start;
            start = finish;
            finish = temp;
        }

        for (var i = start; i <= finish; i++) {
            sum += i;
        }

        console.log(sum);
    };

    self.minimumValue = function(arr) {
        var min = arr[0];

        for (var i = 1, len = arr.length; i < len; i++) {
            if (arr[i] < min) {
                min = arr[i];
            }
        }

        console.log(min);
    };

    self.averageValue = function(arr) {
        var sum = 0;
        var len = arr.length;

        for (var i = 0; i < len; i++) {
            sum += arr[i];
        }

        console.log(sum / len);
    };

    self.objectValues = function() {
        var new_ninja = {name: 'Jessica',
            profession: 'coder',
            favorite_language: 'JavaScript', //like that's even a question!
            dojo: 'Dallas'}

        for (var key in new_ninja) {
            if (new_ninja.hasOwnProperty(key)) {
                console.log(key + ' : ' + new_ninja[key]);
            }
        }
    };

    return self;
}

var Person = {
    name: "Jeff",
    distance_traveled: 0,

    say_name: function() {
        alert(this.name);
    },

    say_something: function(words) {
        alert(this.name + " says, '" + words +"'");
    },

    walk: function() {
        alert(this.name + " is walking");
        this.distance_traveled += 3;
    },

    run: function() {
        alert(this.name + " is running");
        this.distance_traveled += 10;
    },

    crawl: function() {
        alert(this.name + " is crawling");
        this.distance_traveled += 1;
    }
};

Fun2().init();

Person.say_name();
Person.say_something("Yo!");
Person.walk();
console.log(Person.distance_traveled);
Person.run();
console.log(Person.distance_traveled);
Person.crawl();
console.log(Person.distance_traveled);