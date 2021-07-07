const searchbarConfig = {
	container: document.querySelector(".search-results"),
	renderSearchbar(root) {
		root.insertAdjacentHTML(
			"afterbegin",
			`<div class="search-input">
                <form class="form">
                    <input id="search-field" type="text" class="searchbar" autocomplete="off">
                    <button type="submit" class="search-btn">Search</button>
                </form>
            </div>`
		);
	},
	async inputValidation(inputField) {
		let inputValue = inputField.value;
		if (!inputValue) {
			return invalidInput(inputField);
		}

		const validateSearch = await attemptDataFetch(inputValue);
		if (validateSearch.Error) {
			searchNotFound(inputField, 2000);
			inputField.value = validateSearch.Error;
			return false;
		}
		return validateSearch;
	},
	renderResults(result) {
		const { Title, Year, Poster, imdbID } = result;
		let released = "Released";
		if (Year.includes("-")) {
			released = "Run Time";
		}
		const template = `
			<img src="${Poster}" alt="">
			<div data-id="${imdbID}" class="result-info">
				<h4>${Title}</h4>
				<p><span class="red-highlight">${released}:</span> ${Year}</p>
			</div>
		`;
		return template;
	},
	adjustCardInfoHeight(cards) {
		cards.forEach((card) => {
			card.style.marginTop = `-${card.offsetHeight}px`;
		});
	},
	async onResultSelect(card) {
		card.style.cursor = "progress";
		const imdbID = card.children[1].dataset.id;
		const cardData = await fetchMovieInfo(imdbID);
		renderSelection(cardData);
		card.style.cursor = "pointer";
	},
};

search({
	...searchbarConfig,
});

const invalidInput = (inputField, timer = 2000) => {
	inputField.style.backgroundColor = "#e66b6b";
	setTimeout(() => {
		inputField.style.backgroundColor = "white";
	}, 2000);
};

const attemptDataFetch = async (searchTerm) => {
	const key = await apiKey();
	return await fetch(`https://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`Status Code ${res.status}`);
			}

			return res.json();
		})
		.then((data) => {
			if (data.Error) {
				return data;
			}

			return data.Search;
		})
		.catch((error) => console.log(error, this));
};

const searchNotFound = (inputField, timer = 2000) => {
	inputField.style.backgroundColor = "#e66b6b";
	setTimeout(() => {
		inputField.style.backgroundColor = "white";
	}, timer);
};

const fetchMovieInfo = async (imdbID) => {
	const key = await apiKey();
	return await fetch(`https://www.omdbapi.com/?apikey=${key}&i=${imdbID}`)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`Status Code ${res.status}`);
			}

			return res.json();
		})
		.then((data) => data)
		.catch((err) => console.log(err));
};

const renderSelection = (data) => {
	if (data.Type === "movie") {
		renderSelectedMovie(data);
	} else if (data.Type === "series") {
		renderSelectedSeries(data);
	}
};

