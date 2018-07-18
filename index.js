const express  = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const socket = require('socket.io')
const cors = require('cors')
const keys = require('./config/keys')
const message = require('./model/message')

const app = new express()
app.use(bodyParser.json())
app.use(cors())

mongoose.connect(keys.mongoURI);
mongoose.connection.on('error',()=>{
  console.log("Error in database connection")
})
mongoose.connection.once('open',function(){
  console.log("DB connection established")
})


app.get('/chat', async (req,res) => {
  let result = await message.find()
  res.send(result);
})

var server = app.listen(5000,()=>{
  console.log("Howdy, I am running at PORT 5000")
})

let io =  socket(server);

io.on("connection", function(socket){
  console.log("Socket Connection Established with ID :"+ socket.id)
  socket.on("chat", async function(chat){
    chat.created = new Date()
    let response = await new message(chat).save()
    socket.emit("chat",chat)
  })
})
