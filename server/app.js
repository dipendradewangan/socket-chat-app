import express from 'express'
import { createServer } from "http";
import { Server } from "socket.io";

const port = 3000;
const app = express();
const server = createServer(app)
const messageArray = []

const io = new Server(server, {
    cors: {
        origin: 'http://localhost:5173',
        methods: ['GET', 'POST'],
        credentials: true
    }
})


app.get('/', (req, res) => {
    res.send('Hello world! this is socket server...')
})


io.on('connection', (socket) => {
    console.log(`${socket.id} connected`)


    socket.on('message', (data) => {
        messageArray.push({id : socket.id, message : data})
        socket.broadcast.emit('receive-msg', messageArray)
    })

    socket.on('disconnect', () => {
        console.log(`${socket.id} disconnected`);
    })

})

server.listen(3000, () => {
    console.log(`Server is listening on ${port}`);
})