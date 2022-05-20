import mongoose from 'mongoose';
import wall from './wall'
var Schema = mongoose.Schema;

var pin = new Schema({
  username: {
    type: String,
  },
  since: {
    type: Date,
    default: Date.now
  },
  
})
var profileinfo = new Schema({
  displayname:{type: String},
  birthday:{type:Date},
  bio:{type: String},
  countrycode:{type: String},
  profileimage:{type: String}
})

var user = new Schema({
  username: {
    type: String,
    unique: true,
    required: true
  },
  pins: [pin],
  pinnedby: [pin],
  email: {
    type: String,
    required: true
  },
  passwordhash: {
    type: String,
    required: true
  },
  profileinfo:profileinfo,
  walls:[wall],
  since: {
    type: Date,
    default: Date.now
  }
},	{ collection: 'users' });

mongoose.models = {};

var User = mongoose.model('User', user);

export default User;



