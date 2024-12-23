const getWallsAndJoin = (walls) => {
    var data = { songs: [], albums: [], artists: [] }
    walls.forEach((wall) => {
        wall.songs.map(
            (song) => { if (!data.songs.includes(song)) { data.songs.push(song) } }
        )
    })
    walls.forEach((wall) => {
        wall.albums.map(
            (album) => { if (!data.albums.includes(album)) { data.albums.push(album) } }
        )
    })
    walls.forEach((wall) => {
        wall.artists.map(
            (artist) => { if (!data.artists.includes(artist)) { data.artists.push(artist) } }
        )
    })
    // console.log(JSON.stringify(data))

    return JSON.stringify(data)
}


const returnWalls = (data, walls) => {
    var newWalls = walls
    walls.map((wall, i) => {
        wall.songs.map((song, j) => {
            newWalls[i].songs[j] = data.tracks.find((obj) => { return obj.spotifySongID == song })
        })
        wall.albums.map((album, j) => {
            newWalls[i].albums[j] = data.albums.find((obj) => { return obj.spotifyAlbumID == album })
        })
        wall.artists.map((artist, j) => {
            newWalls[i].artists[j] = data.artists.find((obj) => { return obj.spotifyArtistID == artist })
        })
    })
    return newWalls
}


export default async function getwalls(walls) {
    const data = getWallsAndJoin(walls)
    try {
        const res = await fetch(`/api/v1/walls/getwall`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: data
            }
        )


        const result = await res.json()
        const resp = returnWalls(await result, walls)
        return resp
    } catch (err) {
        console.log('There has been an error', err)
    }

}








