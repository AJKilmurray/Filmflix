import { navbar } from "./navbarConfig.js";
const { container, heading, navigation, links } = navbar.navbar;
const navbarContainer = document.querySelector(".navbar");
let navbarHTML;

if (window.location.href.includes("index")) {
	navbarHTML = `
        ${container.start}

        ${heading.start}
        ${heading.content}
        ${heading.end}

        ${navigation.start}
        ${links.container.start}
        ${links.search}
        ${links.compare}
        ${links.about}
        ${links.support}
        ${links.settings}
        ${links.container.end}
        ${navigation.end}

        ${container.end}
    `;
} else if (window.location.href.includes("search")) {
	navbarHTML = `
        ${container.start}

        ${heading.start}
        ${heading.content}
        ${heading.end}

        ${navigation.start}
        ${links.container.start}
        ${links.home}
        ${links.compare}
        ${links.about}
        ${links.support}
        ${links.settings}
        ${links.container.end}
        ${navigation.end}

        ${container.end}
    `;
} else if (window.location.href.includes("compare")) {
	navbarHTML = `
        ${container.start}

        ${heading.start}
        ${heading.content}
        ${heading.end}

        ${navigation.start}
        ${links.container.start}
        ${links.home}
        ${links.search}
        ${links.about}
        ${links.support}
        ${links.settings}
        ${links.container.end}
        ${navigation.end}

        ${container.end}
    `;
} else if (window.location.href.includes("about")) {
	navbarHTML = `
        ${container.start}

        ${heading.start}
        ${heading.content}
        ${heading.end}

        ${navigation.start}
        ${links.container.start}
        ${links.home}
        ${links.search}
        ${links.compare}
        ${links.support}
        ${links.settings}
        ${links.container.end}
        ${navigation.end}

        ${container.end}
    `;
} else if (window.location.href.includes("support")) {
	navbarHTML = `
        ${container.start}

        ${heading.start}
        ${heading.content}
        ${heading.end}

        ${navigation.start}
        ${links.container.start}
        ${links.home}
        ${links.search}
        ${links.compare}
        ${links.about}
        ${links.settings}
        ${links.container.end}
        ${navigation.end}

        ${container.end}
    `;
} else {
	navbarHTML = `
        ${container.start}

        ${heading.start}
        ${heading.content}
        ${heading.end}

        ${navigation.start}
        ${links.container.start}
        ${links.search}
        ${links.compare}
        ${links.about}
        ${links.support}
        ${links.settings}
        ${links.container.end}
        ${navigation.end}

        ${container.end}
    `;
}
renderComponent(navbarContainer, navbarHTML, true, false);
