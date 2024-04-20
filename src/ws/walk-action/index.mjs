import arc from '@architect/functions'
// let arc = require('@architect/functions')
let send = async ({ data, action, connectionId }) => {
  await arc.ws.send({
    id: connectionId,
    payload: {
      action: action,
      data: data,
    }
  }).catch(async r => {
    console.error(r)

    let tables = await arc.tables()

    await tables.connections.put({
      connectionId: connectionId
    }).then(r => {
      console.log('remove connection', r)
    })
  }).catch(r => {
    console.error(r)
  })
}

// learn more about WebSocket functions here: https://arc.codes/ws
export async function handler(req) {
  let data = JSON.parse(req.body, null, 2)

  console.info(data.action, data.message, data)

  let connectionId = req.requestContext.connectionId

  send({
    connectionId: connectionId,
    action: 'yohappy',
    data: {
      happy: 'happy'
    }
  })


  return { statusCode: 200 }
}