// learn more about HTTP functions here: https://arc.codes/http
export async function handler(req) {
  return {
    statusCode: 200,
    headers: {
      'cache-control': 'no-cache, no-store, must-revalidate, max-age=0, s-maxage=0',
      'content-type': 'text/html; charset=utf8'
    },
    body: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Yo</title>
  <style>
     * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; } .max-width-320 { max-width: 20rem; } .margin-left-8 { margin-left: 0.5rem; } .margin-bottom-16 { margin-bottom: 1rem; } .margin-bottom-8 { margin-bottom: 0.5rem; } .padding-32 { padding: 2rem; } .color-grey { color: #333; } .color-black-link:hover { color: black; } 
  </style>
</head>
<body class="padding-32">
  <div class="max-width-320">
    <img src="https://assets.arc.codes/logo.svg" />
    <div class="margin-left-8">
      <button onclick="window.dispatchEvent(new CustomEvent('falala', { detail: {yo:123} }))">Falala-Yo</button>

    </div>
  </div>
  <script type="module">
    // This is a JavaScript module
    let socket = new WebSocket('ws://localhost:3333/?auth=1234')
    socket.onopen = function(e) {
      console.log('[open] Connection established')
      console.log('Sending to server')

      window.addEventListener('falala', ({ detail }) => {
        console.log(detail)
        socket.send(JSON.stringify({
          action: 'walk-action',
          message: detail
        }))
      })
    }
    
  </script>
  </body>
</html>
`
  }
}