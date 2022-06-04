// app.get('/callback', function (req, res) {

//     var code = req.query.code || null;

//     var authOptions = {
//         url: 'https://accounts.spotify.com/api/token',
//         form: {
//             code: code,
//             redirect_uri: redirect_uri,
//             grant_type: 'authorization_code'
//         },
//         headers: {
//             'Authorization': 'Basic ' + (new Buffer(client_id + ':' + client_secret).toString('base64'))
//         },
//         json: true
//     };

// });


const GetToken = async function (code, redirect_uri) {
    const CLIENT_ID = process.env.CLIENT_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET

    const result = await fetch(`https://accounts.spotify.com/api/token?redirect_uri=${encodeURI(redirect_uri)}&grant_type=authorization_code&code=${code}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        },
        // form: {
        //     code: code,
        //     redirect_uri: redirect_uri,
        //     grant_type: 'authorization_code'
        // },
        json: true
    });

    const data = await result.json();
    console.log(data)
    return data;
}




export default function handler(req, res) {

    GetToken(req.query.code, 'http://localhost:3000/api/v1/callbackforspotif')
        .then((TOKEN) => {

            res.redirect(`/?token=${TOKEN.access_token}`)
            res.send(TOKEN); console.log(TOKEN); res.status(200)
        })


}

