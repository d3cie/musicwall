import connectDB from '../../../../middleware/mongodb';
import Album from '../../../../models/album';
import Song from '../../../../models/song';

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

        data.tracks = result.tracks.items.map(({id, name, album, artists})=>({
            spotifySongID:id,
            spotifyAlbumID:album.id,
            songName:name, 
            albumName: album.name, 
            artist: artists.map(({name,id})=>({artistsName:name, artistsID:id})),
            albumArt:album.images[0].url,
        }))

        
        data.albums = result.albums.items.map(({id,images, name,total_tracks, release_date, artists})=>(
            
            {     
            spotifyAlbumID:id,
            albumName:name, 
            artist: artists.map(({name,id})=>({artistsName:name, artistsID:id})),
            albumArt:images[0].url,
        }
        
        ))

        data.artists = result.artists.items.map(({followers,images,id, name})=>(
            (followers.total > 1000)?
            ({
            spotifyArtistId:id,
            artistName:name,
            artistImage:images[0]?.url,
            })
            :null
        ))
        data.artists = data.artists.filter(function (el) {
            return el != null;
          });
          
        return data
    }
    

function CacheData(data){
    Song.insertMany(data.tracks)
    Album.insertMany(data.albums)
    
}
export default function handler(req, res) {
    if (req.method == 'GET') {
        const data = getSongSearchFromSpotify(req.query.q, req.query.token).then((response) => {res.send(response);connectDB(CacheData(response))
        
        })
    } 
}