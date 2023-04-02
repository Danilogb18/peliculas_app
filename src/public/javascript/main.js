
const frame = document.getElementById('iframe');
const movieClikers = document.querySelectorAll('.movieCard')
const movieTitles = Array.from(document.querySelectorAll('#movie-title'))
const moviesSection = document.querySelectorAll('#moviesSection > div')[0]

const headerText = document.querySelector('header > div > h1');

headerText.addEventListener('click', () => {
    window.location.href = '/movies';
})

if(movieClikers.length > 0){ //* Este codigo se ejcuta en la pagina donde se muestran todas las peliculas
    const searchBar = document.getElementById('searchMovie');
    searchBar.addEventListener('focus', () =>{
            searchBar.placeholder = 'Busca películas'
    })
    searchBar.addEventListener('mouseover', () =>{
            searchBar.placeholder = 'Busca películas'
    })
    searchBar.addEventListener('blur', () =>{
            searchBar.placeholder = ''
    })
    searchBar.addEventListener('mouseout', () =>{
            searchBar.placeholder = ''
    })

    searchBar.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
          moviesSection.scrollIntoView();
          searchBar.blur();
        }
      }); 

    let typingTimer; //identificador
    let doneTypingTimer = 500; //temporizador en milisegundos
    searchBar.addEventListener('keyup', (input) => {
        clearTimeout(typingTimer);
        typingTimer = setTimeout(SearchMovies, doneTypingTimer, input.target.value)
    })

    function SearchMovies(text){
        let results = movieTitles.filter(item => item.textContent.toLowerCase().includes(text.toLowerCase()))
        moviesSection.innerHtml = results
        moviesSection.innerHTML = ''
        for (let index = 0; index < results.length; index++) {
            const element = results[index];
            moviesSection.appendChild(element.parentElement)
        }
    }


    movieClikers.forEach(clicker => {

        let movieId = clicker.dataset.movieId;
        let fetchInfoUrl = ('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=4176f6682cc639f6cb41a80de599e61d&language=es&append_to_response=credits')
        fetch(fetchInfoUrl)
        .then(response => response.json())
        .then(data => { //aqui seteo los datos de la pagina donde salen todas las peliculas
            let title = (clicker.parentElement.nextElementSibling)
            title.textContent = data.original_title //establecer titulo
            if(data.overview.length > 290){ //establecer descripcion
                clicker.textContent = (data.overview.substring(0,290) + '...')
            } else{
                clicker.textContent = data.overview
            }

            let posterImageUrl = ('https://image.tmdb.org/t/p/original/' + data.poster_path);
            clicker.style.backgroundImage = ('url(' + posterImageUrl + ')')
        });

        clicker.addEventListener('click', () => {
            sessionStorage.setItem('movieSource' ,clicker.dataset.movieSource);
            sessionStorage.setItem('movieId', clicker.dataset.movieId)


        })
    })
}


if(frame){ // * Este codigo se ejecuta en la pagina de la pelicula
    if((sessionStorage.getItem('movieSource') == null) || (sessionStorage.getItem('movieId') == null)){
        window.location.href = '/movies';
    }
    frame.src = sessionStorage.getItem('movieSource');
    
    const poster = document.getElementById('poster');
    const title = document.getElementById('title');
    const tagline = document.getElementById('tagline');
    const description = document.getElementById('description');
    const directorInfo = document.getElementById('director-info');


    const movieId = sessionStorage.getItem('movieId');
    const fetchInfoUrl = ('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=4176f6682cc639f6cb41a80de599e61d&language=es&append_to_response=credits')

    fetch(fetchInfoUrl)
    .then(response => response.json())
    .then(data => { //aqui se definiran todos los valores del info con la informacion definida.

        title.textContent = ((data.original_title) + "  " + "(" + (data.release_date.slice(0,4)) + ")") ;
        tagline.textContent = data.tagline;
        description.textContent = data.overview;
        
        const director = data.credits.crew.find(member => member.job === 'Director');
        const directorName = director ? director.name : 'Not found';
        directorInfo.textContent = ('Director: ' + directorName)

        //conseguir la imagen de la portada
        const posterImageUrl = ('https://image.tmdb.org/t/p/original/' + data.poster_path);
        poster.src = posterImageUrl;

    });
}


