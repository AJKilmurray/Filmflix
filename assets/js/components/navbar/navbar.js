import { navbar } from "./navbarConfig.js";
const config = navbar.navbar;
const container = document.querySelector(".navbar");
const navbarHTML = `
    ${config.container.start}

    ${config.heading.start}
    ${config.heading.content}
    ${config.heading.end}

    ${config.navigation.start}
    ${config.navigation.content}
    ${config.navigation.end}

    ${config.container.end}
`;

renderComponent(container, navbarHTML, true, false);
