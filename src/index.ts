import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import http from 'http'
import { Server } from 'socket.io'
import { createGame } from './game'

dotenv.config()

const app: Express = express()
const port = process.env.PORT
const server = http.createServer(app)
const io = new Server(server)
const game = createGame()
game.tick()

app.get('/', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/index.html')
})

app.get('/game', (req: Request, res: Response) => {
  res.sendFile(__dirname + '/game.html')
})

app.use(express.static('dist'))

io.on('connection', (socket) => {
  game.addPlayer(socket.id, "teste")
  console.log(game)
  socket.on('disconnect', () => {
    game.removePlayer(socket.id)
    console.log(game)
  })
})

server.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`)
})