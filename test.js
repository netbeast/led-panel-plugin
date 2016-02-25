request = require('request')

var args = {power: 'on', data: [[0, 0, 0, 0, 0, 0, 0, 0,], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1, 1, 1]]

}}
request.post({
  url: 'http://localhost:8000/i/api/ledPanel/1',
  json: args
}, function (err, resp, body) {
  if (err) console.log(err)
  console.log(body)
})