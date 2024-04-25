import React, { useEffect } from "react"

export const useEventFromSocket = ({ eventName = 'yohappy' }) => {
    let [eventValue, setEventValue] = React.useState(undefined)
    useEffect(() => {
        let handler = ({ detail }) => {
            setEventValue(detail)
        }
        window.addEventListener('socket:' + eventName, handler)
        return () => {
            window.removeEventListener('socket:' + eventName, handler)
        }
    }, [eventName, window])

    return eventValue
}

