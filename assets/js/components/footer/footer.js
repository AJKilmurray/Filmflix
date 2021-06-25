import { footerConfig } from "./footerConfig.js";
const config = footerConfig.footer;
const footer = document.querySelector(".footer");
const footerHTML = `
    ${config.container.start}

    ${config.list.start}
    ${config.headers.first}
    ${config.listContent.first}
    ${config.list.end}

    ${config.list.start}
    ${config.headers.second}
    ${config.listContent.second}
    ${config.list.end}

    ${config.list.start}
    ${config.headers.third}
    ${config.listContent.third}
    ${config.list.end}

    ${config.logo.img}
    
    ${config.container.end}

    ${config.copyright.text}
`;

window.addEventListener("DOMContentLoaded", () => {
	renderComponent(footer, footerHTML, true, false);
});
