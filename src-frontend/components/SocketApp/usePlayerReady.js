import { useEffect } from "react"

export function usePlayerReady({ socket }) {
    let playerReady = useEventFromSocket({ eventName: 'player-ready' })

    useEffect(() => {
        // if (socket) {
        //     socket.send(JSON.stringify({
        //         action: 'player-ready',
        //         data: {
        //             ready: true
        //         }
        //     }))
        // }
    }, [])

    return { playerReady }
} 