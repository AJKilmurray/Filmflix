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

const renderComponent = (
	parentContainer,
	renderHTML,
	set = false,
	append = false
) => {
	if (set) {
		parentContainer.innerHTML = renderHTML;
	} else if (append) {
		parentContainer.appendChild(renderHTML);
	}
};

const toggleSidebar = (sidebar, toggleClass) => {
	sidebar.classList.toggle(toggleClass);
};
