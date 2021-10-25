var chosenHoles = 'front'
let players = []
let gameInfo = {}
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
    window.location.href = "./cards.html"
}

//--------------------------------
const api_url = 'https://golf-courses-api.herokuapp.com/courses/11819';
async function getApi(url) {
    const response = await fetch(url);

    let data = await response.json();

    return data
}
let retrievedData = getApi(api_url);
retrievedData.then(info => {
    processData(info)
});

function processData(data) {
    //console.log(data.data.holes[0].teeBoxes)
    showDistances(data.data.holes, 'front')
}

function showDistances(data, fob) {
    //pick the holes selected: front, back or all
    let holesSelected = []
    if (fob == 'front') {
        for (a = 0; a < data.length - 9; a++) {
            holesSelected.push(data[a])
        }
    }
    else if (fob == 'back') {
        for (a = 9; a < data.length; a++) {
            holesSelected.push(data[a])
        }
    }
    else {
        for (a = 0; a < data.length; a++) {
            holesSelected.push(data[a])
        }
    }
    //loop through the holes selected and show the values
    let count = 0
    for (let b = 0; b < holesSelected.length; b++) {
        //console.log(holesSelected[b])
        for (let c = 0; c < holesSelected[b].teeBoxes.length; c++) {
            //console.log(holesSelected[b].teeBoxes[c].teeType + count);
            document.getElementById(`${holesSelected[b].teeBoxes[c].teeType}${count}`).innerText = holesSelected[b].teeBoxes[c].yards
        }
        count += 1
    }

}