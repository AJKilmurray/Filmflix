const navToggle = document.querySelector(".nav-toggle");
const navContainer = document.querySelector(".navigation");
const linksContainer = document.querySelector(".nav-links-container");
const navHeading = document.querySelector(".nav-heading");

navToggle.addEventListener("click", () => {
	if (navContainer.offsetHeight > 0) {
		toggleNavigationMenu(navContainer, "fa-bars", "0"); // Close Nav
	} else if (navContainer.offsetHeight === 0) {
		toggleNavigationMenu(navContainer, "fa-times", linksContainer.offsetHeight); // Open Nav
	}
});
