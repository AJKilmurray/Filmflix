window.addEventListener("DOMContentLoaded", () => {
	const settingsBtn = document.getElementById("settings");
	const sidebar = document.querySelector(".sidebar");

	console.log(sidebar);
	settingsBtn.addEventListener("click", () => {
		console.log(sidebar);
		toggleSidebar(sidebar, "sidebar-open");
	});
});
