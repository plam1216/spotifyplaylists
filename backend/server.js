const express = require('express')
const app = express()
const cors = require('cors')

const SpotifyWebApi = require('spotify-web-api-node');

app.use(cors())
app.use(express.json())

app.post('/refresh', (req, res) => {
    console.log('hello')
    const refreshToken = req.body.refreshToken
    
    const spotifyApi = new SpotifyWebApi({
        clientId: '4d7c75f6ead2483abcea126e9b79634b',
        clientSecret: '7e581e5fc3064da781a40cd335881162',
        redirectUri: 'http://localhost:3000',
        refreshToken
    });

    // clientId, clientSecret and refreshToken has been set on the api object previous to this call.
    spotifyApi
        .refreshAccessToken()
        .then((data) => {
            console.log('access token data', data.body);

            res.json({
                accessToken: data.body.accessToken,
                expiresIn: data.body.expiresIn
            })

            // Save the access token so that it's used in future calls
            // spotifyApi.setAccessToken(data.body['access_token']);
        })
        .catch((err) => {
            console.log(err)
            res.sendStatus(400)
        })
})


app.post('/login', (req, res) => {
    const code = req.body.code

    const spotifyApi = new SpotifyWebApi({
        clientId: '4d7c75f6ead2483abcea126e9b79634b',
        clientSecret: '7e581e5fc3064da781a40cd335881162',
        redirectUri: 'http://localhost:3000'
    });

    spotifyApi.authorizationCodeGrant(code).then((data) => {
        res.json({
            expiresIn: data.body.expires_in,
            accessToken: data.body.access_token,
            refreshToken: data.body.refresh_token,
        })
    }).catch((err) => {
        console.log(err)
        res.sendStatus(400)

    })
})

app.listen(3001)
