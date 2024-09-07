let movieNameRef = document.getElementById('movie-name')
let searchBtn = document.getElementById('search-btn')
let result = document.getElementById('result')

let getMovie = () => {
    let movieName = movieNameRef.value
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=47e9ab5a`;

    //Si le champ input est vide

    if(movieName.lengh <= 0){
        result.innerHTML = `<h3 class='msg'>Entrer un nom de film</h3>`
    }else{
        fetch(url).then((response) => response.json()).then((data) => {
            //Si le film existe dan la BD
            console.log(data)
            if(data.Response == 'True'){
                result.innerHTML = `
                <div class='info'>
                    <div>

                        <h2>${data.Title}</h2>

                        <div class='rating'>
                            <img src='assets/star-svgrepo-com.svg' alt='star'>
                            <h4>${data.imdbRating}</h4>
                        </div>

                        <div class='details'>
                            <span>${data.Rated}</span>
                            <span>${data.Year}</span>
                            <span>${data.Runtime}</span>
                        </div>

                        <div class='genre'>
                            <div>${data.Genre.split(",").join('</div><div>')}</div> 
                        </div>

                        <div class='content'>
                            <h3>Plot:</h3>
                            <p>${data.Plot}</p>
                            <h3>Cast</h3>
                            <p>${data.Actors}</p>
                        </div>

                    </div>
                    <img class='poster' src=${data.Poster}>
                </div> 
                `
            }
            //Si le film n'est pas dans la bd
            else{
                result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`
            }
        }).catch(() => {
            result.innerHTML = `<h3 class='msg'>Il y'a eu une erreur</h3>`
        })
    }
}

searchBtn.addEventListener('click', getMovie);
window.addEventListener('load', getMovie);