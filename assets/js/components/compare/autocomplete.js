const createAutoComplete = ({
	root,
	renderOption,
	onOptionSelect,
	inputValue,
	fetchData,
	inputPlaceholder,
	inputID,
	side,
}) => {
	root.innerHTML = `
    <div class="compare-input ${side}">
		<i class="fas fa-search fa-lg"></i><input id="${inputID}" type="text" class="compare-searchbar input-field" placeholder="${inputPlaceholder}">
    </div>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="options results">

            </div>
        </div>
    </div>
    `;

	const input = root.querySelector(".input-field"); // Input Field
	const dropdown = root.querySelector(".dropdown"); // Dropdown Search Results
	const resultsContainer = root.querySelector(".results"); // Results Container within dropdown

	// Runs function on input through debounce function in utils
	const onInput = async (event) => {
		const fetchedData = await fetchData(event.target.value);

		if (!fetchedData.length) {
			dropdown.classList.remove("open-dropdown");
			return;
		}

		resultsContainer.innerHTML = "";
		dropdown.classList.add("open-dropdown");

		for (let dataObject of fetchedData) {
			const option = document.createElement("a");

			option.classList.add("dropdown-item");
			option.innerHTML = renderOption(dataObject);

			option.addEventListener("click", () => {
				dropdown.classList.remove("open-dropdown");
				input.value = inputValue(dataObject);
				onOptionSelect(dataObject);
			});

			resultsContainer.appendChild(option);
		}
	};

	input.addEventListener("input", debounce(onInput, 500));

	document.addEventListener("click", (event) => {
		if (!root.children[1].contains(event.target)) {
			dropdown.classList.remove("open-dropdown");
		}
	});
};
