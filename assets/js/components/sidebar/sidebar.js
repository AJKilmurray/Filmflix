window.addEventListener("DOMContentLoaded", () => {
	const settingsBtn = document.getElementById("settings");
	const sidebar = document.querySelector(".sidebar");

	settingsBtn.addEventListener("click", () => {
		toggleSidebar(sidebar, "sidebar-open");
	});
});
