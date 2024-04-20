import React, { useEffect } from "react"
import { useSocket } from "./useSocket"
import { useEventFromSocket } from "./useEventFromSocket"

export function SocketApp() {
    let { socket, ready } = useSocket()
    let value = useEventFromSocket({ eventName: 'yohappy' })

    return <>
        <pre>{JSON.stringify(value)}</pre>
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