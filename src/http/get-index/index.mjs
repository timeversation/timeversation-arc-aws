import arc from '@architect/functions'

let EnvProfiles = {
  testing: {
    ARC_ENV: process.env.ARC_ENV,
    rest: "http://localhost:3333",
    socket: "http://localhost:3333",
  },
  staging: {
    ARC_ENV: process.env.ARC_ENV,
    rest: "https://8rx21x1hfb.execute-api.us-west-2.amazonaws.com",
    socket: "wss://b5rbwf4vui.execute-api.us-west-2.amazonaws.com/staging",
  },
  production: {
    ARC_ENV: process.env.ARC_ENV,
    rest: "https://gddxtip4tk.execute-api.us-west-2.amazonaws.com",
    socket: "wss://i9c0ksiy26.execute-api.us-west-2.amazonaws.com/production",
  }
}
/*


    HTTP: https://8rx21x1hfb.execute-api.us-west-2.amazonaws.com
      WS: wss://b5rbwf4vui.execute-api.us-west-2.amazonaws.com/staging



HTTP: https://gddxtip4tk.execute-api.us-west-2.amazonaws.com
      WS: wss://i9c0ksiy26.execute-api.us-west-2.amazonaws.com/production
*/
//
// AWS_SECRET_ACCESS_KEY
// AWS_ACCESS_KEY_ID
//

const CURRENT_ARC_ENV = EnvProfiles[process.env.ARC_ENV]

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
  <title>Timeversation</title>
  <style>
     * { margin: 0; padding: 0; box-sizing: border-box; } body { font-family: -apple-system, BlinkMacSystemFont, sans-serif; }  
  </style>
  <link rel="icon" type="image/x-icon" href="${arc.static('favicon.ico')}">
</head>
<body class="">
  <div id="root"></div>
  <script type="module">
    window.ARC_ENV = ${JSON.stringify(process.env.ARC_ENV, null, 2)}
    window.BACKEND_RESOURCES = ${JSON.stringify(CURRENT_ARC_ENV, null, 2)}
    // localhost development
    if (window.ARC_ENV === 'testing') {
      window.BACKEND_RESOURCES.rest = window.location.origin
      window.BACKEND_RESOURCES.socket = "ws://" + window.location.host 
    }
  </script>
   <script type="module" src="${arc.static('build/main.module.js')}"></script>
  </body>
</html>
`
  }
}