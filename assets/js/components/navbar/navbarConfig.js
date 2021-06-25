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
			content: `<ul class="nav-links-container">
            <li class="nav-list-item"><a href="search.html" class="nav-link">Search</a></li>
            <li class="nav-list-item"><a href="compare.html" class="nav-link">Compare</a></li>
            <li class="nav-list-item"><a href="index.html" class="nav-link">About</a></li>
            <li class="nav-list-item"><a href="#" class="nav-link">Support</a></li>
            <li class="nav-list-item"><a href="#" class="nav-link active" id="settings">Settings</a></li>
        </ul>`,
		},
	},
};

/* <div class="container nav-container">
			<div class="nav-heading">
				<a href="#" class="logo-link">
					<img src="assets/images/logo.png" alt="Filmflix Logo" class="logo">
				</a>
				<button class="nav-toggle">
					<i class="fas fa-bars fa-2x hamburger-menu"></i>
				</button>
			</div>
			<nav class="navigation">
				<ul class="nav-links-container">
					<li class="nav-list-item"><a href="search.html" class="nav-link">Search</a></li>
					<li class="nav-list-item"><a href="compare.html" class="nav-link">Compare</a></li>
					<li class="nav-list-item"><a href="index.html" class="nav-link">About</a></li>
					<li class="nav-list-item"><a href="#" class="nav-link">Support</a></li>
					<li class="nav-list-item"><a href="#" class="nav-link active" id="settings">Settings</a></li>
				</ul>
			</nav>
		</div> */
