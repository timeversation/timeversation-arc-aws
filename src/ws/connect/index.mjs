// learn more about WebSocket functions here: https://arc.codes/ws
export async function handler(req) {
  console.log('connect', req.requestContext.connectionId)

  return { statusCode: 200, body: `${req.requestContext.connectionId}` }
}