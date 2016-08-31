
var personConstrucor = function(name) {
    var Person = {
        name: name,
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

    return Person;
};

var person = personConstrucor("Jay");

person.say_name();
person.say_something("This is cool!");
person.walk();
console.log(person.distance_traveled);
person.run();
console.log(person.distance_traveled);
person.crawl();
console.log(person.distance_traveled);

var person2 = personConstrucor("Bob");
person2.say_name();

console.log(person);
console.log(person2);

var ninjaConstructor = function(name) {
    var belts = [
        "white",
        "yellow",
        "orange",
        "green",
        "blue",
        "purple",
        "brown",
        "black"
    ];

    var Ninja = {
       name: name,
       cohort: null,
       beltLevel: 1,

       levelUp: function() {
           Ninja.beltLevel++;
           if (Ninja.beltLevel > 7) {
            Ninja.beltLevel--;
           }
       },

       belt: function() {
           alert(name + " is a " + belts[Ninja.beltLevel] + " belt.");
       }
    };

    return Ninja;
};

var jeff = ninjaConstructor("Jeff");
jeff.levelUp();
jeff.levelUp();
jeff.levelUp();
jeff.levelUp();
jeff.levelUp();
jeff.levelUp();
jeff.levelUp();
jeff.belt();

var bob = ninjaConstructor("Bob");
bob.belt();

console.log(jeff);
console.log(bob);