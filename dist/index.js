"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const game_1 = require("./game");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server);
const game = (0, game_1.createGame)();
game.tick();
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});
app.get('/game', (req, res) => {
    res.sendFile(__dirname + '/game.html');
});
app.use(express_1.default.static('dist'));
io.on('connection', (socket) => {
    game.addPlayer(socket.id, "teste");
    console.log(game);
    socket.on('disconnect', () => {
        game.removePlayer(socket.id);
        console.log(game);
    });
});
server.listen(port, () => {
    console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
