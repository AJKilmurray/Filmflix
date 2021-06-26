window.addEventListener("DOMContentLoaded", () => {
	const dropdown = document.querySelector(".dropdown");
	const inputField = document.querySelector(".input-field");

	dropdown.style.width = `${inputField.offsetWidth}px`;
});
