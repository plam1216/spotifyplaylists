import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'


const useAuth = (code) => {
    const [accessToken, setAccessToken] = useState()
    const [refreshToken, setRefreshToken] = useState()
    const [expiresIn, setExpiresIn] = useState()

    // login
    useEffect(() => {
        axios
            .post('http://localhost:3001/login', {
                code,
            })
            .then(res => {
                console.log(res.data)

                setAccessToken(res.data.accessToken)
                setRefreshToken(res.data.refreshToken)
                setExpiresIn(res.data.expiresIn)

                // removes extra info after "/" in the url
                // not neccessary, used to keep URL clean
                window.history.pushState({}, null, '/')
            })
            .catch(() => {
                // redirect the user back to the login page if there is an error logging in 
                window.location = '/'
            })
        // useEffect will run every time 'code' changes
    }, [code])



    // refreshToken
    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
            axios
                .post('http://localhost:3001/refresh', {
                    refreshToken,
                })
                .then(res => {
                    console.log(res.data)

                    setAccessToken(res.data.accessToken)
                    setExpiresIn(res.data.expiresIn)
                })
                .catch(() => {
                    // redirect the user back to the login page if there is an error logging in 
                    window.location = '/'
                })
        }, (expiresIn - 60) * 1000)

        return () => clearInterval(interval)
    }, [refreshToken, expiresIn])

    // accessToken needed to call from Spotify API
    // only lasts 1 hr, refresh token is used so user doesn't have to keep logging in
    return accessToken
}

export default useAuth