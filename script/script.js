// Giphy API URL
const giphyLink = "https://api.giphy.com/v1/gifs";

// Giphy API key taken from official dashboard web-site
const giphyAPIKey = "CVreBIurcH2FmYoe36B9FBYwWnLV6sBc";


// this function generates request URL
function generateUrl(limit, search = false, text = '') {
    if (search) { // if youser wants to search for gifs
        return (giphyLink + '/search' + `?api_key=${giphyAPIKey}&` + `q=${text}&` + `limit=${limit}`)
    } else { // otherwise we get gifs in trend
        return (giphyLink + '/trending' + `?api_key=${giphyAPIKey}&` + `limit=${limit}`)
    }

}


// function for requesting Giphy API in order to get gifs
function getGifs(limit, search = false, text = '') {
    const url = generateUrl(limit, search, text);
    console.log(url)
    return fetch(url).then(response => response.json()).then(jsons => {
        return jsons
    }).catch(err => console.log(err))
}

//for adding gifs to HTML document
const gifs = document.getElementsByClassName('gifs');
let count = 0;

//for state of the page
const showMoreButton = document.getElementById('show-more_button');
const sectionH1 = document.getElementById('main_h1');
const pageStateEnum = {
    home: 1,
    search: 2
}; // State of the page: 'home' when on home page and 'search' if something searched

let pageState = pageStateEnum.home;

//Form submition
const searchForm = document.getElementById('search');

searchForm.addEventListener('submit', search)



// Maing page gifs load
loadMainPage();


function loadMainPage() {
    getGifs(3).then(response => {
        const data = response.data;
        console.log(data)
        gifs[0].innerHTML = '';
        data.forEach(el => {
            count++;
            let img = document.createElement('img');
            img.setAttribute('src', el.images.fixed_height.url);
            gifs[0].append(img);
        })
    });
}
// when HOME button is clicked
function goHome() {
    console.log(pageState)
    if (pageState === pageStateEnum.search) {
        pageState = pageStateEnum.home
        sectionH1.innerHTML = 'Trendy gifs';
        showMoreButton.style.display = 'inline-block';
    }
    loadMainPage();
}

// Search function
function search(event) {
    event.preventDefault();
    let query = document.getElementById('search_input').value;
    sectionH1.innerHTML = `Search results for '${query}'`;
    showMoreButton.style.display = 'none';
    pageState = pageStateEnum.search;


    getGifs(5, true, query).then(response => {
        const data = response.data;
        gifs[0].innerHTML = '';
        console.log(data)
        data.forEach(el => {
            let img = document.createElement('img');
            img.setAttribute('src', el.images.fixed_height.url);
            gifs[0].append(img);
        })
        console.log("DONE")
    });

}

// Load more button show
function showMore() {
    getGifs(count + 3).then(response => {
        const data = response.data;
        console.log(data);
        for (let i = count; i < data.length; i++) {
            count++;
            let img = document.createElement('img');
            img.setAttribute('src', data[i].images.fixed_height.url);
            gifs[0].append(img)
        }
    })
}




