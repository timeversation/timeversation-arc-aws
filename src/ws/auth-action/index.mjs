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

    await tables.connections.delete({
      connectionId: connectionId
    }).then(r => {
      console.log('remove connection', r)
    })
  }).catch(r => {
    console.error(r)
  })
}

export async function handler(req) {
  let payload = JSON.parse(req.body, null, 2)
  console.log(payload)

  await send({
    action: 'auth-action',
    data: { auth: 123 },
    connectionId: req.requestContext.connectionId
  })

  return { statusCode: 200 }
}