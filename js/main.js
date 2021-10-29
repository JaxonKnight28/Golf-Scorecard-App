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
    //loops through and grabs the same from each input if there is a name there
    for (let i = 0; i < 4; i++) {
        if (document.getElementById(`player${i + 1}`).value !== '') {
            players.push(document.getElementById(`player${i + 1}`).value);
        }
    }
    //assigns the chosen variables
    gameInfo['players'] = players;
    gameInfo['tee'] = chosenTee;
    gameInfo['holes'] = chosenHoles;

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
        let chosenTeeYards = {}
        let chosenTeePars = {};
        console.log(filteredHoles)
        //this loops through each of the chosen holes
        for (let a = 0; a < filteredHoles.length; a++) {
            for (let b = 0; b < filteredHoles[a].teeBoxes.length; b++) {
                if (filteredHoles[a].teeBoxes[b].teeType == gameInfo['tee']) {
                    //gets the yards to each hole and assigns it to a variable
                    chosenTeeYards[a] = filteredHoles[a].teeBoxes[b].yards
                    chosenTeePars[a] = filteredHoles[a].teeBoxes[b].par
                }

            }
        }
        //if only 9 holes were selected, uses this html
        if (gameInfo['holes'] == 'front' || gameInfo['holes'] == 'back') {


            for (let a = 0; a < players.length; a++) {
                document.getElementById(`mainCards${a}`).innerHTML = `<table class="table">
            <thead>
            <div class="h4"></div>
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
                <tr class="table-dark">
                    <th scope="row" id="Par">Par</th>
                    <td id="par0">${chosenTeePars[0]}</td>
                    <td id="par1">${chosenTeePars[1]}</td>
                    <td id="par2">${chosenTeePars[2]}</td>
                    <td id="par3">${chosenTeePars[3]}</td>
                    <td id="par4">${chosenTeePars[4]}</td>
                    <td id="par5">${chosenTeePars[5]}</td>
                    <td id="par6">${chosenTeePars[6]}</td>
                    <td id="par7">${chosenTeePars[7]}</td>
                    <td id="par8">${chosenTeePars[8]}</td>
                    <td id="totalPar">total</td>
                </tr>
                <tr class="table-secondary">
                    <th scope="row" id="scores">${players[a]} scores</th>
                    <td id="score0">score</td>
                    <td id="score1">score</td>
                    <td id="score2">score</td>
                    <td id="score3">score</td>
                    <td id="score4">score</td>
                    <td id="score5">score</td>
                    <td id="score6">score</td>
                    <td id="score7">score</td>
                    <td id="score8">score</td>
                    <td id="total">total</td>
                </tr>

            </tbody>
        </table>`
            }
        }
        //if all 18 holes are selected, uses this html
        else {
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
                <tr class="table-dark">
                    <th scope="row" id="Par">Par</th>
                    <td id="par0">${chosenTeePars[0]}</td>
                    <td id="par1">${chosenTeePars[1]}</td>
                    <td id="par2">${chosenTeePars[2]}</td>
                    <td id="par3">${chosenTeePars[3]}</td>
                    <td id="par4">${chosenTeePars[4]}</td>
                    <td id="par5">${chosenTeePars[5]}</td>
                    <td id="par6">${chosenTeePars[6]}</td>
                    <td id="par7">${chosenTeePars[7]}</td>
                    <td id="par8">${chosenTeePars[8]}</td>
                    <td id="totalPar">total</td>
                </tr>
                <tr class="table-secondary">
                    <th scope="row" id="scores">${players[a]} scores</th>
                    <td id="score0">score</td>
                    <td id="score1">score</td>
                    <td id="score2">score</td>
                    <td id="score3">score</td>
                    <td id="score4">score</td>
                    <td id="score5">score</td>
                    <td id="score6">score</td>
                    <td id="score7">score</td>
                    <td id="score8">score</td>
                </tr>
                <tr id="HoleNums">
                    <th scope="col">Hole</th>
                    <th scope="col">10</th>
                    <th scope="col">11</th>
                    <th scope="col">12</th>
                    <th scope="col">13</th>
                    <th scope="col">14</th>
                    <th scope="col">15</th>
                    <th scope="col">16</th>
                    <th scope="col">17</th>
                    <th scope="col">18</th>
                    <th scope="col">total</th>
                </tr>
                <tr class="table-dark">
                    <th scope="row" id="teeChosen">${gameInfo['tee']}</th>
                    <td id="tee0">${chosenTeeYards[9]}</td>
                    <td id="tee1">${chosenTeeYards[10]}</td>
                    <td id="tee2">${chosenTeeYards[11]}</td>
                    <td id="tee3">${chosenTeeYards[12]}</td>
                    <td id="tee4">${chosenTeeYards[13]}</td>
                    <td id="tee5">${chosenTeeYards[14]}</td>
                    <td id="tee6">${chosenTeeYards[15]}</td>
                    <td id="tee7">${chosenTeeYards[16]}</td>
                    <td id="tee8">${chosenTeeYards[17]}</td>
                </tr>
                <tr class="table-dark">
                    <th scope="row" id="Par">Par</th>
                    <td id="par0">${chosenTeePars[9]}</td>
                    <td id="par1">${chosenTeePars[10]}</td>
                    <td id="par2">${chosenTeePars[11]}</td>
                    <td id="par3">${chosenTeePars[12]}</td>
                    <td id="par4">${chosenTeePars[13]}</td>
                    <td id="par5">${chosenTeePars[14]}</td>
                    <td id="par6">${chosenTeePars[15]}</td>
                    <td id="par7">${chosenTeePars[16]}</td>
                    <td id="par8">${chosenTeePars[17]}</td>
                    <td id="totalPar">total</td>
                </tr>
                <tr class="table-secondary">
                    <th scope="row" id="scores">${players[a]} scores</th>
                    <td id="score0">score</td>
                    <td id="score1">score</td>
                    <td id="score2">score</td>
                    <td id="score3">score</td>
                    <td id="score4">score</td>
                    <td id="score5">score</td>
                    <td id="score6">score</td>
                    <td id="score7">score</td>
                    <td id="score8">score</td>
                    <td id="total">total</td>
                </tr>
            
            </tbody>
            </table>`
            }
        }

    }
}//end of function