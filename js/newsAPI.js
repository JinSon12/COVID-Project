let selection = 'popularity'; // default selection choice

function newsApi() {
    let encodedQuery = encodeURI('+(' + state + ')AND(CoronaVirus)OR(COVID-19)OR(PANDEMIC)OR(covid)');
    let encodedTitle = encodeURI('COVID')
    return fetch(`https://newsapi.org/v2/everything?q=${encodedQuery}&qInTitle=${encodedTitle}&pageSize=12&sortBy=${selection}&language=en&apiKey=c9b6c0a08f6e420e9673784123343f6d`)
        .then(response => response.json())
        .then(json => json)
        .catch(renderError);
}

// creates a table 
async function getNews() {
    document.querySelector('#news-container').innerHTML = '';

    let newsData = await newsApi()
    if (newsData.articles.length > 0) {
        newsData.articles.forEach(article => {

            // Make default attributes
            let card = document.createElement('div');
            card.classList.add('news-card');
            let newsLink = document.createElement('a');
            newsLink.setAttribute('href', '#');
            let newsImg = document.createElement('img');
            newsImg.setAttribute('src', '../img/white.png');
            let newsTitle = document.createElement('h6');
            let newsAuthor = document.createElement('p');


            // Make the link
            if (article.url) {
                newsLink.setAttribute('href', article.url);
            }

            // Make the image
            if (article.urlToImage) {
                newsImg.setAttribute('src', article.urlToImage);
                newsImg.setAttribute('alt', article.title);
                newsImg.setAttribute('title', article.title);
            }

            // Make the title
            if (article.title) {
                if (article.title.length > 100) { // shorten the article title
                    newsTitle.innerHTML = article.title.substring(0, 100) + '...';
                } else {
                    newsTitle.innerHTML = article.title;
                }
            }
            // Make the author
            if (article.source.name) {
                newsAuthor.innerHTML = article.source.name;
            }

            card.appendChild(newsLink);
            newsLink.appendChild(newsImg);
            card.appendChild(newsTitle);
            card.appendChild(newsAuthor);
            document.querySelector('#news-container').appendChild(card);
        });
    }
}

// Reload based on user specified search type
let selectType = document.getElementById('control-news')
selectType.addEventListener('change', () => {
    selection = selectType.value;
    getNews();
});