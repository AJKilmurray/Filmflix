const search = ({
	container,
	renderSearchbar,
	inputValidation,
	renderResults,
	adjustCardInfoHeight,
	onResultSelect,
}) => {
	const root = document.querySelector(".input-root");
	renderSearchbar(root); // Renders searchbar

	const search = document.querySelector(".searchbar");
	const searchBtn = document.querySelector(".search-btn");

	// On search button click
	searchBtn.addEventListener("click", async (event) => {
		event.preventDefault();

		while (container.firstChild) {
			container.removeChild(container.lastChild);
		}

		const searchResults = await inputValidation(search, 2000);

		if (!searchResults) {
			return;
		}

		for (let result of searchResults) {
			const resultItem = document.createElement("div");
			resultItem.classList.add("result-card");

			const resultContent = renderResults(result);
			resultItem.insertAdjacentHTML("afterbegin", resultContent);

			container.appendChild(resultItem);
		}
		const resultCardInfo = document.querySelectorAll(".result-info");
		adjustCardInfoHeight(resultCardInfo);

		const resultCards = document.querySelectorAll(".result-card");
		resultCards.forEach((card) => {
			card.addEventListener("click", (event) => {
				onResultSelect(event.currentTarget);
			});
		});

		window.addEventListener("resize", adjustCardInfoHeight(resultCardInfo));

		const assist = document.querySelector(".assist");
		assist.classList.add("hide-element");
	});
};
