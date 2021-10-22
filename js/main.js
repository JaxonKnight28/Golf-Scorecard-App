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
    console.log(data)
}