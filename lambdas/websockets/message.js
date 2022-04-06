const WebSocket = require('../common/websocketMessage')
const Response = require('../common/API_Responses')
const Dynamo = require('../common/Dynamo')
const util = require('../common/utils')
const TableName = process.env.TABLE_NAME

exports.handler = async (event) => {
  console.log(' event', event)
  try {
    const body = JSON.parse(event.body)
    const { connectionId } = event.requestContext
    const Key = { socketId: connectionId }
    const record = await Dynamo.get({ Key, TableName })
    const { messages, domainName, stage } = record

    messages.push(body.message)
    const Item = {
      ...record,
      messages,
    }

    await Dynamo.put({ Item, TableName })
    await WebSocket.send({
      stage,
      domainName,
      connectionId,
      message: `Ping ${util.getTime()} - ${body.message}`,
    })

    console.log('Message sent')
    return Response.success({ body: { message: 'Got a message' } })
  } catch (error) {
    return Response.error({ error })
  }
}
