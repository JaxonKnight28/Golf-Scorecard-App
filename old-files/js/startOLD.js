var chosenHoles = 'front'
let players = []
var gameInfo = {}
function changeHoles(selected) {
    chosenHoles = selected
}

function start() {
    players = []
    for (let i = 0; i < 4; i++) {
        if (document.getElementById(`player${i + 1}`).value !== '') {
            players.push(document.getElementById(`player${i + 1}`).value)
        }
    }
    gameInfo['players'] = players
    gameInfo['type'] = chosenHoles
    console.log(gameInfo)
    window.location.href = "./cards.html"
}