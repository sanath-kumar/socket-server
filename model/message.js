const mongoose = require('mongoose');
const {Schema} = mongoose;

const MessageSchema = new Schema({
  'handle' : String,
  'message' : String,
  'created' : Date
})

module.exports = mongoose.model('message',MessageSchema);
