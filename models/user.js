import mongoose from 'mongoose';
var Schema = mongoose.Schema;

var user = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  passwordhash: {
    type: String,
    required: true
  },
  since: {
    type: Date,
    default: Date.now
  }
}, 	{ collection: 'users' });

mongoose.models = {};

var User = mongoose.model('User', user);

export default User;

