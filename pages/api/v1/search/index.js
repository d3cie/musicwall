const sortResponse = (result) => {
    var data = { tracks: {}, albums: {}, artists: {} };

    data.tracks = result.tracks.items.map(({ id, name, album, artists }) => ({
        spotifySongID: id,
        spotifyAlbumID: album.id,
        songName: name,
        albumName: album.name,
        artist: artists.map(({ name, id }) => ({ artistsName: name, artistsID: id })),
        albumArt: album.images[0].url,
    }))


    data.albums = result.albums.items.map(({ id, images, name, total_tracks, release_date, artists }) => (

        {
            spotifyAlbumID: id,
            albumName: name,
            artist: artists.map(({ name, id }) => ({ artistsName: name, artistsID: id })),
            albumArt: images[0].url,
        }

    ))

    data.artists = result.artists.items.map(({ followers, images, id, name }) => (
        (followers.total > 1000) ?
            ({
                spotifyArtistId: id,
                artistName: name,
                artistImage: images[0]?.url,
            })
            : null
    ))
    data.artists = data.artists.filter(function (el) {
        return el != null;
    });

    return data
}

const getSongSearchFromSpotify = async (searchTerm, token) => {
    const limit = 5;
    searchTerm = encodeURI(searchTerm);

    try {
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track%2Cartist%2Calbum&limit=${limit}&market=US`, {
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
        console.log(result)
        return sortResponse(result)

    } catch (err) {
        if (err?.status == 429) {
            return ({ status: 'error', error: 'Too many requests.  Please try again later.' })
        }
        console.log(err);
        return ({ status: 'error', error: 'Internal' })
    }
}



export default function handler(req, res) {
    if (req.method == 'GET') {
        getSongSearchFromSpotify(req.query.q, req.query.token).then((response) => {
            res.send(response);

        })
    }
}