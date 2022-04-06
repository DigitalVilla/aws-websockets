const Response = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const util = require('../common/utils')
const TableName = process.env.TABLE_NAME

exports.handler = async (event) => {
  console.log(event)
  try {
    const { connectionId: socketId, domainName, stage } = event.requestContext
    const Item = {
      socketId,
      stage,
      domainName,
      messages: [],
      timestamp: util.getTimestamp(),
    }

    await Dynamo.put({ Item, TableName })

    return Response.success({ body: { message: 'connected' } })
  } catch (error) {
    return Response.error({ body: { message: 'Could not connect' } })
  }
}
