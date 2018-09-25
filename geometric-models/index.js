const simple = document.getElementById('simple')
const mosaic = document.getElementById('mosaic')
const maur = document.getElementById('maur')


const step = 0.01


const degreesToRadians = (degrees) => degrees * Math.PI / 180

const func = (t) => {
  const R = 50
  const m = 2.1
  const H = - R

  const X = (R*m + R) * Math.cos(t) + H * Math.cos(m*t + t)
  const Y = (R*m + R) * Math.sin(t) + H * Math.sin(m*t + t)

  return {x: X, y: Y}
}

const drawPlotWithLines = (context, centerX, centerY) => (func, interval, step) => {
  let dots = []
  let curr = interval.start

  while (curr < interval.end) {
    dots.push(func(curr))
    curr += step
  }

  context.beginPath()
  context.moveTo(centerX + dots[0].x, centerY + dots[0].y)

  for (let i = 1; i < dots.length; i++) {
    context.lineTo(centerX + dots[i].x, centerY + dots[i].y)
  }

  context.lineTo(centerX + dots[0].x, centerY + dots[0].y)
  context.stroke()
}

drawPlotWithLines(simple.getContext('2d'), simple.width / 2, simple.height / 2)(func, {start: 0, end: 20*Math.PI}, 0.001)


const drawMosaic = (context, centerX, centerY) => (func, interval, step) => (n, r) => {
  drawPlotWithLines(context, centerX, centerY)(func, interval, step)
  const angle = 360 / n
  for (let i = 0; i < n; i++) {
    const x = centerX + Math.cos(degreesToRadians(angle * i)) * r
    const y = centerY + Math.sin(degreesToRadians(angle * i)) * r

    drawPlotWithLines(context, x, y)(func, interval, step)
  }
}

drawMosaic(mosaic.getContext('2d'), mosaic.width / 2, mosaic.height / 2)(func, {start: 0, end: 20*Math.PI}, 0.01)(7, 100)

const drawMuar = (context, centerX, centerY) => (func, interval, step) => (offset, n) => {
  const start = centerX - (n/2 * offset)
  for(let i = 0; i < n; i++) {
    drawMosaic(context, start + i * offset, centerY)(func, interval, step)(4, 50)
  }
}

drawMuar(maur.getContext('2d'), maur.width / 2, maur.height / 2)(func, {start: 0, end: 20*Math.PI}, 0.01)(50, 10)
