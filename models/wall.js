import mongoose from 'mongoose';
var Schema = mongoose.Schema;


var like = new Schema({
  username: {
    type: String,
    unique: true
  },
  since: {
    type: Date,
    default: Date.now
  },

})

var wall = new Schema({
  likes: [like],
  songs: [{ type: String }],
  albums: [{ type: String }],
  artists: [{ type: String }],
  since: {
    type: Date,
    default: Date.now
  }
})

// var User = mongoose.model('Wall', wall);

export default wall