const renderSelectedMovie = (movie) => {
	const {
		Title,
		Year,
		Rated,
		Released,
		Runtime,
		Genre,
		Director,
		Plot,
		Metascore,
		BoxOffice,
		Awards,
		Actors,
		imdbRating,
		imdbVotes,
		Ratings,
	} = movie;

	const formattedRatings = Ratings.map(
		(rating) =>
			`<p><span class="black-highlight">${rating.Source}:</span> ${rating.Value}</p>`
	).join("");

	let formattedGenre;
	if (Genre.includes(",")) {
		formattedGenre = Genre.split(", ")
			.map((genre) => `<p class="movie-data-list-data-item">${genre}</p>`)
			.join("");
	}

	let formattedAwards;
	if (Awards.includes("Oscars")) {
		formattedAwards = Awards.replace("Oscars. ", "Oscars & ")
			.split(" & ")
			.map((award) => `<p class="movie-data-list-data-item">${award}</p>`)
			.join("")
			.replace(" total", "")
			.replace("wins", "Wins")
			.replace("nominations", "Nominations")
			.replace(".", "");
	} else if (Awards.includes("wins")) {
		formattedAwards = Awards.split(" & ")
			.map((award) => `<p class="movie-data-list-data-item">${award}</p>`)
			.join("")
			.replace(".", "")
			.replace("wins", "Wins");
	} else if (!Awards) {
		formattedAwards = `<p class="movie-data-list-data-item">No Awards</p>`;
	} else if (Awards.includes(" & ")) {
		formattedAwards = Awards.split(" & ")
			.map((award) => `<p class="movie-data-list-data-item">${award}</p>`)
			.join("")
			.replace("win", "Win")
			.replace(".", "")
			.replace("nominations", "Nominations");
	} else if (Awards) {
		formattedAwards = `<p class="movie-data-list-data-item">${Awards.replace(
			"nominations",
			"Nominations"
		)}</p>`;
	}

	let formattedActors = Actors.split(", ")
		.map((actor) => `<p class="movie-data-list-data-item">${actor}</p>`)
		.join("");

	const movieHTML = `
		<div class="selected-background">
			<article class="movie-data container">
				<header class="movie-heading">
					<h4><span class="red-highlight">${Title}</span> <span class="gray-highlight">(</span>${Year}<span class="gray-highlight">)</span></h4>
					<h4>Rated: <span class="red-highlight">${Rated}</span></h4>
				</header>
				<div class="movie-data-grid">
					<div class="movie-data-details">
						<section class="top-section">
							<article class="plot-items">
								<h3>Plot</h3>
								<p>${Plot}</p>
							</article>
							<div class="ratings">
								<h3>Ratings</h4>
								<p>${formattedRatings}</p>
								<p><span class="black-highlight">Metascore:</span> ${Metascore}/100</p>
								<p><span class="black-highlight">IMDb Rating:</span> ${imdbRating}</p>
								<p><span class="black-highlight">IMDb Votes:</span> ${imdbVotes}</p>
							</div>
						</section>
						<div class="movie-data-list">
							<ul class="movie-list-parent">
								<li class="movie-data-list-item"><h4 class="movie-data-list-title">Genres</h4> ${formattedGenre}</li>
							</ul>
							<ul class="movie-list-parent">
							 	<li class="movie-data-list-item"><h4 class="movie-data-list-title">Director</h4><p class="movie-data-list-data-item">${Director}</p></li>
							</ul class="movie-list-parent">
							<ul class="movie-list-parent">
							 	<li class="movie-data-list-item"><h4 class="movie-data-list-title">Awards</h4> ${formattedAwards}</li>
							</ul>
							<ul class="movie-list-parent">
								<li class="movie-data-list-item"><h4 class="movie-data-list-title">Actors</h4> ${formattedActors}</li>
							</ul>
						</div>
						<div class="more-info">
							<h3>More Information</h3>
							<p>Box Office: ${BoxOffice} ($USD)</p>
							<p>Release Date: ${Released}</p>
							<p>Runtime: ${Runtime}</p>
						</div>
					</div>
				</div>
			</article>
		</div>
	`;
	document.body.insertAdjacentHTML("afterbegin", movieHTML);
	onSelectionExit();
};

const renderSelectedSeries = (series) => {
	console.log(series);
	const {
		Actors,
		Awards,
		Genre,
		Plot,
		Released,
		Year,
		Title,
		imdbRating,
		imdbVotes,
		totalSeasons,
	} = series;

	const seriesHTML = `
	<div class="selected-background">
			<article class="movie-data container">
				<header class="movie-heading">
					<h4><span class="red-highlight">${Title}</span> <span class="gray-highlight">(</span>${Year}<span class="gray-highlight">)</span></h4>
					<h4>Rated: <span class="red-highlight">${Rated}</span></h4>
				</header>
				<div class="movie-data-grid">
					<div class="movie-data-details">
						<section class="top-section">
							<article class="plot-items">
								<h3>Plot</h3>
								<p>${Plot}</p>
							</article>
							<div class="ratings">
								<h3>Ratings</h4>
								<p>${formattedRatings}</p>
								<p><span class="black-highlight">Metascore:</span> ${Metascore}/100</p>
								<p><span class="black-highlight">IMDb Rating:</span> ${imdbRating}</p>
								<p><span class="black-highlight">IMDb Votes:</span> ${imdbVotes}</p>
							</div>
						</section>
						<div class="movie-data-list">
							<ul class="movie-list-parent">
								<li class="movie-data-list-item"><h4 class="movie-data-list-title">Genres</h4> ${formattedGenre}</li>
							</ul>
							<ul class="movie-list-parent">
							 	<li class="movie-data-list-item"><h4 class="movie-data-list-title">Director</h4><p class="movie-data-list-data-item">${Director}</p></li>
							</ul class="movie-list-parent">
							<ul class="movie-list-parent">
							 	<li class="movie-data-list-item"><h4 class="movie-data-list-title">Awards</h4> ${formattedAwards}</li>
							</ul>
							<ul class="movie-list-parent">
								<li class="movie-data-list-item"><h4 class="movie-data-list-title">Actors</h4> ${formattedActors}</li>
							</ul>
						</div>
						<div class="more-info">
							<h3>More Information</h3>
							<p>Box Office: ${BoxOffice} ($USD)</p>
							<p>Release Date: ${Released}</p>
							<p>Runtime: ${Runtime}</p>
						</div>
					</div>
				</div>
			</article>
		</div>`;

	document.body.insertAdjacentHTML("afterbegin", seriesHTML);
	onSelectionExit();
};

const onSelectionExit = () => {
	const background = document.querySelector(".selected-background");
	document.addEventListener("click", (e) => {
		if (e.target === background) {
			document.body.removeChild(background);
		}
	});
};
