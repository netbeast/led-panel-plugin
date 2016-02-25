

var express = require('express')
var router = express.Router()
var ledpanel = require('ledpanel')
// Require the discovery function
var loadResources = require('./resources')

loadResources(function (err) {
  if (err) throw err

  router.post('/ledPanel/:id', function (req, res, next) {


    //req.body = {power:on/off, data:[]}
    var powerValue = req.body.power

    if (!powerValue) return res.status(400).send('Incorrect format {power:on/off, data}')

    else if (powerValue === 'off') {
      ledpanel.clear(function(err) {
        if(err) return res.status(404).send('A problem setting one value occurred')
          return res.send('Matrix Cleared')
      })
    }
    else if (powerValue == 'on') {
      var matrix = req.body.data

      ledpanel.matrix(matrix, function(err) {
        if(err) return res.status(404).send('A problem setting one value occurred')
          return res.send('Matrix Colored')
      })

    }
    else return res.status(400).send('Incorrect format {power:on/off, data}')

  })
})

// Used to serve the routes
module.exports = router
