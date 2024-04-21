import React from "react"

export function AuthGUI({ socket }) {
    let refUsername = React.useRef()
    let refPassword = React.useRef()

    return <>
        {socket && <div>
            <div>
                <input ref={refUsername}></input>
            </div>
            <div>
                <input ref={refPassword}></input>
            </div>

            <button onClick={() => {
                fetch(window.BACKEND_RESOURCES.rest + '/auth', {
                    method: 'POST',
                    mode: 'cors',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        username: refUsername.current.value,
                        password: refPassword.current.value
                    })
                }).then(r => {
                    return r.json()
                }).then(v => {
                    console.log(v)
                })

            }}>Login</button>

            <button onClick={() => {



            }}>Register</button>

        </div>}

    </>
}