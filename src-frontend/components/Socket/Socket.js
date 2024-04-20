import React, { useEffect } from "react"
import ReconnectingWebSocket from 'reconnecting-websocket'

export function SocketApp() {
    useEffect(() => {
        // This is a JavaScript module
        let socket = new ReconnectingWebSocket(window.BACKEND_RESOURCES.socket)
        socket.onopen = function (e) {
            console.log('[open] Connection established')
            console.log('Sending to server')

            socket.send(JSON.stringify({
                action: 'walk-action',
                data: {
                    happy: 123
                }
            }))
        }

        window.addEventListener('falala', ({ detail }) => {
            console.log(detail)
        })


        // window.addEventListener('')

        socket.onmessage = function ({ data: rawJSON }) {
            let data = JSON.parse(rawJSON)
            console.log(data)
        }

        fetch(window.BACKEND_RESOURCES.rest + '/auth', {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ client: 'source from desktop' })
        }).then(r => {
            return r.json()
        }).then(v => {
            console.log(v)
        })


    })
    return <>
        <button onClick={() => {
            window.dispatchEvent(new CustomEvent('falala', { detail: { yo: 123 } }))
        }}>Falala-Yo</button>
    </>
}