let chosenHoles = 'front'
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
    document.getElementById('mainCards').innerHTML = `<table class="table">
    <thead>
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
            <th scope="row" id="teeChosen">(tee)</th>
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



//------------------------------------------
let courseInfo = {}

function load() {

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
        console.log(data.data)
        courseInfo = data.data
        //showDistances(data.data.holes, 'front')
    }

}