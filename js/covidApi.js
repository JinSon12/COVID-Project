//TD : get api using jQuery 



var requestOptions = {
  method: 'GET',
  redirect: 'follow'
};

// why return must be included here? async and promise textbook check 
function _callApi() {
  return fetch("https://covidtracking.com/api/states", requestOptions)
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

    for (let obj of data) {
      temp += "<tr>";
      temp += "<td>" + obj.state + "</td>";
      temp += "<td>" + obj.totalTestResults + "</td>";
      temp += "<td>" + obj.positive + "</td>";
      temp += "<td>" + obj.negative + "</td>";
      temp += "<td>" + obj.death + "</td>";
      temp += "<td>" + obj.recovered + "</td></tr>";
    }
  }

  document.getElementById("states").innerHTML = temp;
  console.log(data);

}
