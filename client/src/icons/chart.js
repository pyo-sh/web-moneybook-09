import svgDomCreator from "@utils/svgDomCreator";

const chartIcon = (color = "#222222", width = 24, height = 24) => {
    return svgDomCreator(`
        <svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 24 24" fill="none">
            <path d="M18 20V10" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 20V4" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M6 20V14" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
    `);
};

export default chartIcon;
