// learn more about WebSocket functions here: https://arc.codes/ws
export async function handler(req) {
  let data = JSON.parse(req.body, null, 2)
  console.info(data.action, data.message, data)

  return { statusCode: 200 }
}