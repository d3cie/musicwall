import islogged from '../../../../middleware/islogged'
import Song from '../../../../models/song';
import Album from '../../../../models/album';
import connectDB from '../../../../middleware/mongodb';
import Artist from '../../../../models/artist';

const GetToken = async function () {
    const CLIENT_ID = process.env.CLIENT_ID
    const CLIENT_SECRET = process.env.CLIENT_SECRET

    const result = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await result.json();
    return data.access_token;
}

const getSongsFromSpotify = async (songs, token) => {
    if (!songs.length) {
        return
    }
    const response = await fetch(`https://api.spotify.com/v1/tracks?market=ES&ids=${encodeURI(songs.toString())}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
    });

    if (response.status == 401) {
        return (await response.json())
    }
    const result = await response.json()

    return result.tracks.map((track, i) => {
        if (track == null) {
            return
        }
        return {
            spotifySongID: songs[i],
            // otherAliases: (songs[i]!=track.id)?track.id:null,
            spotifyAlbumID: track.album.id,
            songName: track.name,
            albumName: track.album.name,
            artist: track.artists.map(({ name, id }) => ({ artistsName: name, artistsID: id })),
            albumArt: track.album.images[0].url,
        }
    })

    // result.tracks = result.tracks.filter((track) => (track != null))



}
const getAlbumsFromSpotify = async (albums, token) => {



    if (!albums.length) {
        return
    }
    const response = await fetch(`https://api.spotify.com/v1/albums?market=ES&ids=${encodeURI(albums.toString())}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
    });

    if (response.status == 401) {
        return (await response.json())
    }
    const result = await response.json()


    return result.albums.map((album, i) => {
        if (album == null) {
            return
        }
        return {
            spotifyAlbumID: albums[i],
            albumName: album.name,
            artist: album.artists.map(({ name, id }) => ({ artistsName: name, artistsID: id })),
            albumArt: album.images[0].url,
        }
    })

}
const getArtistsFromSpotify = async (artists, token) => {


    if (!artists.length) {
        return
    }
    const response = await fetch(`https://api.spotify.com/v1/artists?market=ES&ids=${encodeURI(artists.toString())}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
    });

    if (response.status == 401) {
        return (await response.json())
    }
    const result = await response.json()

    return result.artists.map((artist, i) => {
        if (artist == null) {
            return
        }
        return {
            spotifyArtistID: artists[i],
            artistName: artist.name,
            artistImage: artist.images[0].url,
        }
    })
}
const getSongs = async (songs) => {

    if (songs.length) {
        const result = await Song.find({ spotifySongID: { $in: songs } })

        let notfound = []
        if (!result.length) {
            return ({ result, notfound: songs })
        }
        notfound = songs.filter((song) => {

            for (let i = 0; i < result.length; i++) {

                if (result[i].spotifySongID == song) { return false }
            }
            return true
        }
        )
        return ({ result, notfound })
    }
    return ({ result: [], notfound: [] })
}
const getAlbums = async (albums) => {
    if (albums.length) {
        const result = await Album.find({ spotifyAlbumID: { $in: albums } })
        let notfound = []
        if (!result.length) {
            return ({ result, notfound: albums })
        }
        notfound = albums.filter((album) => {
            for (let i = 0; i < result.length; i++) {
                if (result[i].spotifyAlbumID == album) { return false }
            }
            return true
        }
        )
        return ({ result, notfound })
    }
    return ({ result: [], notfound: [] })
}
const getArtists = async (artists) => {
    if (artists.length) {
        const result = await Artist.find({ spotifyArtistID: { $in: artists } })
        let notfound = []

        if (!result.length) {
            return ({ result, notfound: artists })
        }

        notfound = artists.filter((artist) => {
            for (let i = 0; i < result.length; i++) {
                if (result[i].spotifyArtistID == artist) { return false }
            }
            return true
        }
        )
        return ({ result, notfound })
    }
    return ({ result: [], notfound: [] })
}

const handler = async (req, res) => {
    if (req.method === 'POST') {

        const songs = req.body.songs || []
        const albums = req.body.albums || []
        const artists = req.body.artists || []

        var data = { tracks: [], albums: [], artists: [] };

        let token;

        const allPromise = Promise.all([getSongs(songs), getAlbums(albums), getArtists(artists)],)

        allPromise.then(async (values) => {
            data.tracks = values[0].result
            data.albums = values[1].result
            data.artists = values[2].result

            if (values[0].notfound.length || values[1].notfound.length || values[2].notfound.length) {
                token = await GetToken()
            }

            if (values[0].notfound.length) {
                const SongsFromSpotify = await getSongsFromSpotify(values[0].notfound, token)
                data.tracks = data.tracks.concat(SongsFromSpotify)
                Song.insertMany(SongsFromSpotify)
            }
            if (values[1].notfound.length) {
                const AlbumsFromSpotify = await getAlbumsFromSpotify(values[1].notfound, token)
                data.albums = data.albums.concat(AlbumsFromSpotify)
                Album.insertMany(AlbumsFromSpotify)
            }
            if (values[2].notfound.length) {
                const ArtistsFromSpotify = await getArtistsFromSpotify(values[2].notfound, token)
                data.artists = data.artists.concat(ArtistsFromSpotify)
                Artist.insertMany(ArtistsFromSpotify)
            }

            res.send(data);
        })
            .catch((err) => { console.log(err); res.status(500).send({ status: 'error', message: 'Internal' }) })



    } else {
        res.status(422).send('req_method_not_supported');
    }
}

// export default handler
export default connectDB(islogged(handler))


