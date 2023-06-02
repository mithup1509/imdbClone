function fetchmovie() {
  const apiKey = "a589d196";

  let currenturl = window.location.href;
  let url = currenturl.split("/");
  imdbID = url[url.length - 1];

  return fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`);
}

let ratingReview = [];

let eachMovie = [];
fetchmovie()
  .then((response) => {
    return response.json();
  })
  .then((data) => {
    console.log(data, "ajhs", data.Actors);
    let actors = data.Actors.split(", ");
    let genre = data.Genre.split(", ");

    let movieCard = document.createElement("div");
    movieCard.innerHTML = `
<div class="title">
    <p>${data.Title}</p>
</div>
<div class="maincontainer">

    <div class="poster-image">
        <div class="poster">
            <img src="${data.Poster}"
                alt="poster">

        </div>
        <div class="rating">
            <p class="imdb-rating">⭐ ${data.imdbRating}/10</p>
        </div>
    </div>
    <div class="details">
        <div class="runtime">
            <p class="time">
            Runtime:${parseInt(
              data.Runtime.substring(0, 3) / 60
            )}hrs ${parseInt(data.Runtime.substring(0, 3) % 60)}min</p>

            </p>
        </div>
        <div class="plot">
            <p class="movie-plot">
                "${data.Plot}"

            </p>
        </div>

        <div class="actors">Actors:
            <ul>
            ${actors
              .map((element) => {
                return `<li>${element}</li>`;
              })
              .join("")}
            </ul>
        </div>
        <div class="genre">Genre :
            <ul>
            ${genre
              .map((element) => {
                return `<li>${element}</li>`;
              })
              .join("")}
            </ul>
        </div>

        <div class="director">
            <p class="director-name">Director : ${data.Director}</p>
        </div>

        <div class="language">
            <p class="movie-lang">Language : ${data.Language}</p>
        </div>

        <div class="released-year">
            <p class="year">Released: ${data.Released}</p>
        </div>
        <div class="writer">
            <p class="writer-name">Writer : ${data.Writer}</p>
        </div>
        <div class="votes">
            <p class="imdb-votes">❤️ ${data.imdbVotes}</p>
        </div>
    </div>

</div>
`;

    movieCard.setAttribute("class", "movie");
    document.querySelector(".container").appendChild(movieCard);
  });

function handleClick() {
  window.location.href = "/";
}
