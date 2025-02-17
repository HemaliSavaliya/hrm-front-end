// Helper function to convert RGB to HEX
const rgbToHex = (rgb) => {
    const rgbValues = rgb.match(/\d+/g).map(Number);
    return `#${((1 << 24) + (rgbValues[0] << 16) + (rgbValues[1] << 8) + (rgbValues[2])).toString(16).slice(1).toUpperCase()}`;
};

// Function to get chart colors from class
export const getChartColorsArray = (chartId) => {
    if (typeof window !== 'undefined') {
        const chartElement = document.getElementById(chartId);
        if (chartElement) {
            const colors = chartElement.dataset.chartColors;
            if (colors) {
                const parsedColors = JSON.parse(colors);
                return parsedColors.map((value) => {
                    const newValue = value.replace(/\s/g, "");
                    if (!newValue.includes("#")) {
                        const element = document.querySelector(newValue);
                        if (element) {
                            const styles = window.getComputedStyle(element);
                            return styles.backgroundColor || newValue;
                        } else {
                            const divElement = document.createElement('div');
                            divElement.className = newValue;
                            document.body.appendChild(divElement);
                            const styles = window.getComputedStyle(divElement);
                            document.body.removeChild(divElement);
                            return styles.backgroundColor.includes("#") ? styles.backgroundColor : rgbToHex(styles.backgroundColor);
                        }
                    } else {
                        return newValue;
                    }
                });
            } else {
                console.warn(`chart-colors attribute not found on: ${chartId}`);
                return [];
            }
        }
    }
    return [];
};
