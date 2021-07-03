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
	inputValidation(inputField) {
		const inputValue = inputField.value;
		if (!inputValue) {
			return invalidInput(inputField);
		}

		const validateSearch = attemptDataFetch(inputValue);
	},
	renderResults() {
		console.log();
	},
	onResultSelect() {},
};

const invalidInput = (inputField) => {
	console.log("Invalid input!", inputField);
};

const attemptDataFetch = async (searchTerm) => {
	const searchResult = await fetch(
		`https://www.omdbapi.com/?apikey=${key}&s=${searchTerm}`
	);
};
