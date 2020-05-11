'use strict';

window.onload = function () {
    this.loadData();
    this.addEListners();
}

function loadData() {
    document.getElementById("serverTime").innerHTML = "";
    getAmerica();
    getData();

    // updating the date and checking that the refresh button is working 
    console.log("fetched data");
    let d = new Date();
    setTimeout(function () { document.getElementById("serverTime").innerHTML = d; 900 });
}

function americaApi() {
    return fetch("https://covidtracking.com/api/us", requestOptions)
        .then(response => response.json())
        .then(json => json)
        .catch(error => console.log('error', error));
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