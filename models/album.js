import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var artist = new Schema({
    artistsID:{type:String},
    artistsName:{type:String}
})

var album = new Schema({
    spotifyAlbumID: {
        type: String,
        required: true,
        unique:true
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


}, { collection: 'albums' });

mongoose.models = {};

var Album = mongoose.model('Album', album);

export default Album;



