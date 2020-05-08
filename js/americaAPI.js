window.onload = function() {
    this._getAmerica();
}


function _americaApi() {
    return fetch("https://covidtracking.com/api/us", requestOptions)
      .then(response => response.json())
      .then(json => json)
      .catch(error => console.log('error', error));
}

async function _getAmerica() {
    let americaData = await _americaApi();
    document.getElementById('usa1').innerHTML = numberWithCommas(americaData[0].positive);
    document.getElementById('usa2').innerHTML = numberWithCommas(americaData[0].death);
    document.getElementById('usa3').innerHTML = numberWithCommas(americaData[0].recovered);
}

function numberWithCommas(x) {
    if (x != null) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return 'N/A';
    }
}