let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")

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

let mousedown = false
let draggedX = []
let draggedY = []

canvas.addEventListener("click", function (e) {
   let cX = xcoord(e.clientX)
   let cY = ycoord(e.clientY)

   addPixel(cX,cY)
   redraw()
})

canvas.addEventListener("mousedown", function (e) {
   let cX = xcoord(e.clientX)
   let cY = ycoord(e.clientY)

   outline(cX, cY)

   draggedX.push(cX)
   draggedY.push(cY)

   mousedown = true
})

canvas.addEventListener("mousemove", function (e) {
   if (mousedown) {
      let cX = xcoord(e.clientX)
      let cY = ycoord(e.clientY)

      draggedX.push(cX) // make this less bad
      draggedY.push(cY)

      outline(cX, cY)
   }
})

document.addEventListener("mouseup", function (e) {
   mousedown = false
   if (draggedX.length==0) return

   // clearing duplicates
   let prevx = draggedX[0]
   let prevy = draggedY[0]
   for(let i=1;i<draggedX.length;i++) {
      let newx = draggedX[i]
      let newy = draggedY[i]
      if (newx==prevx && newy==prevy) {
         draggedX.splice(i,1)
         draggedY.splice(i,1)
         i--
      }  
      prevx = newx
      prevy = newy
   }

   // adding each pixel
   for(let i=0;i<draggedX.length;i++)
      addPixel(draggedX[i], draggedY[i])

   // resetting arrays
   draggedX = []
   draggedY = []

   redraw()
})

// for zooming in/out
canvas.addEventListener("wheel", function (e) { // add a buffer/tick
   // inc/dec according to scroll & clamp result
   scale = clamp((e.deltaY > 0) ? scale - 1 : scale + 1, MIN_SCALE, MAX_SCALE)
   redraw()
})

window.addEventListener("scroll", function() {
   this.console.log("ree")
})

// adds a pixel at the specified coordinates
function addPixel(x,y) {
   xcoords.push(x)
   ycoords.push(y)
   numPixels++
}

function redraw() {
   clearScreen()
   drawAllPixels()
   drawGrid()
}

function outline(x,y) {
   ctx.beginPath()
   ctx.lineWidth = 2
   ctx.strokeStyle = "#FF0000"
   ctx.rect(x*scale, y*scale, scale, scale)
   ctx.stroke()
}

// draws a pixel at the specified coordinates
function drawPixel(x, y) {
   ctx.fillRect(x * scale, y * scale, scale, scale)
}

function drawAllPixels() {
   for (let i = 0; i < numPixels; i++)
      drawPixel(xcoords[i], ycoords[i])
}

function clearScreen() {
   ctx.clearRect(0, 0, 5000, 5000)
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