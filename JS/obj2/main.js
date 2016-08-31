'use strict';

function VehicleConstructor(name, numOWheels, numOPassengers, speed) {
	var self = this;
	var distance_travelled = 0;

	var updateDistanceTravelled = function() {
		distance_travelled += speed;
	}

	self.name = name;
	self.numberOfWheels = numOWheels;
	self.numberOfPassengers = numOPassengers;
	self.speed = speed;

	self.makeNoise = function() {
		console.log(name + ' is making noise.');
	};
	
	self.move = function() {
		updateDistanceTravelled();
		self.makeNoise();
	}

	self.checkMiles = function() {
		console.log(distance_travelled);
	}
}



var bike1 = new VehicleConstructor('Bike', 2, 1, 10);
bike1.makeNoise = function() {
	console.log('ring ring!');
};

bike1.makeNoise();
bike1.checkMiles();
bike1.move();
bike1.checkMiles();

var sedan1 = new VehicleConstructor('Sedan', 4, 5, 50);
sedan1.makeNoise = function() {
	console.log('Honk Honk!');
};

sedan1.makeNoise();
sedan1.checkMiles();
sedan1.move();
sedan1.checkMiles();

var bus1 = new VehicleConstructor('Bus', 4, 1, 25);
bus1.pickUp = function(numONewPassengers) {
	this.numberOfPassengers += numONewPassengers;
}

bus1.pickUp(10);
console.log(bus1.numberOfPassengers);
bus1.checkMiles();
bus1.move();
bus1.checkMiles();

const distance_travelled = Symbol('distance_travelled');

class VehicleConstructor2 {
	constructor(name, numOWheels, numOPassengers, speed) {
		this.name = name;
		this.numberOfWheels = numOWheels;
		this.numberOfPassengers = numOPassengers;
		this.speed = speed;

		this[distance_travelled] = 0;
	}

	makeNoise() {
		console.log(this.name + ' is making noise.');
	}

	move() {
		var updateDistanceTravelled = () => {
			this[distance_travelled] += this.speed;
		};

		updateDistanceTravelled();
		this.makeNoise();
	}

	checkMiles() {
		console.log(this[distance_travelled]);
	}	
}

class Bike extends VehicleConstructor2 {
	constructor(numOPassengers, speed) {
		super('Bike', 2, numOPassengers, speed);
	}

	makeNoise() {
		console.log('ring ring!');
	}
}

var bike2 = new Bike(1, 10);
bike2.makeNoise();
bike2.checkMiles();
bike2.move();
bike2.checkMiles();

class Sedan extends VehicleConstructor2 {
	constructor(numOPassengers, speed) {
		super('Sedan', 4, numOPassengers, speed);
	}

	makeNoise() {
		console.log('Honk Honk!');
	}
}

var sedan2 = new Sedan(5, 50);
sedan2.makeNoise();
sedan2.checkMiles();
sedan2.move();
sedan2.checkMiles();

class Bus extends VehicleConstructor2 {
	constructor(numOPassengers, speed) {
		super('Bus', 4, numOPassengers, speed);
	}

	pickUp(numONewPassengers) {
		this.numberOfPassengers += numONewPassengers;
	}
}

var bus2 = new Bus(1, 25);
bus2.pickUp(10);
console.log(bus2.numberOfPassengers);
bus2.checkMiles();
bus2.move();
bus2.checkMiles();