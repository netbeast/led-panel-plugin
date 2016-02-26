# ledpanel

ledpanel allows you to control the Bicolor 8x8 LED matrix backpack from Adafruit

## install

**With npm**
```
npm install ledpanel
```

##api

Color the matrix

```
ledpanel.matrix(matrix, callback)
```

Color one pixe

```
ledpanel.printPixel(x,y, callback)
```

Clear all

```
ledpanel.clear(callback)
```

##examples

```
var ledpanel = require('ledpanel')

var matrix = [[0, 0, 0, 0, 0, 0, 0, 0,],
				[1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1],
				[1, 1, 1, 1, 1, 1, 1, 1]]

ledpanel.matrix(matrix, function(err){
	if(err) console.log(err)
	console.log('Matrix Printed')
})

ledpanel.printPixel(0,0)

ledpanel.clear()
```

## Contact
* Visit our site [https://netbeast.co](https://netbeast.co)
* Mail us: staff [at] netbeast.co
* Report a bug or enter discussion at [issues](https://github.com/netbeast/colorsys/issues)
* Other resources: [Docs](https://github.com/netbeast/docs/wiki), Netbeast [API](https://github.com/netbeast/API)

This repo is shared with :heart: from Netbeast IoT regular job translating
messages from different devices and aggregating data.
