const toggleNavigationMenu = (container, icon, className, height) => {
	container.style.height = `${height}px`;
	icon.innerHTML = `<i class="fas ${className} fa-2x hamburger-menu"></i>`;
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

const address = "http://127.0.0.1:5500",
	keyJSON = "apikey.json";
const apiKey = async () => {
	return await fetch(`${address}/${keyJSON}`)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`Status Code ${res.status}`);
			}

			return res.json();
		})
		.then((data) => data.key)
		.catch((err) => console.log(err));
};
