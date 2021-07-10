window.addEventListener("DOMContentLoaded", () => {
	const settingsBtn = document.getElementById("settings");
	const sidebar = document.querySelector(".sidebar");
	const closeSidebar = document.querySelector(".close-sidebar");

	document.addEventListener("click", (e) => {
		if (sidebar.classList.contains("sidebar-open")) {
			if (
				e.target !== settingsBtn &&
				e.target !== sidebar &&
				!sidebar.contains(e.target)
			) {
				toggleSidebar(sidebar, "sidebar-open");
			}
		}
	});

	settingsBtn.addEventListener("click", () => {
		toggleSidebar(sidebar, "sidebar-open");
	});

	closeSidebar.addEventListener("click", () => {
		sidebar.classList.remove("sidebar-open");
	});
});
