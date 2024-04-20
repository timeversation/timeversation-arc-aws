import React, { useEffect } from "react"
import ReconnectingWebSocket from 'reconnecting-websocket'

export function SocketApp() {
    let [socket, setSocket] = React.useState(null)
    useEffect(() => {
        // This is a JavaScript module
        let socketinst = new ReconnectingWebSocket(window.BACKEND_RESOURCES.socket)
        socketinst.onopen = function (e) {
            console.log('[open] Connection established')
            console.log('Sending to server')
        }

        socketinst.onmessage = function ({ data: rawJSON }) {
            let data = JSON.parse(rawJSON)
            console.log(data)
        }

        setSocket(socketinst)

        return () => {
            socketinst.close()
        }
    }, [])
    return <>
        <button className="bg-gray-200 p-3 px-5 mr-3" onClick={() => {
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
        }}>Autnentication</button>

        <button className="bg-gray-200 p-3 px-5 mr-3" onClick={() => {
            //

            socket.send(JSON.stringify({
                action: 'walk-action',
                data: {
                    happy: 123
                }
            }))

            //
        }}>Walk Action</button>
    </>
}