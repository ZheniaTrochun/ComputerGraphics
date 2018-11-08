const simple = document.getElementById('simple')
const mosaic = document.getElementById('mosaic')
const muar = document.getElementById('muar')


const drawCircle = (context) => (centerX, centerY, r) => {
  context.beginPath()
  context.arc(centerX, centerY, r, 0, 2 * Math.PI, false)
  context.lineWidth = 1
  context.strokeStyle = 'black'
  context.stroke()
}

const calculateDots = (centerX, centerY, r) => {
  const alpha = r / Math.sqrt(2)
  return [
    { x: (centerX - alpha), y: (centerY + alpha) },
    { x: (centerX + alpha), y: (centerY + alpha) },
    { x: (centerX + alpha), y: (centerY - alpha) },
    { x: (centerX - alpha), y: (centerY - alpha) }
  ]
}

const crossCircle = (context) => (centerX, centerY, r) => {
  const dots = calculateDots(centerX, centerY, r)

  context.beginPath()

  context.moveTo(dots[0].x, dots[0].y)
  context.lineTo(dots[2].x, dots[2].y)

  context.moveTo(dots[1].x, dots[1].y)
  context.lineTo(dots[3].x, dots[3].y)

  context.stroke()
}

const drawCrossedCircle = (context) => {
  const circleDrawer = drawCircle(context)

  return (centerX, centerY, r) => {
    circleDrawer(centerX, centerY, r)
    crossCircle(context)(centerX, centerY, r)
  }
}

const degreesToRadians = (degrees) => degrees * Math.PI / 180

const drawMosaic = (drawer, centerX, centerY, r1) => (n, r) => {
  drawer(centerX, centerY, r1)

  const angle = 360 / n
  for (let i = 0; i < n; i++) {
    const x = centerX + Math.cos(degreesToRadians(angle * i)) * r
    const y = centerY + Math.sin(degreesToRadians(angle * i)) * r

    drawer(x, y, r1)
  }
}

const drawMuar = (drawer, centerX, centerY, r) => {
  const n = 10
  const offset = 50
  const start = centerX - (n / 2 * offset)
  for(let i = 0; i < 10; i++) {
    drawMosaic(drawer, start + i * 50, centerY, 100)(50, 100)
  }
}


drawCrossedCircle(simple.getContext('2d'))(simple.width / 2, simple.height / 2, 100)

drawMosaic(drawCrossedCircle(mosaic.getContext('2d')), mosaic.width / 2, mosaic.height / 2, 100)(100, 100)

drawMuar(drawCrossedCircle(muar.getContext('2d')), muar.width / 2, muar.height / 2, 100)
