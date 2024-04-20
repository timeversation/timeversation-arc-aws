// learn more about HTTP functions here: https://arc.codes/http
export async function handler(req) {
  let data = req.body
  console.log(data)

  return {
    cors: true,
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'application/json; charset=utf8'
    },
    body: JSON.stringify({ ...data, server: Math.random() })
  }
}