import "./style.css";
import { Ball } from "./types";

const canvasElement: HTMLCanvasElement | null = document.querySelector("canvas"),
	ctx: CanvasRenderingContext2D | null | undefined = canvasElement?.getContext("2d");

if (canvasElement && ctx) {
	canvasElement.height = window.innerHeight;
	canvasElement.width = document.documentElement.clientWidth;
}

const createBall = (x: number, y: number, dy: number, radius: number, color: string): Ball => ({
	x: x,
	y: y,
	dy: dy,
	radius: radius,
	color: color,
	draw() {
		if (ctx) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			ctx.fillStyle = this.color;
			ctx.fill();
		}
	},
	update() {
		if (canvasElement && ctx) {
			if (this.y + this.radius > canvasElement.height) this.dy = -this.dy;
			this.y += this.dy;
			this.draw();
		}
	},
});

let ball: Ball;
if (canvasElement) {
	ball = createBall(canvasElement.width / 2, canvasElement.height / 2, 5, 100, "pink");
}

function animate() {
	if (ctx) {
		requestAnimationFrame(animate);
		ctx.clearRect(0, 0, innerWidth, innerHeight);

		ball.update();
	}
}

animate();
