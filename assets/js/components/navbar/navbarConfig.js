export const navbar = {
	navbar: {
		container: {
			start: `<div class="container nav-container">`,
			end: `</div>`,
		},
		heading: {
			start: `<div class="nav-heading">`,
			end: `</div>`,
			content: `<a href="#" class="logo-link">
                        <img src="assets/images/logo.png" alt="Filmflix Logo" class="logo">
                    </a>
                    <button class="nav-toggle">
                        <i class="fas fa-bars fa-2x hamburger-menu"></i>
                    </button>`,
		},
		navigation: {
			start: `<nav class="navigation">`,
			end: `</nav>`,
		},
		links: {
			container: {
				start: `<ul class="nav-links-container">`,
				end: `</ul>`,
			},
			home: `<li class="nav-list-item"><a href="index.html" class="nav-link">Home</a></li>`,
			search: `<li class="nav-list-item"><a href="search.html" class="nav-link">Search</a></li>`,
			compare: `<li class="nav-list-item"><a href="compare.html" class="nav-link">Compare</a></li>`,
			about: `<li class="nav-list-item"><a href="about.html" class="nav-link">About</a></li>`,
			support: `<li class="nav-list-item"><a href="support.html" class="nav-link">Support</a></li>`,
			settings: `<li class="nav-list-item"><a class="nav-link active" id="settings">Settings</a></li>`,
		},
	},
};
