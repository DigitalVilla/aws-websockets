const Response = require('../common/API_Responses')

exports.handler = async (event) => {
  console.log('event', event)
  return Response.success({})
}
