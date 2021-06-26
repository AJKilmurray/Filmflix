const autoCompleteConfig = {
	renderOption(movie) {
		const { Poster, Year, Title } = movie;
		const imgSRC = Poster === "N/A" ? "" : Poster;
		return `<img src="${imgSRC}">
        <p>${Title} (${Year})</p>`;
	},
	inputValue(movie) {
		return movie.Title;
	},
	async fetchData(searchTerm) {
		if (searchTerm.includes(" ")) {
			searchTerm.replace(/\s/g, "+").replace(/^+$+/g, "");
		}
		const response = await fetch(
			`https://www.omdbapi.com/?apikey=39418887&s=${searchTerm}`
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error`Status Code ${res.status}`();
				}

				return res.json();
			})
			.catch((err) => {
				console.log("=================================================");
				console.error("ERROR CAUGHT");
				console.error(err);
				console.log("=================================================");
			});
		console.log(response);
		if (response.Error) {
			return [];
		}

		return response.Search;
	},
};

createAutoComplete({
	root: document.querySelector(".left-search"),
	...autoCompleteConfig,
	onOptionSelect(movie) {
		document.querySelector(".assist").classList.add("hide-element");
		onMovieSelect(movie, document.querySelector(".left-movie"), "left");
	},
});

createAutoComplete({
	root: document.querySelector(".right-search"),
	...autoCompleteConfig,
	onOptionSelect(movie) {
		document.querySelector(".assist").classList.add("hide-element");
		onMovieSelect(movie, document.querySelector(".right-movie"), "right");
	},
});

let leftMovie;
let rightMovie;
const onMovieSelect = async (movie, displayContainer, side) => {
	const movieData = await fetch(
		`https://www.omdbapi.com/?apikey=39418887&i=${movie.imdbID}`
	)
		.then((res) => {
			if (!res.ok) {
				throw new Error`Status Code ${res.status}`();
			}

			return res.json();
		})
		.catch((err) => {
			console.log("=================================================");
			console.error("ERROR CAUGHT");
			console.error(err);
			console.log("=================================================");
		});
	displayContainer.innerHTML = movieTemplate(movieData.data);

	if (side === "left") {
		leftMovie = movieData.data;
	} else if (side === "right") {
		rightMovie === movieData.data;
	}

	if (leftMovie && rightMovie) {
		runComparison();
	}
};

const runComparison = () => {
	const leftSideStats = document.querySelectorAll(".");
};

const awardsValue = (awards) => {
	let totalAwards = awards.split(" ").reduce((total, curr) => {
		const value = parseInt(curr);
		if (isNaN(value)) {
			return total;
		} else if (!isNaN(value)) {
			return total + curr;
		}
	}, 0);
	return totalAwards;
};

const movieTemplate = (movieDetails) => {
	const {
		Poster,
		Title,
		Genre,
		Plot,
		Awards,
		BoxOffice,
		Metascore,
		imdbRating,
		imdbVotes,
	} = movieDetails;

	// Converting values
	const dollars = parseInt(BoxOffice.replace(/\$/g, "").replace(/,/g, ""));
	const metascore = parseInt(Metascore);
	const rating = Number(imdbRating);
	const votes = parseInt(imdbVotes.replace(/,/g, ""));
	const awards = awardsValue(Awards);

	return `
	<article class="movie-info">
		<figure class="movie-img-container">
			<div class="movie-img">
				<img src=${Poster}>
			</div>
		</figure>
		<div class="movie-details">
			<div class="content">
				<h1>${Title}</h1>
				<h4>${Genre}</h4>
				<p>${Plot}</p>
			</div>
		</div>
	</article>
	<article data-value=${awards} class="comparison-item">
		<p class="title">${Awards}</p>
		<p>Awards (${awards} Total)</p>
	</article>
	<article data-value=${dollars} class="comparison-item">
		<p class="title">${BoxOffice}</p>
		<p>Box Office ($USD)</p>
	</article>
	<article data-value=${metascore} class="comparison-item">
		<p class="title">${Metascore}</p>
		<p>Metascore (${Metascore}/100)</p>
	</article>
	<article data-value=${rating} class="comparison-item">
		<p class="title">${imdbRating}</p>
		<p>IMDb Rating (${imdbRating}/10)</p>
	</article>
	<article data-value=${votes} class="comparison-item">
		<p class="title">${imdbVotes}</p>
		<p>IMDb Votes</p>
	</article>
	`;
};
