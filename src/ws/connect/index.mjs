import arc from '@architect/functions'

// learn more about WebSocket functions here: https://arc.codes/ws
export async function handler(req) {
  console.log('connect', req.requestContext.connectionId)
  let tables = await arc.tables()

  await tables.connections.put({
    connectionId: req.requestContext.connectionId
  }).then(r => {
    console.log('new connection', r)
  })

  return { statusCode: 200, body: `${req.requestContext.connectionId}` }
}