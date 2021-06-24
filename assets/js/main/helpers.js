const toggleNavigationMenu = (container, className, height) => {
	console.log(height);
	container.style.height = `${height}px`;
	navToggle.innerHTML = `<i class="fas ${className} fa-2x hamburger-menu"></i>`;
};

const hidePreloader = (preloaderElement) => {
	preloaderElement.classList.add("hide-preloader");
};

const redirectToPage = (pageUrl) => {
	window.location.href = pageUrl;
};
