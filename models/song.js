import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var artist = new Schema({
    artistsID:{type:String},
    artistsName:{type:String}
})

var song = new Schema({
    spotifySongID: {
        type: String,
        required: true,
        unique:true
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
    artist:[artist],
    albumArt: {
        type: String,
        // required: true
    },


}, { collection: 'songs' });

mongoose.models = {};

var Song = mongoose.model('Song', song);

export default Song;


