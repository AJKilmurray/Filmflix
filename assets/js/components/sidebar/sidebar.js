window.addEventListener("DOMContentLoaded", () => {
	const settingsBtn = document.getElementById("settings");
	const sidebar = document.querySelector(".sidebar");

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
});
