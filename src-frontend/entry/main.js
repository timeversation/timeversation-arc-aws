// This is a JavaScript module
let socket = new WebSocket(window.BACKEND_RESOURCES.socket)
socket.onopen = function (e) {
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

fetch(window.BACKEND_RESOURCES.rest + '/api', {
    method: 'GET'
}).then(r => {
    return r.json()
}).then(v => {
    console.log(v)
})
