
// import *  as Auth from '@architect/shared/authentication.mjs'

// learn more about HTTP functions here: https://arc.codes/http
export async function handler(req) {

  return {
    cors: true,
    statusCode: 200,
    headers: {
      'access-control-allow-origin': '*',
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json charset=utf8'
    },
    body: JSON.stringify({
      data: {
        hi: 123
      },
    })
  }
}
