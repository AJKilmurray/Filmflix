window.addEventListener("DOMContentLoaded", () => {
	const dropdown = document.querySelectorAll(".dropdown");
	const inputField = document.querySelector(".input-field");

	dropdown.forEach((side) => {
		side.style.width = `${inputField.offsetWidth}px`;
	});
});
