function VehicleConstructor(name, numOWheels, numOPassengers, speed) {
	this.distance_travelled = 0;
	this.name = name;
	this.numberOfWheels = numOWheels;
	this.numberOfPassengers = numOPassengers;
	this.speed = speed;
	this.vin_number = function() {
		var randVin = [];
		for (var i = 0; i < 6; i++) {
			randVin.push(Math.floor(Math.random() * 36).toString(36).toUpperCase());
		}

		return randVin.join("");
	}();
}

VehicleConstructor.prototype.makeNoise = function() {
	console.log(this.name + ' is making noise.');

	return this;
};

VehicleConstructor.prototype.move = function() {
	this.updateDistanceTravelled().makeNoise();

	return this;
}

VehicleConstructor.prototype.checkMiles = function() {
	console.log(this.distance_travelled);

	return this;
}

VehicleConstructor.prototype.updateDistanceTravelled = function() {
	this.distance_travelled += this.speed;

	return this;
}

VehicleConstructor.prototype.vin = function() {
	return this.vin_number;
}

var bike1 = new VehicleConstructor('Bike', 2, 1, 10);
bike1.makeNoise = function() {
	console.log('ring ring!');

	return this;
};

console.log(bike1.makeNoise().checkMiles().move().checkMiles().vin());

var sedan1 = new VehicleConstructor('Sedan', 4, 5, 50);
sedan1.makeNoise = function() {
	console.log('Honk Honk!');

	return this;
};

console.log(sedan1.makeNoise().checkMiles().move().checkMiles().vin());

var bus1 = new VehicleConstructor('Bus', 4, 1, 25);
bus1.pickUp = function(numONewPassengers) {
	this.numberOfPassengers += numONewPassengers;

	return this;
}

console.log(bus1.pickUp(10).checkMiles().move().checkMiles().vin());
console.log(bus1.numberOfPassengers);
