import mongoose from 'mongoose';
var Schema = mongoose.Schema;


 var wall = new Schema({

    songs:[{type: String}],
    albums:[{type: String}],
    artists:[{type: String}],
    since: {
        type: Date,
        default: Date.now
      }
})

// var User = mongoose.model('Wall', wall);

export default wall