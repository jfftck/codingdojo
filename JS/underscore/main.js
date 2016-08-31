var _ = {
	map: function(arr, callback) {
		for (var i = 0, len = arr.length; i < len; i++) {
			arr[i] = callback(arr[i]);
		}

		return arr;
	},

	reduce: function(arr, callback, memo) {
		var start = 0;

		if (memo == undefined) {
			memo = arr[0];
			start = 1;
		}

		for (var i = start, len = arr.length; i < len; i++) {
			memo = callback(memo, arr[i]);
		}

		return memo;
	},

	find: function(arr, callback) {
		for (var i = 0, len = arr.length; i < len; i++) {
			if (callback(arr[i])) {
				return arr[i];
			}
		}
	},

	filter: function(arr, callback) {
		var filteredArr = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			if (callback(arr[i])) {
				filteredArr.push(arr[i]);
			}
		}

		return filteredArr;
	},

	reject: function(arr, callback) {
		var rejectedArr = [];
		for (var i = 0, len = arr.length; i < len; i++) {
			if (!callback(arr[i])) {
				rejectedArr.push(arr[i]);
			}
		}

		return rejectedArr;
	}
}

var testArr = function() {
	return [1, 2, 3, 4, 5]
};
var baseTest = function(num) {
	return num % 2 == 0;
}
var reduceTest = function(memo, num) {
	return memo * num;
}

console.log(_.map(testArr(), baseTest));
console.log(_.reduce(testArr(), reduceTest));
console.log(_.find(testArr(), baseTest));
console.log(_.filter(testArr(), baseTest));
console.log(_.reject(testArr(), baseTest));