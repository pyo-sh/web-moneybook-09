import Component from "@core/Component";
import { canvas } from "@core/CreateDom";
import categories from "@store/categories";
import controlDate from "@store/controlDate";
import recentSum from "@store/recentSum";
import { easeOutBounce } from "@utils/easing";
import { formatAmount } from "@utils/format";

const CANVAS_SCALE = 4;
const CANVAS_RADIUS = 3 * CANVAS_SCALE;
const CANVAS_PADDING = 13 * CANVAS_SCALE;
const CANVAS_WIDTH = 850 * CANVAS_SCALE;
const CANVAS_HEIGHT = 450 * CANVAS_SCALE;

const CANVAS_LINE_WIDTH = 1.4 * CANVAS_SCALE;
const CANVAS_FONT_SIZE = 12 * CANVAS_SCALE;
const CANVAS_LABEL_SIZE = CANVAS_FONT_SIZE + CANVAS_PADDING;

const FULL_MONTH = 12;
const MONTH_COLUMN = 2;
const CANVAS_NUMBER_OF_X_LINE = (FULL_MONTH - 1) * MONTH_COLUMN;
const CANVAS_NUMBER_OF_Y_LINE = 12;

const FRAME_MAX = 140;

const ROOT_STYLE = getComputedStyle(document.documentElement);

export default class LineChart extends Component {
    afterRender() {
        if (!recentSum.state.isLoading) {
            this.init();
            this.setSumYsAndValues();
            this.setLinearFunction();
            this.animate();
        }
    }

    bindState() {
        return [recentSum.state];
    }

    init() {
        const { element: chartElement } = this;

        const barCanvas = chartElement.getContext("2d");
        this.ctx = barCanvas;

        const chartStartX = 0 + CANVAS_PADDING;
        const chartStartY = 0 + CANVAS_PADDING;
        const chartEndX = CANVAS_WIDTH - CANVAS_PADDING;
        const chartEndY = CANVAS_HEIGHT - CANVAS_PADDING - CANVAS_LABEL_SIZE;
        const termX = (chartEndX - chartStartX) / CANVAS_NUMBER_OF_X_LINE;
        const termY = (chartEndY - chartStartY) / CANVAS_NUMBER_OF_Y_LINE;

        this.measurement = {
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            minX: chartStartX,
            minY: chartStartY,
            maxX: chartEndX,
            maxY: chartEndY,
            chartWidth: chartEndX - chartStartX,
            chartHeight: chartEndY - chartStartY,
            termX,
            termY,
            monthDistance: termX * MONTH_COLUMN,
        };
        this.frame = 0;
    }

    setSumYsAndValues() {
        const { chartHeight, termY } = this.measurement;

        const recentSumData = recentSum.state.value;
        const sortedDates = Object.keys(recentSumData).sort();
        const maxSum = Math.max(...Object.values(recentSumData).map(Number));

        this.sumPointYs = sortedDates.map((date) => {
            const heightPercent = 1 - recentSumData[date] / maxSum;
            const limitHeight = chartHeight - termY;
            const pointY = limitHeight * heightPercent + CANVAS_PADDING + termY;
            return pointY;
        });

        this.sumValues = sortedDates.map((date) => formatAmount(recentSumData[date]));
    }

    setLinearFunction() {
        const { monthDistance } = this.measurement;

        this.linearFunctions = [];
        const maxIndex = this.sumPointYs.length - 1;
        for (let i = 0; i < maxIndex; i++) {
            const x1 = i * monthDistance;
            const y1 = this.sumPointYs[i];
            const y2 = this.sumPointYs[i + 1];

            const slope = (y2 - y1) / monthDistance;
            const yIntercept = y1 - slope * x1;

            this.linearFunctions.push((x) => {
                return slope * x + yIntercept;
            });
        }

        this.linearFunction = (x) => {
            const xIndex = Math.min(Math.floor(x / monthDistance), maxIndex - 1);

            return this.linearFunctions[xIndex](x);
        };
    }

