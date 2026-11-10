export function drawStar(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  spikes = 5,
  outerRadius = 6,
  innerRadius = 3
) {
  let rot = (Math.PI / 2) * 3;
  let cx = x;
  let cy = y;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerRadius);
  for (let i = 0; i < spikes; i++) {
    cx = x + Math.cos(rot) * outerRadius;
    cy = y + Math.sin(rot) * outerRadius;
    ctx.lineTo(cx, cy);
    rot += step;

    cx = x + Math.cos(rot) * innerRadius;
    cy = y + Math.sin(rot) * innerRadius;
    ctx.lineTo(cx, cy);
    rot += step;
  }
  ctx.lineTo(x, y - outerRadius);
  ctx.closePath();
  ctx.fill();
}

export function drawHeart(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size = 8
) {
  const s = size / 2;
  ctx.beginPath();
  ctx.moveTo(x, y + s / 4);
  ctx.quadraticCurveTo(x, y, x + s / 2, y);
  ctx.quadraticCurveTo(x + s, y, x + s, y + s / 2);
  ctx.quadraticCurveTo(x + s, y + s, x, y + s * 1.5);
  ctx.quadraticCurveTo(x - s, y + s, x - s, y + s / 2);
  ctx.quadraticCurveTo(x - s, y, x - s / 2, y);
  ctx.quadraticCurveTo(x, y, x, y + s / 4);
  ctx.closePath();
  ctx.fill();
}

export function drawShape(
  ctx: CanvasRenderingContext2D,
  shape: string,
  size: number,
  color: string
) {
  ctx.fillStyle = color;
  if (shape === "circle") {
    ctx.beginPath();
    ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
    ctx.fill();
  } else if (shape === "star") {
    drawStar(ctx, 0, 0, 5, size, size * 0.5);
  } else if (shape === "heart") {
    drawHeart(ctx, 0, 0, size * 1.2);
  } else if (shape.length > 0 && /[\p{Emoji}\u200d]+/u.test(shape)) {
    ctx.font = `${Math.round(size * 1.8)}px sans-serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(shape, 0, 0);
  } else {
    // Default square / rectangle ribbon
    ctx.fillRect(-size / 2, -size / 2, size, size);
  }
}
