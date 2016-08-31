function Fun1() {
    var self = this;

    self.x = [3,5,'Dojo', 'rocks', 'Michael', 'Sensei'];
    self.arr = [1, 5, 90, 25, -3, 0];

    self.init = function() {
        self.display();

        self.add100();
        self.display();

        self.replaceArray();
        self.display();

        self.sumOfNumbers();

        self.minimumValue();

        self.averageValue();

        self.objectValues();
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

    self.sumOfNumbers = function() {
        var sum = 0;

        for (var i = 0; i < 501; i++) {
            sum += i;
        }

        console.log(sum);
    };

    self.minimumValue = function() {
        var min = self.arr[0];

        for (var i = 1, len = self.arr.length; i < len; i++) {
            if (self.arr[i] < min) {
                min = self.arr[i];
            }
        }

        console.log(min);
    };

    self.averageValue = function() {
        var sum = 0;
        var len = self.arr.length;

        for (var i = 0; i < len; i++) {
            sum += self.arr[i];
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

Fun1().init();
