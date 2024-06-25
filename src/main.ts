import "./style.css";
import { Ball } from "./types/types";

const canvasElement: HTMLCanvasElement | null = document.querySelector("canvas"),
	ctx: CanvasRenderingContext2D | null | undefined = canvasElement?.getContext("2d");

let textElement: HTMLElement | null = document.querySelector(".text"),
	showText: boolean = true;

if (canvasElement && ctx) {
	canvasElement.height = window.innerHeight - 70;
	canvasElement.width = document.documentElement.clientWidth;

	canvasElement.addEventListener("click", (event) => {
		if (showText) hideText();
		const newBall: Ball = createBall(event.x, event.y, 2, 70, "rgba(255, 0, 0)");
		balls.push(newBall);
	});
}

const hideText = () => {
	if (textElement) {
		textElement.style.animationPlayState = "paused";
		textElement.style.opacity = "0";
		textElement.style.display = "none";
		showText = false;
	}
};

const acceleration: number = 1,
	friction: number = 0.92;

let balls: Ball[] = [];

const createBall = (x: number, y: number, dy: number, radius: number, color: string): Ball => ({
	x: x,
	y: y,
	prevY: 0,
	dy: dy,
	radius: radius,
	color: color,
	draw() {
		if (ctx) {
			ctx.beginPath();
			ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
			let grdRadial = ctx.createRadialGradient(this.x, this.y, this.radius, this.x - 100, this.y - 100, 50);
			grdRadial.addColorStop(0, "#B0050E");
			grdRadial.addColorStop(1, "#F5D0D2");
			ctx.fillStyle = grdRadial;
			ctx.fill();
		}
	},
	update() {
		if (canvasElement && ctx) {
			this.prevY = this.y;

			if (this.y + this.radius > canvasElement.height) {
				this.dy = -this.dy * friction;
				this.y = canvasElement.height - this.radius;
			} else {
				this.dy += acceleration;
				this.y += this.dy;
			}

			this.draw();
		}
	},
});

let ball: Ball;
if (canvasElement) {
	ball = createBall(canvasElement.width / 2, canvasElement.height / 2, 2, 70, "purple");
	balls.push(ball);
}

function animate() {
	if (ctx) {
		requestAnimationFrame(animate);
		ctx.clearRect(0, 0, innerWidth, innerHeight);

		for (let i = 0; i < balls.length; i++) {
			balls[i].update();
		}
	}
}

animate();
