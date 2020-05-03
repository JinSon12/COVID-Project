google.charts.load('current', { packages: ['line'] });
google.charts.setOnLoadCallback(drawLineChart);

function drawLineChart() {
    $.ajax({
        url: 'https://covidtracking.com/api/states/daily',
        dataType: 'json',
        type: 'GET',
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var arrCases = [['Date', 'Cases']]; // assign column names

            for (let i = 0; i < 600; i += 55) {
                arrCases.push([data[i].date, data[i].positive]);
            }

            // Set chart options
            var options = {
                chart: {
                    title: 'Cases',
                    subtitle: '-- total positive'
                },
                axes: {
                    x: {
                        0: { side: 'top'}   // Use "top" or "bottom".
                    }
                }
            };


            // Create DataTable and add the array to it.
            var figures = google.visualization.arrayToDataTable(arrCases);

            // Define the chart type (LineChart) and the container (a DIV in our case).
            var chart = new google.charts.Line(document.getElementById('line-chart-cases'));

            // Draw the chart with Options.
            chart.draw(figures, google.charts.Line.convertOptions(options));
        },
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            alert('Got an Error');
        }
    });
}