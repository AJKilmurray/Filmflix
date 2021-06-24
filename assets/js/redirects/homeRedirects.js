const redirectBtns = document.querySelectorAll(".redirect");

redirectBtns.forEach((btn) => {
	btn.addEventListener("click", (clickedBtn) => {
		redirectToPage(`${clickedBtn.target.dataset.redirect}.html`);
	});
});
