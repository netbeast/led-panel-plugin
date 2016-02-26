var	helper = require('./src/helper.js')
var async = require('async')

var ledpanel = module.exports = {}

ledpanel.matrix = function (matrix, callback) {
	async.series([
		async.apply(helper.register),
		//Function to be executed here
		async.apply(helper.matrix, matrix)
	], function(err, results) { 
		if(typeof callback === 'function') return callback(err)
		else if(err) throw err
	})
} 

 
ledpanel.printPixel = function (x, y, callback) {
	async.series([
		async.apply(helper.register),
		async.apply(helper.printPixel(x,y))
	], function(err, results) { 
		if(typeof callback === 'function') return callback(err)
		else if(err) throw err 
	})
}

ledpanel.clear = function (callback) {
	helper.clear(function(err) {
		if(typeof callback === 'function') return callback(err)
		else if(err) throw err
	})
}
 
 