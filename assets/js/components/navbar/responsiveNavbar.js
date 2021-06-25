window.addEventListener("DOMContentLoaded", () => {
	const navToggle = document.querySelector(".nav-toggle");
	const navContainer = document.querySelector(".navigation");
	const linksContainer = document.querySelector(".nav-links-container");

	navToggle.addEventListener("click", () => {
		if (navContainer.offsetHeight > 0) {
			toggleNavigationMenu(navContainer, navToggle, "fa-bars", "0"); // Close Nav
		} else if (navContainer.offsetHeight === 0) {
			toggleNavigationMenu(
				navContainer,
				navToggle,
				"fa-times",
				linksContainer.offsetHeight
			); // Open Nav
		}
	});
});
