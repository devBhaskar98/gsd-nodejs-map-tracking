const express = require('express');
const socketio = require("socket.io");
const http = require("http");
const path = require("path")

const app = express();

const server = http.createServer(app);
const io = socketio(server);

io.on("connection", function(socket) {
    socket.on("send-location", function(data) {
        io.emit("receive-location", {id: socket.id, ...data})
    });
    socket.on("disconnect", function() {
        io.emit("user-disconnected", socket.id);
    })
})



app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")))


app.get('/', function(req,res) {
    res.render("index");
})

server.listen(3000)

console.log("app is started on port:3000")

