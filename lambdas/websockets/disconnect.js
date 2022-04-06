const Response = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const TableName = process.env.TABLE_NAME

exports.handler = async (event) => {
  console.log('event', event)
  const Key = { socketId: event.requestContext.connectionId }
  await Dynamo.delete({ Key, TableName })
  return Response.success({ body: { message: 'disconnected' } })
}
