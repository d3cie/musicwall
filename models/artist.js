import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var artist = new Schema({
    spotifyArtistId: {
        type: String,
        required: true,
        unique:true
    },
    artistName: {
        type: String,
        required: true
    },
    artistImage: {
        type: String,
        // required: true
    }


}, { collection: 'artists' });

mongoose.models = {};

var Artist = mongoose.model('Artist', artist);

export default Artist;



