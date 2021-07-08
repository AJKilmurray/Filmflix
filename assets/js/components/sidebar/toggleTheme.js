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
	document.body.style.backgroundColor = "#090909";
};

const toggleToLightTheme = () => {
	document.body.style.backgroundColor = "white";
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
