window.addEventListener("DOMContentLoaded", () => {
	const dropdown = document.querySelectorAll(".dropdown");
	const inputField = document.querySelector(".input-field");
	const searchIcon = document.querySelector(".fa-search");
	const inputWidth = inputField.offsetWidth + searchIcon.offsetWidth;

	dropdown.forEach((side) => {
		side.style.width = `${inputWidth}px`;
	});
});
