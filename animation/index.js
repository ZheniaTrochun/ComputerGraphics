const cos = Math.cos;
const sin = Math.sin;

const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext('2d');
context.strokeStyle = 'blue';

let animationIntervalId = null;

function resetTransform() {
  context.setTransform(1, 0, 0, 1, 0, 0);
  context.translate(canvas.width / 2, canvas.height / 2);
}

function clearScreen() {
  context.save();
  resetTransform();
  context.clearRect(-canvas.width / 2.0, -canvas.height / 2.0, canvas.width, canvas.height);
  context.restore();
}

function resetScene() {
  if (animationIntervalId) clearInterval(animationIntervalId);
  clearScreen();
  resetTransform();
}

const functionX = (x0, a, b, r, n) => (t) => x0 + (r*a + r) * Math.cos(t) + b * Math.cos(a*t + t)// a*cos(b*t)*cos(t);
const functionY = (y0, a, b, r, n) => (t) => y0 + (r*a + r) * Math.sin(t) + b * Math.sin(a*t + t) // a*cos(b*t)*sin(t);

function strokeGeometric(x0, y0, a, b, r, n, points) {
  const x = functionX(x0, a, b, r, n);
  const y = functionY(y0, a, b, r, n);

  const range = n * Math.PI;
  const increment = range / points;

  context.save();
  context.beginPath();
  context.moveTo(x(0), y(0));

  for (let t = increment; t <= range; t += increment) {
    context.lineTo(x(t), y(t));
  }
  context.closePath();
  context.stroke();
  context.restore();
}

function drawBall(x, y, radius, style) {
  context.save();
  context.fillStyle = style;
  context.beginPath();
  context.arc(x, y, radius, 0, 2 * Math.PI);
  context.closePath();
  context.fill();
  context.restore();
}

function draw(delay = 10) {
  let frame = 0;

  const redTrajectory = {
    centerX: -100,
    centerY: 0,
    a: 2.1,
    b: -50,
    r: 50,
    n: 20,
    points: 1000,
    color: 'violet'
  };

  const blueTrajectory = {
    centerX: 130,
    centerY: 0,
    a: 2.1,
    b: -30,
    r: 30,
    n: 20,
    points: 1000,
    color: 'orange'
  };


  /**
   * There are different types of inertness: flex, static, explosion
   * flex : if interacts, changes move direction
   * static : no interactions
   * explosion : if interacts, disappears
   **/
  let greenBall = {
    initialPos: 0,
    radius: 10,
    inertness: 'explosion',
    direction: 1,
    velocity: 0.8,
    color: 'red',
    t: 0,
    x: null,
    y: null,
    xt: functionX(redTrajectory.centerX, redTrajectory.a, redTrajectory.b, redTrajectory.r, redTrajectory.n),
    yt: functionY(redTrajectory.centerY, redTrajectory.a, redTrajectory.b, redTrajectory.r, redTrajectory.n),
  };

  let yellowBall = {
    initialPos: 0,
    radius: 10,
    inertness: 'explosion',
    direction: -1,
    velocity: 1.1,
    color: 'blue',
    t: 0,
    x: null,
    y: null,
    xt: functionX(blueTrajectory.centerX, blueTrajectory.a, blueTrajectory.b, blueTrajectory.r, blueTrajectory.n),
    yt: functionY(blueTrajectory.centerY, blueTrajectory.a, blueTrajectory.b, blueTrajectory.r, blueTrajectory.n),
  };

  const drawImpl = () => {
    clearScreen();
    context.save();

    context.strokeStyle = redTrajectory.color;
    strokeGeometric(...Object.values(redTrajectory));

    context.strokeStyle = blueTrajectory.color;
    strokeGeometric(...Object.values(blueTrajectory));

    if (greenBall) {
      greenBall.t += greenBall.direction * greenBall.velocity * Math.PI / 180;
      greenBall.x = greenBall.xt(greenBall.t);
      greenBall.y = greenBall.yt(greenBall.t);
    }

    if (yellowBall) {
      yellowBall.t += yellowBall.direction * yellowBall.velocity * Math.PI / 180;
      yellowBall.x = yellowBall.xt(yellowBall.t);
      yellowBall.y = yellowBall.yt(yellowBall.t);
    }

    if (greenBall && yellowBall) {
      if (Math.abs(greenBall.x - yellowBall.x) <= greenBall.radius + yellowBall.radius &&
        Math.abs(greenBall.y - yellowBall.y) <= greenBall.radius + yellowBall.radius) {
        if (greenBall.inertness === 'flex') greenBall.direction = -greenBall.direction;
        else if (greenBall.inertness === 'explosion') greenBall = null;

        if (yellowBall.inertness === 'flex') yellowBall.direction = -yellowBall.direction;
        else if (yellowBall.inertness === 'explosion') yellowBall = null;

        console.log('Hit!');
      }
    }

    if (greenBall) drawBall(greenBall.x, greenBall.y, greenBall.radius, greenBall.color);
    if (yellowBall) drawBall(yellowBall.x, yellowBall.y, yellowBall.radius, yellowBall.color);

    context.restore();
    ++frame;
  };


  resetScene();
  setInterval(drawImpl, delay);
}

draw();
