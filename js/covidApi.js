//TD : get api using jQuery 


let requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

let tableData = [];

// why return must be included here? async and promise textbook check 
function _callApi() {
  return fetch("https://covidtracking.com/api/states/daily", requestOptions)
    .then(response => response.json())
    .then(json => json)
    .catch(error => console.log('error', error));
}

// creates a table 
async function _getData() {
  console.log("getData async function");
  const data = await _callApi()
  console.log("called API")

  // for iterating and adding to the temp array "temp" to table id="tableStates" 
  // backlash for readablility 
  let temp = "\
  <tr> \
  <th>STATE</th> \
  <th>Total Test Results</th> \
  <th>POSITIVE</th> \
  <th>NEGATIVE</th> \
  <th>DEATHS</th> \
  <th>RECOVERED</th> \
  </tr>";

  if (data.length > 0) {
    //chooseState(\'" + data[i].state + "\')
    let maxnum = 56;
    for (let i = 0; i < maxnum; i++) {
      temp += "<tr onclick=location.href=\'#state-container\'\;chooseState(\'" + data[i].state + "\')>";
      temp += "<td>" + data[i].state + "</td>";
      temp += "<td>" + data[i].totalTestResults + "</td>";
      temp += "<td>" + data[i].positive + "</td>";
      temp += "<td>" + data[i].negative + "</td>";
      temp += "<td>" + data[i].death + "</td>";
      temp += "<td>" + data[i].recovered + "</td></a></tr>";
      tableData.push(data[i].state);
    }
  }

  document.getElementById("tableStates").innerHTML = temp;
}

// search function 
function search() {
  let inputval = document.getElementById("search").value.toUpperCase();
  let table = document.getElementById("tableStates");
  let tableRow = table.getElementsByTagName("tr");

  for (let i = 1; i < tableRow.length; i++) {
    let tdata = tableRow[i].cells[0].innerHTML;
    if (tdata.includes(inputval)) {
      tableRow[i].style.display = "";
    } else {
      tableRow[i].style.display = "none";
    }
  }








}

