import ReconnectingWebSocket from 'reconnecting-websocket'
import React, { useEffect } from "react"

export const useSocket = () => {
    let [socket, setSocket] = React.useState(null)
    let [socketReady, setSocketReady] = React.useState(false)
    useEffect(() => {
        let inst = new ReconnectingWebSocket(window.BACKEND_RESOURCES.socket)
        inst.onopen = function (e) {
            console.log('[open] Connection established')
            setSocketReady(true)
        }

        inst.onmessage = function ({ data: rawJSON }) {
            let payload = JSON.parse(rawJSON)
            let action = payload.action
            let data = payload.data

            window.dispatchEvent(new CustomEvent('socket:' + action, {
                detail: data
            }))
        }

        setSocket(inst)

        return () => {
            inst.close()
        }
    }, [])

    return {
        socket: socketReady ? socket : null,
    }
}