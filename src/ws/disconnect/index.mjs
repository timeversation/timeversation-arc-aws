import arc from '@architect/functions'
// learn more about WebSocket functions here: https://arc.codes/ws

export async function handler(req) {
  console.log('disconnect', req.requestContext.connectionId)

  let tables = await arc.tables()

  await tables.connections.delete({
    connectionId: req.requestContext.connectionId
  }).then(r => {
    console.log('remove connection', r)
  })


  return { statusCode: 200, body: `${req.requestContext.connectionId}` }
}