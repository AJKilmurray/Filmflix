window.addEventListener("DOMContentLoaded", () => {
	readLocalStorage();
	sliderPosition();

	const toggleTheme = document.querySelector(".toggle-theme");
	toggleTheme.addEventListener("click", (event) => {
		changeTheme();
		moveSlider();
	});
});

// Things to change
const infoTabs = document.querySelectorAll(".info-tab");
const sections = document.querySelectorAll(".card");

const readLocalStorage = () => {
	const theme = localStorage.getItem("theme");
	if (theme === null) {
		localStorage.setItem("theme", "light");
		toggleToLightTheme();
	} else if (theme === "light") {
		toggleToLightTheme();
	} else if (theme === "dark") {
		toggleToDarkTheme();
	}
};

const toggleToDarkTheme = () => {
	darkTheme(document.body);
	infoTabs.forEach((tab) => darkTheme(tab));
	sections.forEach((card) => darkTheme(card));
};

const toggleToLightTheme = () => {
	lightTheme(document.body);
	infoTabs.forEach((tab) => lightTheme(tab));
	sections.forEach((card) => lightTheme(card));
};

const lightTheme = (el) => {
	el.classList.remove("dark-theme");
	el.classList.add("light-theme");
};

const darkTheme = (el) => {
	el.classList.remove("light-theme");
	el.classList.add("dark-theme");
};

const changeTheme = () => {
	const theme = localStorage.getItem("theme");
	if (theme === null || theme === "light") {
		localStorage.setItem("theme", "dark");
		toggleToDarkTheme();
	} else if (theme === "dark") {
		localStorage.setItem("theme", "light");
		toggleToLightTheme();
	}
};

const themeSwitch = document.querySelector(".switch");

const sliderPosition = () => {
	const theme = localStorage.getItem("theme");
	if (theme === "dark") {
		themeSwitch.classList.add("slide");
	}
};

const moveSlider = () => {
	const theme = localStorage.getItem("theme");
	if (theme === "null" || theme === "light") {
		themeSwitch.classList.remove("slide");
	} else if (theme === "dark") {
		themeSwitch.classList.add("slide");
	}
};
