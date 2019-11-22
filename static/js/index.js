let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

let width = screen.width
let height = screen.height

// number of pixels in the drawing (configurable)
let numXPixels = 48
let numYPixels = 48

// variables for scaling
let scale = 15
const MIN_SCALE = 10
const MAX_SCALE = 20

let numPixels = 0
let xcoords = []
let ycoords = []

let grid = true

canvas.addEventListener("click", function () {
   console.log("click")
})

// for zooming in/out
canvas.addEventListener("wheel", function (e) { // add a buffer/tick
   // inc/dec according to scroll & clamp result
   scale = clamp((e.deltaY > 0) ? scale - 1 : scale + 1, MIN_SCALE, MAX_SCALE)
   redraw()
})

// adds a pixel at the specified coordinates
function addPixel(x,y) {
   xcoords.push(x)
   ycoords.push(y)
   numPixels++
}

redraw()

function redraw() {
   ctx.clearRect(0, 0, width, height)
   for(let i=0;i<numPixels;i++)
      drawPixel(xcoords[i],ycoords[i])
   drawGrid()
}

// draws a pixel at the specified coordinates
function drawPixel(x, y) {
   ctx.fillRect(x * scale, y * scale, scale, scale)
}

// draws the reference grid
function drawGrid() {
   if (!grid) return
   ctx.lineWidth = 1
   ctx.strokeStyle = "#eaeaea"   // style guide ;)
   for(let r=0;r<=numYPixels;r++) {
      ctx.beginPath()
      ctx.moveTo(0, scale * r + 0.5)
      ctx.lineTo(scale * numXPixels, scale * r + 0.5)
      ctx.stroke()
      ctx.closePath()
   }
   for(let c=0;c<=numXPixels;c++) {
      ctx.beginPath()
      ctx.moveTo(scale * c + 0.5, 0)
      ctx.lineTo(scale * c + 0.5, scale * numYPixels)
      ctx.stroke()
      ctx.closePath()
   }
}

// clipping
function setNumPixels(xNum, yNum) {
   let anchor = 1 // actually get the selected anchor

   let clippedPixels = clipPixels(xNum, yNum, numXPixels, numYPixels, xcoords, ycoords, anchor)

   numXPixels = xNum
   numYPixels = yNum
   numPixels = clippedPixels.pixelsLeft
   xcoords = clippedPixels.newXcoords
   ycoords = clippedPixels.newYcoords

   redraw()
}

redraw()