    drawCircle(x, y, color) {
        const barCanvas = this.ctx;
        barCanvas.beginPath();
        barCanvas.arc(x, y, CANVAS_RADIUS, 0, 2 * Math.PI);
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

    drawText(text, pointX, pointY, color, isBold = false) {
        const barCanvas = this.ctx;
        barCanvas.font = `${isBold ? "bold " : ""}${CANVAS_FONT_SIZE}px Noto Sans KR`;
        barCanvas.fillStyle = color;
        barCanvas.textAlign = "center";
        barCanvas.fillText(text, pointX, pointY);
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
        const COLOR_PRIMARY = ROOT_STYLE.getPropertyValue("--color-Primary");
        const COLOR_LABEL = ROOT_STYLE.getPropertyValue("--color-Label");

        const { minX, termX, maxY } = this.measurement;
        const month = controlDate.state.value.getMonth();
        const months = new Array(12).fill().map((_, i) => (((6 + month + i) % 12) + 1).toString());

        const labelHeight = maxY + CANVAS_LABEL_SIZE;
        months.forEach((targetMonth, i) => {
            const curX = i * termX * MONTH_COLUMN;
            const isToday = i === month;
            const color = isToday ? COLOR_PRIMARY : COLOR_LABEL;
            this.drawText(targetMonth, minX + curX, labelHeight, color, isToday);
        });
    }

    drawLineByIndex(index) {}

    animate() {
        const COLOR_CATEGORY = categories.getCategoryColorById(recentSum.state.category);
        const COLOR_LABEL = ROOT_STYLE.getPropertyValue("--color-Label");

        /* Clear Canvas */
        const { width, height, monthDistance } = this.measurement;
        this.ctx.clearRect(0, 0, width, height);
        this.drawCoordinatePlane();
        this.drawMonthsText();

        /* Draw Lines */
        const { minX, chartWidth } = this.measurement;
        const maxIndex = this.sumPointYs.length - 1;

        const deltaFrame = easeOutBounce(this.frame / FRAME_MAX);
        const updateX = Math.min(deltaFrame * chartWidth, maxIndex * monthDistance);
        const updateIndex = Math.floor(updateX / monthDistance);
        const { sumValues, linearFunction } = this;

        let currentX = 0;
        let currentY = linearFunction(0);
        const month = controlDate.state.value.getMonth();
        for (let i = 0; i < updateIndex; i++) {
            const isToday = i === month;
            const nextX = Math.min(i + 1, maxIndex) * monthDistance;
            const nextY = linearFunction(nextX);

            this.drawCircle(currentX + minX, currentY, COLOR_CATEGORY);
            this.drawLine(currentX + minX, currentY, nextX + minX, nextY, COLOR_CATEGORY);
            this.drawText(
                sumValues[i],
                currentX + minX,
                currentY,
                isToday ? COLOR_CATEGORY : COLOR_LABEL,
                isToday,
            );

            currentX = nextX;
            currentY = nextY;
        }

        this.drawCircle(currentX + minX, currentY, COLOR_CATEGORY);
        this.drawText(
            sumValues[updateIndex],
            currentX + minX,
            currentY,
            updateIndex === month ? COLOR_CATEGORY : COLOR_LABEL,
            updateIndex === month,
        );

        /* Draw Incomplete Line */
        if (this.frame < FRAME_MAX) {
            const currentX = updateIndex * monthDistance;
            const currentY = linearFunction(currentX);

            const nextX = updateX;
            const nextY = linearFunction(updateX);

            this.drawLine(currentX + minX, currentY, nextX + minX, nextY, COLOR_CATEGORY);
        } else {
            return;
        }

        requestAnimationFrame(() => {
            this.frame = this.frame + 1;
            this.animate();
        });
    }

    render() {
        // prettier-ignore
        return canvas({
            width: CANVAS_WIDTH,
            height: CANVAS_HEIGHT,
            style: `width: ${CANVAS_WIDTH / CANVAS_SCALE}px; height: ${CANVAS_HEIGHT / CANVAS_SCALE}px;`
        })();
    }
}
