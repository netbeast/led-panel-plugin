var request = require('request')

module.exports = function (callback) {
  var objects = []

  // Request to the database
  request.get('http://' + process.env.NETBEAST + '/api/resources?app=led-panel-plugin',
  function (err, resp, body) {
    if (err) return callback(err)
    if (!body) return callback()

    body = JSON.parse(body)

    // Store the found devices in 'objects' array
    if (body.length > 0) {
      body.forEach(function (device) {
        if (objects.indexOf(device.hook) < 0) objects.push(device.hook)
      })
    }
  })

  var indx = objects.indexOf('/ledPanel/1')
  if (indx >= 0) {
    objects.splice(indx, 1)
  } else {
    request.post({url: 'http://' + process.env.NETBEAST + '/api/resources',
    json: {
      app: 'led-panel-plugin',
      location: 'none',
      topic: 'Led',
      groupname: 'none',
      hook: '/ledPanel/1'
    }},
    function (err, resp, body) {
      if (err) return callback(err)
      callback
    })
  }
  if (objects.length > 0) {
    objects.forEach(function (hooks) {
      //  Use this block to delete a device from the netbeast database
      request.del('http://' + process.env.NETBEAST + '/api/resources?hook=' + hooks,
      function (err, resp, body) {
        if (err) callback(err)
      })
    })
  }
  return callback(null)
}
