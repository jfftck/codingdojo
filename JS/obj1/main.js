function VehicleConstructor(name, numOWheels, numOPassengers) {
	var vehicle = {
		name: name,
		numberOfWheels: numOWheels,
		numberOfPassengers: numOPassengers,

		makeNoise: function() {
			console.log(name + ' is making noise.');
		}
	}

	return vehicle;
}

var Bike = VehicleConstructor('Bike', 2, 1);
Bike.makeNoise = function() {
	console.log('ring ring!');
};

Bike.makeNoise();

var Sedan = VehicleConstructor('Sedan', 4, 5);
Sedan.makeNoise = function() {
	console.log('Honk Honk!');
};

Sedan.makeNoise();

var Bus = VehicleConstructor('Bus', 4, 1);
Bus.pickUp = function(numONewPassengers) {
	this.numberOfPassengers += numONewPassengers;
}

Bus.pickUp(10);
console.log(Bus.numberOfPassengers);