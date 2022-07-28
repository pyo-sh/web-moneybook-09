import Component from "@core/Component";
import { canvas } from "@core/CreateDom";
import controlDate from "@store/controlDate";

const CANVAS_SCALE = 4;
const CANVAS_PADDING = 13 * CANVAS_SCALE;
const CANVAS_WIDTH = 850 * CANVAS_SCALE;
const CANVAS_HEIGHT = 450 * CANVAS_SCALE;

const CANVAS_LINE_WIDTH = 1.4 * CANVAS_SCALE;
const CANVAS_FONT_SIZE = 12 * CANVAS_SCALE;
const CANVAS_LABEL_SIZE = CANVAS_FONT_SIZE + CANVAS_PADDING;

const FULL_MONTH = 12;
const TERM_MONTH = 2;
const CANVAS_NUMBER_OF_X_LINE = (FULL_MONTH - 1) * TERM_MONTH;
const CANVAS_NUMBER_OF_Y_LINE = 12;

const ROOT_STYLE = getComputedStyle(document.documentElement);

export default class LineChart extends Component {
    afterRender() {
        this.init();
        // this.animate();
    }

    bindState() {
        // TODO : 월 해당하는 카테고리 지출 Store
        return [];
    }

    init() {
        const { element: chartElement } = this;

        const barCanvas = chartElement.getContext("2d");
        this.ctx = barCanvas;

        const chartStartWidth = 0 + CANVAS_PADDING;
        const chartStartHeight = 0 + CANVAS_PADDING;
        const chartWidth = CANVAS_WIDTH - CANVAS_PADDING;
        const chartHeight = CANVAS_HEIGHT - CANVAS_PADDING - CANVAS_LABEL_SIZE;
        const termX = (chartWidth - chartStartWidth) / CANVAS_NUMBER_OF_X_LINE;
        const termY = (chartHeight - chartStartHeight) / CANVAS_NUMBER_OF_Y_LINE;

        this.measurement = {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            minX: chartStartWidth,
            minY: chartStartHeight,
            maxX: chartWidth,
            maxY: chartHeight,
            termX: termX,
            termY: termY,
        };
        // Clear
        const { width, height } = this.measurement;
        barCanvas.clearRect(0, 0, width, height);
        this.drawCoordinatePlane();
        this.drawMonthsText();
    }

    drawCircle(x, y, color) {
        const barCanvas = this.ctx;
        const radius = 4;
        barCanvas.beginPath();
        barCanvas.arc(x, y, radius, 0, 2 * Math.PI);
        barCanvas.fillStyle = color;
        barCanvas.fill();
        barCanvas.stroke();
        barCanvas.closePath();
    }

    drawLine(startX, startY, endX, endY, color, lineWidth = CANVAS_LINE_WIDTH) {
        const barCanvas = this.ctx;
        barCanvas.beginPath();
        barCanvas.moveTo(startX, startY);
        barCanvas.lineTo(endX, endY);
        barCanvas.strokeStyle = color;
        barCanvas.lineWidth = lineWidth;
        barCanvas.stroke();
        barCanvas.closePath();
    }

    drawText(text, x, y, isToday) {
        const COLOR_LABEL = ROOT_STYLE.getPropertyValue("--color-Label");
        const COLOR_PRIMARY = ROOT_STYLE.getPropertyValue("--color-Primary");

        const barCanvas = this.ctx;
        barCanvas.font = `${isToday ? "bold " : ""}${CANVAS_FONT_SIZE}px Noto Sans KR`;
        barCanvas.fillStyle = isToday ? COLOR_PRIMARY : COLOR_LABEL;
        barCanvas.fillText(text, x, y);
    }

    drawCoordinatePlane() {
        const COLOR_BACKGROUND = ROOT_STYLE.getPropertyValue("--color-Background");
        const { minX, minY, termX, termY, maxX, maxY } = this.measurement;

        for (let i = 0; i <= CANVAS_NUMBER_OF_X_LINE; i++) {
            const curX = i * termX + minX;
            this.drawLine(curX, minY, curX, maxY, COLOR_BACKGROUND);
        }
        for (let i = 0; i <= CANVAS_NUMBER_OF_Y_LINE; i++) {
            const curY = i * termY + minY;
            this.drawLine(minX, curY, maxX, curY, COLOR_BACKGROUND);
        }
    }

    drawMonthsText() {
        const { minX, termX, maxY } = this.measurement;
        const month = controlDate.state.value.getMonth();
        const months = new Array(12).fill().map((_, i) => (((6 + month + i) % 12) + 1).toString());

        const labelHeight = maxY + CANVAS_LABEL_SIZE;
        months.forEach((month, i) => {
            const isToday = i === month;
            const curX = i * termX * TERM_MONTH;
            this.drawText(month, minX + curX, labelHeight, isToday);
        });
    }

    anitmate() {}

    render() {
        // prettier-ignore
        return canvas({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            style: `width: ${CANVAS_WIDTH / CANVAS_SCALE}px; height: ${CANVAS_HEIGHT / CANVAS_SCALE}px;`
        })();
    }
}
