const section = document.querySelector(".compare-area");

window.addEventListener("DOMContentLoaded", () => {
	const navbar = document.querySelector(".navbar");
	section.style.minHeight = `calc(100vh - ${navbar.offsetHeight}px)`;
});
