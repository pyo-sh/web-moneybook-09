import { svg } from "@core/CreateDom";

const checkIcon = (color = "#222222") => {
    return svg({
        xmlns: "http://www.w3.org/2000/svg",
        width: "24",
        height: "24",
        viewBox: "0 0 24 24",
        fill: "none",
        innerHTML: `
            <path d="M21 6L8.625 18L3 12.5455" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        `,
    })();
};

export default checkIcon;
