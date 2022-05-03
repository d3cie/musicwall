const getSongSearchFromSpotify = async (searchTerm,token) => {
        const limit = 5;
        searchTerm = encodeURI(searchTerm);
        const response = await fetch(`https://api.spotify.com/v1/search?q=${searchTerm}&type=track%2Cartist%2Calbum&limit=${limit}&market=US`, {
            method: 'GET',
            headers: { 'Authorization' : 'Bearer ' + token },
        });
        // result = await result.json();
        console.log(response.status);

        if (response.status == 401){
            return (await response.json())
        }
        const result = await response.json()
        console.log(result);
    
        var data = {tracks:{} ,albums:{} ,artists: {}};
        data.tracks = result.tracks.items.map(({id, name, album, artists, preview_url})=>({
            spotifySongID:id,
            spotifyAlbumID:album.id,
            songName:name, 
            albumName: album.name, 
            artist: artists.map(({name,id})=>({artistsName:name, artistsID:id})),
            albumArt:album.images[0].url,
            albumThumbnail:album.images[1].url,
            songPreview:preview_url,
            albumType:album.album_type
        }))

        data.albums = result.albums.items.map(({id,images, name,total_tracks, release_date, artists, preview_url})=>(
            
            {
                
            spotifyAlbumID:id,
            releaseDate:release_date,
            totalTracks:total_tracks,
            albumName:name, 
            artist: artists.map(({name,id})=>({artistsName:name, artistsID:id})),
            albumArt:images[0].url,
            albumThumbnail:images[1].url,
            songPreview:preview_url,
        }
        
        ))

        data.artists = result.artists.items.map(({followers,images,genres, id, name})=>(
            (followers.total > 1000)?
            ({spotifyFollowers:followers.total,
            genres:genres,
            spotifyArtistId:id,
            artistName:name,
            artistImage:images[0]?.url,
            artistThumbnail:images[1]?.url,})
            :null
        ))
        // data.artists = data.artists.filter(null)
        data.artists = data.artists.filter(function (el) {
            return el != null;
          });
          
        console.log(result)
        return data
    }
    
export default function handler(req, res) {
    if (req.method == 'GET') {
        getSongSearchFromSpotify(req.query.q, req.query.token).then((response) => {res.send(response)
        })
    } 
}