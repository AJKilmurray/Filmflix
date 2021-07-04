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
		const { Title, Year, Poster } = result;
		let released = "Released";
		if (Year.includes("-")) {
			released = "Run Time";
			console.log("test");
		}
		const template = `
			<img src="${Poster}" alt="">
			<div class="result-info">
				<h4>${Title}</h4>
				<p>${released}: ${Year}</p>
			</div>
		`;
		return template;
	},
	adjustCardInfoHeight(cards) {
		cards.forEach((card) => {
			console.log(card);
			card.style.marginTop = `-${card.offsetHeight}px`;
		});
	},
	onResultSelect() {},
};

search({
	...searchbarConfig,
});

const invalidInput = (inputField) => {
	console.log("Invalid input!", inputField);
};

const attemptDataFetch = async (searchTerm) => {
	const key = await apiKey();
	const result = await fetch(
		`https://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`
	)
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
	return result;
};

const searchNotFound = (inputField, timer = 2000) => {
	let displayInvalidSearch = 0;
	if (displayInvalidSearch) {
		clearTimeout(displayInvalidSearch);
	}

	inputField.style.backgroundColor = "#e66b6b";
	displayInvalidSearch = setTimeout(() => {
		inputField.style.backgroundColor = "white";
	}, timer);
};
