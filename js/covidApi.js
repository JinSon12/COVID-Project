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
    .catch(error => console.log('error', error));
}

// gets data from API and creates a table
async function getData() {
  data = await callApi();
  data = data.slice(0, 56);
  console.log(data);
  createTable(data);
  return data;
}


function createTable(data) {

  // for iterating and adding to the temp array "temp" to table id="tableStates" 
  // backlash for readablility 
  let temp = [];
  //   "\
  //  <tr> \
  //  <th class=\"table-state\">STATE</th> \
  //  <th class=\"data\" id=\"totresult\">Total <br> Test Results</th> \
  //  <th class=\"data\" id=\"pos\">POSITIVE</th> \
  //  <th class=\"data\" id=\"neg\">NEGATIVE</th> \
  //  <th class=\"data\" id=\"deaths\">DEATHS</th> \
  //  <th class=\"data\" id=\"recov\">RECOVERED</th> \
  //  <th class=\"data\" id=\"dpratio\">DEATHS <br> / POSITIVE</th> \
  //  </tr>";

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

// console.log(data);


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
