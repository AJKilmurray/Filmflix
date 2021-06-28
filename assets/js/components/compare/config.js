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
			searchTerm.replace(/\s/g, "+");
		}
		const response = await fetch(
			`https://www.omdbapi.com/?apikey=39418887&s=${searchTerm}`
		)
			.then((res) => {
				if (!res.ok) {
					throw new Error(`Status Code ${res.status}`);
				}

				return res.json();
			})
			.catch((err) => {
				console.log("=================================================");
				console.error("ERROR CAUGHT");
				console.error(err);
				console.log("=================================================");
			});
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
	displayContainer.innerHTML = movieTemplate(movieData);

	if (side === "left") {
		leftMovie = movieData;
	} else if (side === "right") {
		rightMovie = movieData;
	}

	if (leftMovie && rightMovie) {
		runComparison();
	}
};

const runComparison = () => {
	const leftSideStats = document.querySelectorAll(
		".left-movie .comparison-item"
	);
	const rightSideStats = document.querySelectorAll(
		".right-movie .comparison-item"
	);

	let scoreTally = [0, 0]; // [0] is left, [1] is right

	leftSideStats.forEach((leftStat, index) => {
		const rightStat = rightSideStats[index];
		let leftSideValue = parseFloat(leftStat.dataset.value);
		let rightSideValue = parseFloat(rightStat.dataset.value);
		if (leftSideValue === rightSideValue) {
			applyTiedComparisonColor(leftStat, rightStat);
		} else if (
			leftSideValue < rightSideValue ||
			(isNaN(leftSideValue) && !isNaN(rightSideValue))
		) {
			applyComparisonColors(leftStat, rightStat);
			scoreTally[1]++;
		} else if (
			leftSideValue > rightSideValue ||
			(!isNaN(leftSideValue) && isNaN(rightSideValue))
		) {
			applyComparisonColors(rightStat, leftStat);
			scoreTally[0]++;
		}
	});
};

const applyComparisonColors = (lessThan, greaterThan) => {
	lessThan.classList.remove(
		"comparison-win",
		"comparison-tie",
		"comparison-default"
	);
	lessThan.classList.add("comparison-loss");
	greaterThan.classList.remove(
		"comparison-loss",
		"comparison-tie",
		"comparison-default"
	);
	greaterThan.classList.add("comparison-win");
};

const applyTiedComparisonColor = (leftSide, rightSide) => {
	leftSide.classList.remove(
		"comparison-win",
		"comparison-loss",
		"comparison-default"
	);
	leftSide.classList.add("comparison-tie");
	rightSide.classList.remove(
		"comparison-win",
		"comparison-loss",
		"comparison-default"
	);
	rightSide.classList.add("comparison-tie");
};

const awardsValue = (awards) => {
	let totalAwards = awards.split(" ").reduce((total, curr) => {
		const value = parseInt(curr);
		if (isNaN(value)) {
			return total;
		} else if (!isNaN(value)) {
			return total + value;
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
	<article data-value=${awards} class="comparison-item comparison-default">
		<p class="title">${Awards}</p>
		<p>Awards (${awards} Total)</p>
	</article>
	<article data-value=${dollars} class="comparison-item comparison-default">
		<p class="title">${BoxOffice}</p>
		<p>Box Office ($USD)</p>
	</article>
	<article data-value=${metascore} class="comparison-item comparison-default">
		<p class="title">${Metascore}</p>
		<p>Metascore (${Metascore}/100)</p>
	</article>
	<article data-value=${rating} class="comparison-item comparison-default">
		<p class="title">${imdbRating}</p>
		<p>IMDb Rating (${imdbRating}/10)</p>
	</article>
	<article data-value=${votes} class="comparison-item comparison-default">
		<p class="title">${imdbVotes}</p>
		<p>IMDb Votes</p>
	</article>
	`;
};
