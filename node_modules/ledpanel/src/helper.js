var i2c = require('i2c-bus')
var bus = i2c.openSync(1);
var async = require('async')
 
var address = 0x70 //Address of the Led Panel
var redCol = [0x0f, 0x0d, 0x0b, 0x09, 0x07, 0x05, 0x03, 0x01]
var redColAux = [0x0e, 0x0c, 0x0a, 0x08, 0x06, 0x04, 0x02, 0x00]
var redRow = [0x01, 0x02, 0x04, 0x08, 0x10, 0x20, 0x40, 0x80]
var reset = [0x00]

var helper = module.exports = {}


//Register led Panel
helper.register = function (done) {
	async.series([
		function(callback){
			bus.writeByte(address, 0x21, 0x00, function(err) {
				if(err) return callback(err, null)
				return callback(null)
			})
		},
		//Registering Led Panel
		function(callback){
			bus.writeByte(address, 0x81, 0x00, function(err) {
				if(err) return callback(err, null)
				return callback(null)
			})
		},
		//Registering Led Panel
		function(callback){
			bus.writeByte(address, 0xEF, 0x00, function(err) {
				if(err) return callback(err, null)
				return callback(null)
			})
	}], function(err, result){
		if(err) return done(err)
			var col = 0

			async.whilst(
				function () { return col <=7 },
				function (done) {
					col ++
					bus.writeByte(address, redColAux[col-1], 0x00, function(err) {
						return done(err)
					})

				},
				function (err) {
					return done(err)
				}
			)
	})
}

//Function to print the matrix
helper.matrix = function (mat, done) {

	async.series([
		async.apply(helper.checkDimension,mat),
		async.apply(helper.clear),
		async.apply(helper.joinPrint,mat)
		], function(err, results) {
			if(err) return done(err)
			return done(null)
		})
}

//This function prints the matrix on the ledPanel
helper.joinPrint = function (mat, callback) {

	var columns = helper.join(mat)
	var col = 0

	async.whilst(
		function () { return col <=7 },
		function (done) {
			col ++
			bus.writeByte(address, redCol[col-1], Number(columns[col-1]), function(err, none) {
				return done(err)
			})
		},
		function (err) {
			return callback(err)
		}
	)
}

helper.join = function (mat) {
	var columns = []
	//Join al the elements of the same column on the same variable and change from binary to hex
	for(var col = 0; col <= 7; col++) {
		var aux = []
		for(var row =0; row <=7; row++) {
			//Save the column on the aux variable
			aux.push(mat[row][col])
		}
		//Join the array to one value
		var value = aux.reverse().join("")
		value = parseInt(value, 2) //Binary to integer
		columns.push('0x' + value.toString(16)) //Save on colum with hexadecimal format
	}
	return columns
} 

//This function prints only one pixel on the ledPanel
helper.printPixel= function (row, col, callback) {

	//First we have to read wich leds are actived
	var pxsOn = helper.read(col, function(err, value) {

		if(err) return callback(err) 

		//Convert the value to a number and decimal base
		numberValue = parseInt(value, 16)
		//We print the pixel keeping the rest of pixels already colored
		//We pass the number as an hexadecimal one. //REVIEWWW
		var pxs = redRow[row] | numberValue
		bus.writeByteSync(address, redCol[col], Number('0x' + pxs.toString(16)), function(err, none) {
			if(err) return callback(err)
			return callback(null)
		})

	})
} 

//This function clears the ledPanel
helper.clear = function (callback) { 
	var col = 0

	async.whilst(
		function () { return col <=7 },
		function (done) {
			col ++
			bus.writeByte(address, redCol[col-1], 0x00, function(err) {
				return done(err)
			})

		},
		function (err) {
			return callback(err)
		}
	)
}

//This function reads the pixels already printed on the specified column of the ledpanel
helper.read = function (column, callback) {

	return bus.readWord(address, redCol[column], function(err, word) {
		if(err) return callback(err)
		return callback(null, word.toString(16))
	})
}


//This function checks the dimension of the matrix. It must be 8x8
helper.checkDimension = function (mat, callback) {
	
	if(!mat) return callback(new Error('matrix not defined.'))
	row = mat.length
	if(row !== 8) return callback(new Error('Dimension of matrix must be 8x8'))
	for (var i = 0; i <= 7; i++) {
		if(mat[i].length < 8) return callback(new Error('Dimenstion of matrix must be 8x8'))
	}
	return callback(null)
}


/*
function test() {
	async.series([
		function(callback){
			bus.writeByte(address, 0x21, 0x00, function(err) {
				if(err) return callback(err, null)
				return callback(null)
			})
		},
		//Registering Led Panel
		function(callback){
			bus.writeByte(address, 0x81, 0x00, function(err) {
				if(err) return callback(err, null)
				return callback(null)
			})
		},
		//Registering Led Panel
		function(callback){
			bus.writeByte(address, 0xEF, 0x00, function(err) {
				if(err) return callback(err, null)
				return callback(null)
			})
	}], function(err, result){
		if(err) return done(err)
		bus.writeByteSync(address, 0x0f, 0x00)
	})
}

test()*/
