import authorization from '../../../../middleware/islogged';
import islogged from '../../../../middleware/islogged'
import connectDB from '../../../../middleware/mongodb';
import TopSongs from '../../../../models/topsongs'

const REFRESH_AFTER_MS = 86400000

const getToken = async function () {
    const CLIENT_ID = process.env.CLIENT_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + new Buffer(CLIENT_ID + ':' + CLIENT_SECRET).toString('base64')
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

const sortResponse = (result) => {

    return result.items.map(({ track }) => ({
        spotifySongID: track.id,
        spotifyAlbumID: track.album.id,
        songName: track.name,
        albumName: track.album.name,
        artist: track.artists.map(({ name, id }) => ({ artistsName: name, artistsID: id })),
        albumArt: track.album.images[0].url,
    }))


}

const getTopSongsFromSpotify = async (token) => {
    const limit = 5;
    try {
        const response = await fetch(`https://api.spotify.com/v1/playlists/37i9dQZF1DXcBWIGoYBM5M/tracks?market=es&limit=${limit}`, {
            method: 'GET',
            headers: { 'Authorization': 'Bearer ' + token },
        });

        const result = await response.json()

        if (response.status == 401) {
            return ({ status: 'error', error: 'Invalid access token' })
        }
        if (response.status == 400) {
            throw new Error(result)
        }
        if (response.status == 429) {
            throw new Error(result)
        }
        return sortResponse(result)

    } catch (err) {
        if (err?.status == 429) {
            return ({ status: 'error', error: 'Too many requests.  Please try again later.' })
        }
        console.log(err);
        return ({ status: 'error', error: 'Internal' })
    }

}

const getTopSongs = async () => {
    const result = await TopSongs.find().sort({ since: -1 }).limit(1)
    if (result) {
        if ((Date.now() - Date.parse(result[0]?.since)) < REFRESH_AFTER_MS) {
            return { songs: result[0].songs }
        }
    }

    const TOKEN = await getToken()
    const resultFromSpotify = await getTopSongsFromSpotify(TOKEN)
    TopSongs.create({ songs: resultFromSpotify }).catch((error) => {
        if (error.code === 11000) {
            console.log('Duplicate Record err')
        }
        else {
            console.log(error)
        }
    })
    return { songs: resultFromSpotify }
}



async function handler(req, res) {
    if (req.method == 'GET') {
        const Result = await getTopSongs()
        res.send(Result)
    } else {
        res.status(422).send('req_method_not_supported');
    }
}


export default connectDB(authorization(handler))
