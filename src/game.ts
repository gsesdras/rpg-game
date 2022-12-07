interface Game {
    tickNumber: number,
    timer: NodeJS.Timeout | null,
    tick: Function,
    players: Array<Player>,
    addPlayer: Function,
    removePlayer: Function
}

interface Player {
    id: string,
    username: string,
    currentMap: number,
    currentPosition: Position
} 

interface Position {
    x: number,
    y: number
}

export function createGame() {
    const tickrate = Number(process.env.TICKRATE)

    const game: Game = {
        tickNumber: 0,
        timer: null,
        tick: function () {
            game.tickNumber++;
            console.log(game.tickNumber)
            game.timer = setTimeout(() => {
                game.tick()
            }, 1000 / tickrate);
        },
        players: [],
        addPlayer,
        removePlayer
    }

    function addPlayer(id: string, username: string) {
        game.players.push(
            {
                id: id,
                username: username,
                currentMap: 0,
                currentPosition: {
                    x: 0,
                    y: 0
                }
            }
        )
    }

    function removePlayer(id: string) {
        
        function removeValue(player: Player, index: number, arr: Array<any>) {
            if (player.id === id) {
                arr.splice(index, 1);
                return true;
            }
            return false;
        }

        game.players.filter(removeValue);
    }

    return game
}