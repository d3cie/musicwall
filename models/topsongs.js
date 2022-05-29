import mongoose from 'mongoose';
var Schema = mongoose.Schema;



var topsongs = new Schema({
    songs: [],
    since: {
        type: Date,
        default: Date.now
    }
},
    { collection: 'topsongs' }
)

var TopSongs = mongoose.model('TopSongs', topsongs);

export default TopSongs;