let square = 25;
let rectXSize = square;
let rectYSize = square;
let isClicked = false;

let mouseX = 0;
let mouseY = 0;

class Particle {
  constructor(pos_x, pos_y, vel_x, vel_y, size_x, size_y) {
    this.pos_x = pos_x;
    this.pos_y = pos_y;
    this.vel_x = vel_x;
    this.vel_y = vel_y;
    this.size_x = size_x;
    this.size_y = size_y;
    this.mass = (size_x * size_y) / 2.5;
  }

  border(ctx) {
    if (this.pos_y + this.size_y > ctx.canvas.height) {
      this.pos_y = ctx.canvas.height - this.size_y;
    }
    if (this.pos_y < 0) {
      this.pos_y = 0;
    }
    if (this.pos_x + this.size_x > ctx.canvas.width) {
      this.pos_x = ctx.canvas.width - this.size_x;
    }
    if (this.pos_x < 0) {
      this.pos_x = 0;
    }
  }

  mouse(ctx, x, y) {
    this.vel_x = 0;
    if (this.vel_y < 0) {
      this.vel_y = 0;
    }
    const force_x = this.pos_x - x;
    const force_y = (this.pos_y - y) * 3.5;
    this.move(ctx, force_x, force_y);
  }

  move(ctx, force_x, force_y) {
    const acceleration = { x: force_x / this.mass, y: force_y / this.mass };
    this.vel_x += acceleration.x;
    this.vel_y += acceleration.y;
    this.pos_x -= this.vel_x;
    this.pos_y -= this.vel_y;
    this.border(ctx);
  }

  get_dest() {
    return { x: this.pos_x, y: this.pos_y };
  }
}

let gameInstance;

export function startGame(ctx, canvas) {
  isClicked = isClicked;
  mouseX = 0;
  mouseY = 0;

  const cube = new Particle((ctx.canvas.width / 2) - (20 / 2), 40 - (20 / 2), 0, 0, 20, 20);
  let blockX = 25 - (rectXSize / 2);
  let blockY = 25 - (rectYSize / 2);

  function getMouse(event) {
    const rect = canvas.getBoundingClientRect();
    mouseX = event.clientX - rect.left;
    mouseY = event.clientY - rect.top;
  }

  function handleClick(event) {
    isClicked = true;
  }

  function gameLoop() {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    if (isClicked) {
      blockX = mouseX - (rectXSize / 2);
      blockY = mouseY - (rectYSize / 2);
      cube.mouse(ctx, mouseX, mouseY);
      isClicked = false;
    }

    if (blockY < (ctx.canvas.height - rectYSize)) {
      blockY += 5;
    }

    cube.move(ctx, 0, -9.81);
    const pos = cube.get_dest();
    ctx.fillStyle = 'red';
    ctx.fillRect(pos.x, pos.y, cube.size_x, cube.size_y);

    requestAnimationFrame(gameLoop);
  }

  canvas.removeEventListener('click', handleClick);
  canvas.removeEventListener('mousemove', getMouse);

  canvas.addEventListener('click', handleClick);
  canvas.addEventListener('mousemove', getMouse);

  gameLoop();

  gameInstance = { stop: () => {
    canvas.removeEventListener('click', handleClick);
    canvas.removeEventListener('mousemove', getMouse);
    isClicked = false;
  }};
}

export function stop() {
  if (gameInstance) {
    gameInstance.stop();
    gameInstance = null;
  }
}

export function resize(canvas) {
  // Adjusting block position if out of bounds (if needed)
}