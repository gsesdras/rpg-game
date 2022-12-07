"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createGame = void 0;
function createGame() {
    const tickrate = Number(process.env.TICKRATE);
    const game = {
        tickNumber: 0,
        timer: null,
        tick: function () {
            game.tickNumber++;
            console.log(game.tickNumber);
            game.timer = setTimeout(() => {
                game.tick();
            }, 1000 / tickrate);
        },
        players: [],
        addPlayer,
        removePlayer
    };
    function addPlayer(id, username) {
        game.players.push({
            id: id,
            username: username,
            currentMap: 0,
            currentPosition: {
                x: 0,
                y: 0
            }
        });
    }
    function removePlayer(id) {
        function removeValue(player, index, arr) {
            // If the value at the current array index matches the specified value (2)
            if (player.id === id) {
                // Removes the value from the original array
                arr.splice(index, 1);
                return true;
            }
            return false;
        }
        game.players.filter(removeValue);
    }
    return game;
}
exports.createGame = createGame;
