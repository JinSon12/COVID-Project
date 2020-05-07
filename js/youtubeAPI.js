/*
let youtubeOptions = {
    method: 'GET',
    redirect: 'follow',
    headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'none'
      },
  };
*/
function _callYoutubeApi() {
    return fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&order=viewCount&q=Alaska%20COVID-19&maxResults=10&videoDefinition=high&videoEmbeddable=true&key=AIzaSyDlJVkyb9iTbDb1fn61kZB0js1inP6e1Xo`)
        .then(response => response.json())
        .then(json => json)
        .catch(error => console.log('error', error));
}

async function getVideos() {
    console.log("getVideos async function");
    const data = await _callYoutubeApi()
    console.log("called Youtube API");
    console.log(data);

  //  document.querySelector('#video-selector').appendChild(''); // <-- place videos here
}

/* <div class="col-auto mb-4 ">
    <iframe src="https://www.youtube.com/embed/-EifJlGP4D4"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen
        aria-label="Video 1"></iframe>
    </div>

    EXAMPLE VIDEO DIV CREATED BY API CALL
*/