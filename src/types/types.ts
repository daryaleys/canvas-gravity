export type Ball = {
	x: number;
	y: number;
	prevY: number;
	dy: number;
	radius: number;
	color: string;
	draw(): void;
	update(): void;
};
