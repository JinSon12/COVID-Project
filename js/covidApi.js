'use strict';

let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

let data;

function callApi() {
  return fetch("https://covidtracking.com/api/states/daily", requestOptions)
    .then(response => response.json())
    .then(json => json)
    .catch(renderError);
}


// gets data from API and creates a table
async function getData() {
  data = await callApi();

  data = data.slice(0, 56);
  createTable(data);
  return data;
}


// gets the err from callApi() and renders it on screen above the table 
function renderError(err) {
  let error = document.querySelector(".error");
  console.log(err.message);
  let errorP = document.createElement("P");
  errorP.classList.add("alert", "alert-danger");
  errorP.innerHTML = err.message;
  error.appendChild(errorP);
}


// updates the time
function updateTime() {
  let d = new Date();
  setTimeout(function () { document.getElementById("serverTime").innerHTML = d; 900 });
}


// creates table using the data fetched by the API 
function createTable(data) {
  document.getElementById("tbody").innerHTML = "";
  let temp = [];
  if (data.length > 0) {
    let maxnum = 56;
    temp += "<tbody id=\"added-data\">";
    for (let i = 0; i < maxnum; i++) {
      let stateName = stateCodes[data[i].state];
      temp += "<tr onclick=location.href=\'#state-container\'\;chooseState(\'" + data[i].state + "\')>";
      temp += "<td class=\"table-state\">" + stateName + "</td>";
      temp += "<td class=\"data\">" + numberWithCommas(data[i].totalTestResults) + "</td>";
      temp += "<td class=\"data\">" + numberWithCommas(data[i].positive) + "</td>";
      temp += "<td class=\"data\">" + numberWithCommas(data[i].negative) + "</td>";
      temp += "<td class=\"data\">" + numberWithCommas(data[i].death) + "</td>";
      temp += "<td class=\"data\">" + numberWithCommas(data[i].recovered) + "</td>";
      temp += "<td class=\"data\">" + numberWithCommas((data[i].death / data[i].positive * 100).toFixed(1)) + "</td></a></tr>";
    }
    temp += "</tbody>";
  }
  document.getElementById("tbody").innerHTML = temp;
}


// search function 
function search() {
  let inputval = document.getElementById("search").value.toLowerCase();
  let table = document.getElementById("tableStates");
  let tableRow = table.getElementsByTagName("tr");

  for (let i = 1; i < tableRow.length; i++) {
    let tdata = tableRow[i].cells[0].textContent.toLowerCase();
    if (tdata.includes(inputval)) {
      tableRow[i].style.display = "";
    } else {
      tableRow[i].style.display = "none";
    }
  }
}


// sorting function
// initial value of the sort = desc
let order = "desc";
function sortTable(value) {
  let copiedData = data.slice(0);

  function compareFunction(value) {
    return function (a, b) {
      if (order === "asc") {
        return a[value] - b[value];
      } else if (order === "desc") {
        return b[value] - a[value];
      }
    }
  }
  let sortedData = copiedData.sort(compareFunction(value));
  order === "desc" ? order = "asc" : order = "desc";

  createTable(sortedData);
}
