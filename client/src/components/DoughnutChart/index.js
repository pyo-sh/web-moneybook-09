import Component from "@core/Component";
import { canvas } from "@core/CreateDom";
import categories from "@store/categories";

const SPACE_COLOR = "white";
// const SPACE_COLOR = "black";

export default class DoughnutChart extends Component {
    afterRender() {
        this.init();
        this.calculateCumulativeRadian();
        this.animate();
    }

    init() {
        this.canvas = this.element;
        this.canvas.size = 255;
        this.canvas.style.width = `${this.canvas.size}px`;
        this.canvas.style.height = `${this.canvas.size}px`;
        this.canvas.width = this.canvas.size * 2;
        this.canvas.height = this.canvas.size * 2;
        this.ctx = this.canvas.getContext("2d");

        this.reconciliationValue = 0.005;
        this.centerX = this.canvas.width / 2;
        this.centerY = this.canvas.height / 2;
        this.radius = this.canvas.width / 2;
        this.maxRadian = Math.PI * 2;

        this.frame = 1;
        this.totalFrame = 60;

        this.currentRadian = 0;
        this.updatedRadian = 0;
        this.cumulativeIndex = 0;
    }

    calculateCumulativeRadian() {
        const { historySumMap, totalExpenditure } = this.props;
        let prevRadian = 0;

        const cumulativeRadianMap = Object.entries(historySumMap).map(([categoryId, subTotal]) => {
            const cumulativeRadian = (subTotal / totalExpenditure) * this.maxRadian + prevRadian;
            prevRadian = cumulativeRadian;
            return { categoryId, cumulativeRadian };
        });

        this.cumulativeRadianList = cumulativeRadianMap;
    }

    calculateNextRadian() {
        function easeInOutQuint(x) {
            return x < 0.5 ? 16 * x * x * x * x * x : 1 - Math.pow(-2 * x + 2, 5) / 2;
        }
        const delta = this.frame / this.totalFrame;
        return easeInOutQuint(delta) * this.maxRadian;
    }
    animate() {
        if (this.currentRadian >= this.maxRadian - this.reconciliationValue) {
            this.cumulativeIndex = 0;
            return;
        }

        // const updatedRadian = this.currentRadian + delta;
        const updatedRadian = this.calculateNextRadian();
        this.updatedRadian = updatedRadian > this.maxRadian ? this.maxRadian : updatedRadian;
        this.color = this.getCurrentColor();

        this.draw();

        this.currentRadian = this.updatedRadian;

        requestAnimationFrame(() => {
            this.frame++;
            this.animate();
        });
    }

    getCurrentColor() {
        const { categoryId, cumulativeRadian } = this.cumulativeRadianList[this.cumulativeIndex];

        if (this.currentRadian > cumulativeRadian) {
            this.cumulativeIndex += 1;
            const { categoryId } = this.cumulativeRadianList[this.cumulativeIndex];

            return categories.getCategoryColorById(categoryId);
        } else {
            return categories.getCategoryColorById(categoryId);
        }
    }

    draw() {
        // 만약 현재 radian이 cumulativeRadian보다 크다면 index를 바꾼다.
        // update된 값이 cumurativeRadian보다 작다면
        // 맥스지칭
        this.cumulativeRadianList.forEach(() => {});

        // let currentRadian = this.currentRadian;
        let updatedRadian = this.updatedRadian;

        while (this.cumulativeIndex < this.cumulativeRadianList.length) {
            // cumulativeIndex의 범위보다 작은지 확인한다.그러면 그냥 랜더링 한다.
            const { categoryId, cumulativeRadian } =
                this.cumulativeRadianList[this.cumulativeIndex];
            const color = categories.getCategoryColorById(categoryId);
            if (updatedRadian <= cumulativeRadian) {
                this.drawPieSlice(
                    this.radius,
                    this.currentRadian - this.reconciliationValue,
                    this.updatedRadian,
                    color,
                );
                break;
            }

            if (updatedRadian > cumulativeRadian) {
                // 다음을 본다.
                this.drawPieSlice(
                    this.radius,
                    this.currentRadian - this.reconciliationValue,
                    cumulativeRadian,
                    color,
                );
                this.cumulativeIndex++;
                this.currentRadian = cumulativeRadian;
                // const { categoryId,cumulativeRadian } = this.cumulativeRadianList[this.cumulativeIndex];
                // const color = categories.getCategoryColorById(categoryId)
            }
        }

        // const { cumulativeRadian } = this.cumulativeRadianList[this.cumulativeIndex];

        // if (this.currentRadian > cumulativeRadian) {
        //     this.cumulativeIndex += 1;
        // }

        // // draw pie
        // this.drawPieSlice(
        //     this.radius,
        //     this.currentRadian - this.reconciliationValue,
        //     this.updatedRadian,
        //     this.color,
        // );
        // draw hole
        this.drawPieSlice(this.radius / 2, 0, this.maxRadian, SPACE_COLOR);
    }

    bindState() {
        return [categories.state];
    }

    drawPieSlice(radius, startAngle, endAngle, color) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.centerX, this.centerY);
        this.ctx.arc(this.centerX, this.centerY, radius, startAngle, endAngle);
        this.ctx.fillStyle = color;
        this.ctx.fill();
        this.ctx.closePath();
    }

    render() {
        return canvas({ id: "doughnutChart" })();
    }
}
