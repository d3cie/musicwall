import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var artist = new Schema({
    artistsID: { type: String },
    artistsName: { type: String }
})

var topsong = new Schema({
    spotifySongID: {
        type: String,
        required: true,
        unique: true
    },
    spotifyAlbumID: {
        type: String,
        required: true
    },
    songName: {
        type: String,
        required: true
    },
    albumName: {
        type: String,
        required: true
    },
    artist: [artist],
    albumArt: {
        type: String,
    },


})

var topsongs = new Schema({
    songs: [topsong],
    since: {
        type: Date,
        default: Date.now
    }
},
    { collection: 'topsongs' }
)

mongoose.models = {};

var TopSongs = mongoose.model('topsongs', topsongs);

export default TopSongs;


