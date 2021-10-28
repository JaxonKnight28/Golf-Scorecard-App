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
        //gets the front, back, or all 18 holes
        let filteredHoles = []
        //checks if the front 9 were picked and if true gets the first nine
        if (gameInfo['holes'] == 'front') {
            for (let a = 0; a < holeInfo.holes.length - 9; a++) {
                filteredHoles.push(holeInfo.holes[a])
            }
        }
        //checks if the back nine were picked and if true gets those
        else if (gameInfo['holes'] == 'back') {
            for (let a = 9; a < holeInfo.holes.length; a++) {
                filteredHoles.push(holeInfo.holes[a])
            }
        }
        //if not front or back gets all of them
        else {
            for (let a = 0; a < holeInfo.holes.length; a++) {
                filteredHoles.push(holeInfo.holes[a])
            }
        }
        //---------------------------------
        let chosenTeeYards = {};
        for (let a = 0; a < filteredHoles.length; a++) {
            for (let b = 0; b < filteredHoles[a].teeBoxes.length; b++) {
                if (filteredHoles[a].teeBoxes[b].teeType == gameInfo['tee']) {
                    chosenTeeYards[a] = filteredHoles[a].teeBoxes[b].yards
                }

            }
        }
        //console.log(chosenTeeYards);
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
            <tr class="table-dark">
                <th scope="row" id="teeChosen">${gameInfo['tee']}</th>
                <td id="tee0">${chosenTeeYards[0]}</td>
                <td id="tee1">${chosenTeeYards[1]}</td>
                <td id="tee2">${chosenTeeYards[2]}</td>
                <td id="tee3">${chosenTeeYards[3]}</td>
                <td id="tee4">${chosenTeeYards[4]}</td>
                <td id="tee5">${chosenTeeYards[5]}</td>
                <td id="tee6">${chosenTeeYards[6]}</td>
                <td id="tee7">${chosenTeeYards[7]}</td>
                <td id="tee8">${chosenTeeYards[8]}</td>
            </tr>

        </tbody>
    </table>`
        }
    }
}
