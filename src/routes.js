var express = require('express')
var router = express.Router()
var ledpanel = require('ledpanel')
// Require the discovery function
var loadResources = require('./resources')

loadResources(function (err) {
  if (err) console.log(new Error())

  router.post('/ledPanel/:id', function (req, res, next) {
    //  req.body = {power:on/off, data:[]}
    if (!req.body.power) return res.status(400).send('Incorrect format {power:on/off, data}')

    if (req.body.power === 'off' || !req.body.power) {
      ledpanel.clear(function (err) {
        if (err) return res.status(400).send('A problem setting one value occurred')
        return res.send({power: req.body.power})
      })
    }
    else if (req.body.power === 'on' || req.body.power) {
      ledpanel.matrix(req.body.data, function (err) {
        if (err) return res.status(400).send('A problem setting one value occurred')
        return res.send(req.body)
      })
    }
    else return res.status(400).send('Incorrect format {power:on/off, data}')
  })
})

// Used to serve the routes
module.exports = router
