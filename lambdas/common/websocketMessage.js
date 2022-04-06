const AWS = require('aws-sdk')

const createWebsocket = (domainName, stage) =>
  new AWS.ApiGatewayManagementApi({
    endpoint: `${domainName}/${stage}`,
    apiVersion: '2018-11-29',
  })

const send = ({ domainName, stage, connectionId, message }) => {
  const ws = createWebsocket(domainName, stage)

  const postParams = {
    Data: message,
    ConnectionId: connectionId,
  }

  return ws.postToConnection(postParams).promise()
}

module.exports = {
  send,
}
