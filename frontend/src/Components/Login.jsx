import React from 'react'

const Login = () => {
    // REFERENCE DOCS FOR AUTHORIZATION
    // https://developer.spotify.com/documentation/general/guides/authorization/code-flow/

    const AUTH_URL = "https://accounts.spotify.com/authorize?client_id=4d7c75f6ead2483abcea126e9b79634b&response_type=code&redirect_uri=http://localhost:3000&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state"

    return (
        <div>
            <a className="btn btn-success btn-large" href={AUTH_URL}>Login with Spotify</a>
        </div>
    )
}

export default Login