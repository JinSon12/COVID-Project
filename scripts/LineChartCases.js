google.charts.load('current', { packages: ['line'] });

function getRange() {
    let value = document.getElementById('chart-slider').value;
    let range = 1679 - value * 55; // 1679 represents 30 days ago from today. There are approx. 55 inserts for each day
    return range;
}

function _dailyAPI() {
  return fetch('https://covidtracking.com/api/states/daily')
    .then(response => response.json())
    .then(json => json)
    .catch(error => console.log('error', error));
}

async function drawChart(type) {
    let data = await _dailyAPI();
    
    var arrCases = [['Date', type]]; // assign column names

    for (let i = getRange(); i >= 0; i--) {   // User value represents chart range
      if (data[i].state == getAbbrev()) {   // User value represents state info
          let date = data[i].date.toString();
          let newDate = date.substring(4,6) + '-' + date.substring(6, 9);
          if (type == 'Cases') {
            arrCases.push([newDate, data[i].total]);
          } else {
            arrCases.push([newDate, data[i].death]);
          }
      }
    }

    let chartWidth;
    if (window.innerWidth <= 600) {
      chartWidth = 350;
    } else {
        chartWidth = 500;
    }

    let chartColor;
    if (type == 'Cases') {
      chartColor = 'royalblue';
    } else {
      chartColor = '#d6392d'
    }


    var options = {
      hAxis: {
        title: 'Date',
        textStyle: {
          color: '#333333',
          fontSize: 12,
          fontName: 'Arial',
          bold: true,
        },
        titleTextStyle: {
          color: '#333333',
          fontSize: 20,
          bold: true,
          italic: false
        }
      },
      vAxis: {
        title: 'Total ' + type,
        textStyle: {
          color: '#333333',
          fontSize: 12,
          fontName: 'Arial',
          bold: true,
        },
        titleTextStyle: {
            color: '#333333',
            fontSize: 20,
            bold: true,
            italic: false,
        }
      },
      legend: {
          position: 'none'
      },
      colors: [chartColor], 
      backgroundColor: 'white',
      'width':chartWidth,
      'height':300
    };

    // Create DataTable and add the array to it.
    var figures = google.visualization.arrayToDataTable(arrCases);

    // Define the chart type (LineChart) and the container (a DIV in our case).
    var chart = new google.charts.Line(document.getElementById('line-chart-' + type.toLowerCase()));

    // Draw the chart with Options.
    chart.draw(figures, google.charts.Line.convertOptions(options));
}