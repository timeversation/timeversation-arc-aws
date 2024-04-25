import React, { useRef } from "react"
import { useSocket } from "./useSocket"
import { useEventFromSocket } from "./useEventFromSocket"
import { AuthGUI } from "./AuthGUI"

export function SocketApp() {
    let { socket, ready } = useSocket()
    let playerWalk = useEventFromSocket({ eventName: 'player-walk' })
    let refUsername = useRef()

    return <>
        Ready: {ready ? 'true' : 'false'}

        {/*
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
        */}

        {/* <button className="bg-gray-200 p-3 px-5 mr-3" onClick={() => {
            socket.send(JSON.stringify({
                action: 'auth-action',
                data: {
                    auth: 123
                }
            }))
        }}>Auth Action</button> */}

        <button className="bg-gray-200 p-3 px-5 mr-3" onClick={() => {
            socket.send(JSON.stringify({
                action: 'walk-action',
                data: {
                    happy: 123
                }
            }))

            //
        }}>Walk Action</button>

        <a href={`timeversation://happy`} className="bg-gray-200 p-3 px-5 mr-3" >
            Protocl Launch
            testimony://happy</a>
        {/* <AuthGUI socket={socket}></AuthGUI> */}

        <pre>{JSON.stringify(playerWalk)}</pre>
    </>
}