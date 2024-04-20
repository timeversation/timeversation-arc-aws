import arc from '@architect/functions'

let ENVs = {
  testing: {
    ARC_ENV: process.env.ARC_ENV,
    rest: "http://localhost:3333",
    socket: "http://localhost:3333",
  },
  staging: {
    ARC_ENV: process.env.ARC_ENV,
    rest: "https://act4stb1oi.execute-api.us-west-2.amazonaws.com",
    socket: "wss:/k7m5twur93.execute-api.us-west-2.amazonaws.com/staging",
  },
  production: {
    ARC_ENV: process.env.ARC_ENV,
    rest: "https://73k5bvags4.execute-api.us-west-2.amazonaws.com",
    socket: "wss://oa58a0pqmb.execute-api.us-west-2.amazonaws.com/production",
  }
}

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
     * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }  
  </style>
  <link rel="icon" type="image/x-icon" href="${arc.static('build/static/favicon_io/favicon.ico')}">
</head>
<body class="padding-32">
  <div class="max-width-320">
    <div class="margin-left-8">
      <button onclick="window.dispatchEvent(new CustomEvent('falala', { detail: {yo:123} }))">Falala-Yo</button>
      <pre>
      </pre>
    </div>
  </div>
  <script type="module">
    window.ARC_ENV = ${JSON.stringify(process.env.ARC_ENV, null, 2)}
    window.BACKEND_RESOURCES = ${JSON.stringify(ENVs[process.env.ARC_ENV], null, 2)}
    window.BACKEND_RESOURCES.rest = window.location.origin
    window.BACKEND_RESOURCES.socket = "ws://" + window.location.host 
    
    console.log(window.BACKEND_RESOURCES)
  </script>
   <script type="module" src="${arc.static('build/main.module.js')}"></script>
  </body>
</html>
`
  }
}