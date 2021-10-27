let chosenHoles = 'front';
let chosenTee = 'champion';
let players = [];
var gameInfo = {};
var DATA;

function changeTee(selected) {
    chosenTee = selected;
}
function changeHoles(selected) {
    chosenHoles = selected;
}
//runs after the start button is pressed-------------------------------

function start() {
    //creates a list of players from the input
    players = [];

    for (let i = 0; i < 4; i++) {
        if (document.getElementById(`player${i + 1}`).value !== '') {
            players.push(document.getElementById(`player${i + 1}`).value);
        }
    }
    //assigns the chosen variables
    gameInfo['players'] = players;
    gameInfo['tee'] = chosenTee;
    gameInfo['holes'] = chosenHoles;
    //console.log(gameInfo)

    //-------- This is the API Request
    function listener() {
        DATA = JSON.parse(this.responseText).data;
        loadCards(DATA);
    }
    var RequestAPI = new XMLHttpRequest();
    RequestAPI.addEventListener('load', listener);
    RequestAPI.open('GET', 'https://golf-courses-api.herokuapp.com/courses/11819');
    RequestAPI.send();
    //--------

    //loops through and creates the cards for each player
    function loadCards(holeInfo) {
        let chosenTeeYards = {};
        for (let a = 0; a < holeInfo.holes.length; a++) {
            for (let b = 0; b < holeInfo.holes[a].teeBoxes.length; b++) {
                if (holeInfo.holes[a].teeBoxes[b].teeType == gameInfo['tee']) {
                    chosenTeeYards[a] = holeInfo.holes[a].teeBoxes[b].yards
                }

            }
        }
        console.log(chosenTeeYards);
        for (let a = 0; a < players.length; a++) {
            document.getElementById(`mainCards${a}`).innerHTML = `<table class="table">
        <thead>
        <div class="h4">${players[a]}</div>
            <tr id="HoleNums">
                <th scope="col">Hole</th>
                <th scope="col">1</th>
                <th scope="col">2</th>
                <th scope="col">3</th>
                <th scope="col">4</th>
                <th scope="col">5</th>
                <th scope="col">6</th>
                <th scope="col">7</th>
                <th scope="col">8</th>
                <th scope="col">9</th>
                <th scope="col">total</th>
            </tr>
        </thead>
        <tbody>
            <tr id="proRow" class="table-dark">
                <th scope="row" id="teeChosen">${gameInfo['tee']}</th>
                <td id="tee0">tee</td>
                <td id="tee1">tee</td>
                <td id="tee2">tee</td>
                <td id="tee3">tee</td>
                <td id="tee4">tee</td>
                <td id="tee5">tee</td>
                <td id="tee6">tee</td>
                <td id="tee7">tee</td>
                <td id="tee8">tee</td>
            </tr>

        </tbody>
    </table>`
        }
    }
}
