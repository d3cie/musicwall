import islogged from '../../../middleware/islogged'
import Song from '../../../models/song';
import Album from '../../../models/album';
import connectDB from '../../../middleware/mongodb';
import Artist from '../../../models/artist';

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
    if (songs == ''){
        return
    }
    songs = encodeURI(songs);
    const response = await fetch(`https://api.spotify.com/v1/tracks?market=ES&ids=${songs}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
    });

    if (response.status == 401) {
        return (await response.json())
    }
    const result = await response.json()
    result.tracks = result.tracks.filter((track) => (track != null))

    return result.tracks.map(({ id, name, album, artists }) => ({
        spotifySongID: id,
        spotifyAlbumID: album.id,
        songName: name,
        albumName: album.name,
        artist: artists.map(({ name, id }) => ({ artistsName: name, artistsID: id })),
        albumArt: album.images[0].url,
    }))
}
const getAlbumsFromSpotify = async (albums, token) => {
  
    albums = encodeURI(albums);

    if (albums == ''){
        return
    }
    const response = await fetch(`https://api.spotify.com/v1/albums?market=ES&ids=${albums}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
    });

    if (response.status == 401) {
        return (await response.json())
    }
    const result = await response.json()
    
    result.albums = result.albums.filter((album) => (album != null))

    return result.albums.map(({ id, name, artists,images }) => ({
        spotifyAlbumID: id,
        albumName:name,
        artist: artists.map(({ name, id }) => ({ artistsName: name, artistsID: id })),
        albumArt:images[0].url,
    }))
}
const getArtistsFromSpotify = async (artists, token) => {
  
    artists = encodeURI(artists);

    if (artists == ''){
        return
    }
    const response = await fetch(`https://api.spotify.com/v1/artists?market=ES&ids=${artists}`, {
        method: 'GET',
        headers: { 'Authorization': 'Bearer ' + token },
    });

    if (response.status == 401) {
        return (await response.json())
    }
    const result = await response.json()
    result.artists = result.artists.filter((artist) => (artist != null))
   

    return result.artists.map(({ id, name,images }) => ({
        spotifyArtistID: id,
        artistName:name,
        artistImage:images[0].url,
    }))
}
const getSongs = async (songs) => {
    const result = await Song.find({ spotifySongID: { $in: songs } })
    let notfound = []
    notfound = songs.filter((song) => {
        for (let i = 0; i < result.length; i++) {
            if (result[i].spotifySongID == song) { return false }
        }
        return true
    }
    )
    return ({ result, notfound })
}
const getAlbums = async (albums) => {
    
    const result = await Album.find({ spotifyAlbumID: { $in: albums } })
    let notfound = []

     notfound = albums.filter((album) => {
        for (let i = 0; i < result.length; i++) {
            if (result[i].spotifyAlbumID == album) { return false }
        }
        return true
    }
    )
    return ({ result, notfound })
}
const getArtists = async (artists) => {
    const result = await Artist.find({ spotifyArtistID: { $in: artists } })
    let notfound = []
    notfound = artists.filter((artist) => {
        for (let i = 0; i < result.length; i++) {
            if (result[i].spotifyArtistID == artist) { return false }
        }
        return true
    }
    )
    return ({ result, notfound })
}

const handler = async (req, res) => {
    if (req.method === 'POST') {
        const songs = req.body.songs
        let token;
        const albums = req.body.albums
        const artists = req.body.artists
        var data = { tracks: [], albums: [], artists: [] };

        const allPromise = Promise.all([getSongs(songs), getAlbums(albums), getArtists(artists)],)

        allPromise.then(async (values) => {
            data.tracks = values[0].result
            data.albums = values[1].result
            data.artists = values[2].result

            if (values[0].notfound.length || values[1].notfound.length || values[2].notfound.length){//or ||
                token = await GetToken()
            }

            if (values[0].notfound.length) {
                const SongsFromSpotify = await getSongsFromSpotify(values[0].notfound.toString(), token)
                data.tracks.push(SongsFromSpotify)
                Song.insertMany(SongsFromSpotify)
            }
            if (values[1].notfound.length) {
                const AlbumsFromSpotify = await getAlbumsFromSpotify(values[1].notfound.toString(), token)
                data.albums.push(AlbumsFromSpotify)
                Album.insertMany(AlbumsFromSpotify)
            }
            if (values[2].notfound.length) {
                const ArtistsFromSpotify = await getArtistsFromSpotify(values[2].notfound.toString(), token)
                data.artists.push(ArtistsFromSpotify)
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


