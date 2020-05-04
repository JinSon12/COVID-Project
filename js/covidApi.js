//TD : get api using jQuery 



var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

// why return must be included here? async and promise textbook check 
function _callApi() {
  return fetch("https://covidtracking.com/api/states/daily", requestOptions)
    .then(response => response.json())
    .then(json => json)
    .catch(error => console.log('error', error));
}

async function _getData() {
  console.log("abe");
  const data = await _callApi()
  console.log("abb")

  // for iterating and adding to the temp array "temp" to table id="states" 
  // backlash for readablility 
  if (data.length > 0) {
    var temp = "\
    <tr> \
    <th>STATE</th> \
    <th>Total Test Results</th> \
    <th>POSITIVE</th> \
    <th>NEGATIVE</th> \
    <th>DEATHS</th> \
    <th>RECOVERED</th> \
    </tr>";

    let maxnum = 56;
    for (let i = 0; i < maxnum; i++) {
      temp += "<tr>";
      temp += "<td onclick=\"chooseState(\'"+ data[i].state +"\')\"><a href='#state-container'>" + data[i].state + "</a></td>";
      temp += "<td>" + data[i].totalTestResults + "</td>";
      temp += "<td>" + data[i].positive + "</td>";
      temp += "<td>" + data[i].negative + "</td>";
      temp += "<td>" + data[i].death + "</td>";
      temp += "<td>" + data[i].recovered + "</td></tr>";
    }
  }

  document.getElementById("tableStates").innerHTML = temp;
}
