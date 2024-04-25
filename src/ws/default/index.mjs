let arc = require('@architect/functions')

// learn more about WebSocket functions here: https://arc.codes/ws
export async function handler(req) {

  console.log('ws default handler called')

  return { statusCode: 200 }
}