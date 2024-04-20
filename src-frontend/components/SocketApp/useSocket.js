import ReconnectingWebSocket from 'reconnecting-websocket'
import React, { useEffect } from "react"

export const useSocket = () => {
    let [socket, setSocket] = React.useState(null)
    let [ready, setReady] = React.useState(false)
    useEffect(() => {
        // This is a JavaScript module
        let socketinst = new ReconnectingWebSocket(window.BACKEND_RESOURCES.socket)
        socketinst.onopen = function (e) {
            console.log('[open] Connection established')
            console.log('Sending to server')
        }

        socketinst.onmessage = function ({ data: rawJSON }) {
            let payload = JSON.parse(rawJSON)
            let action = payload.action
            let data = payload.data

            window.dispatchEvent(new CustomEvent('socket:' + action, {
                detail: data
            }))
            // window.dispatchEvent(new CustomEvent('socket:*', {
            //     detail: payload
            // }))

            // console.log(payload)
        }

        setSocket(socketinst)

        return () => {
            socketinst.close()
        }
    }, [])

    return { socket, ready }
}