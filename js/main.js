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
    if (fob == 'front') {
        for (a = 0; a < data.length - 9; a++) {
            console.log(data[a])
        }
    }
    else if (fob == 'back') {
        for (a = 8; a < data.length; a++) {
            console.log(data[a])
        }
    }
    else {
        for (a = 0; a < data.length; a++) {
            console.log(data[a])
        }
    }
    //console.log(data)
}