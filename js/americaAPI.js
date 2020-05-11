'use strict';

// when the window loads
// 1. fetch the data from the API 
// 2. add event listeners to the table headers 
// 3. draws chart for cases and deaths with the default state being Alaska
window.onload = function () {
    this.loadData();
    this.addEListners();
    this.drawChart('Cases');
    this.drawChart('Deaths');
}

function loadData() {
    document.getElementById("serverTime").innerHTML = "";
    getAmerica();
    getData();
    updateTime();
}

function americaApi() {
    return fetch("https://covidtracking.com/api/us", requestOptions)
        .then(response => response.json())
        .then(json => json)
        .catch(renderError);
}

async function getAmerica() {
    let usa1 = document.getElementById('usa1');
    let usa2 = document.getElementById('usa2');
    let usa3 = document.getElementById('usa3');

    // remove the values of the elements 
    usa1.innerHTML = "";
    usa2.innerHTML = "";
    usa3.innerHTML = "";

    let americaData = await americaApi();

    // populate the elements with values 
    usa1.innerHTML = numberWithCommas(americaData[0].positive);
    usa2.innerHTML = numberWithCommas(americaData[0].death);
    usa3.innerHTML = numberWithCommas(americaData[0].recovered);
}

function numberWithCommas(x) {
    if (x !== null && !isNaN(x)) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    } else {
        return 'N/A';
    }
}