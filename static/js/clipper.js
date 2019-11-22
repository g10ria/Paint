// This module clips pixels outside of a certain xy range (x,y>=0) from a specified anchor point.

/**
 * @param x the number of x pixels to clip out of
 * @param y the number of y pixels to clip out of
 * @param oldX the old number of x-pixels
 * @param oldY the old number of y-pixels
 * 
 * @param numPixels the total number of pixels
 * @param oldXcoords x-coordinates of the pixels
 * @param oldYcoords y-coordinates of the pixels
 * 
 * @param anchor designates where to base the clip off of
 * 
 * 1: top left       2: top right
 * 
 *          3: middle
 * 
 * 4: bottom left    2=5: bottom right
 * 
 * Note: if clipping odd numbers of pixels from the middle anchor point,
 * the larger number of pixels will be on the left and top. If the old
 * x and y values of the canvas are odd as well, the coordinate that is
 * considered "the middle" will be towards the right and bottom in order
 * to offset the top/left.
 * 
 * @return {
 *    clippedPixels: the number of pixels clipped
 *    pixelsLeft:    the number of pixels left
 *    oldXcoords:    the unmodified x coordinates of the surviving pixels
 *    oldYcoords:    the unmodified y coordinates of the surviving pixels
 *    newXcoords:    the transformed x coordinates of the surviving pixels
 *    newYcoords:    the transformed y coordinates of the surviving pixels
 * }
 */

function clipPixels(x, y, oldX, oldY, numPixels, oldXcoords, oldYcoords, anchor) {
   let startX, startY, endX, endY = -1
   
   switch (anchor) {    // setting boundary values of clipping rectangle according to the anchor point
      case 1:  // top left
         startX = 0
         startY = 0
         endX = x
         endY = y
         break
      case 2:  // top right
         startX = oldX - x
         startY = 0
         endX = oldX
         endY = y
         break
      case 3:  // middle
         let midX = (even(oldX)) ? oldX/2 : oldX/2+1
         let midY = (even(oldY)) ? oldY/2 : oldY/2+1
         startX = (even(x)) ? midX - x/2 : midX - x/2 - 1
         startY = (even(y)) ? midY - y/2 : midY - y/2 - 1
         endX = midX + x/2
         endY = midY + y/2
      case 4:  // bottom left
         startX = 0
         startY = oldY - y
         endX = x
         endY = oldY
         break
      case 5:  // bottom right
         startX = oldX - x
         startY = oldY - y
         endX = oldX
         endY = oldY
         break
   }

   let clippedPixels = 0

   let pX,pY = -1
   for(let p=0;p<numPixels;p++) {
      pX = oldXcoords[p]
      pY = oldYcoords[p]

      if (pX<startX || pX>endX || pY<startY || pY>endY) {
         oldXcoords.splice(p,1)
         oldYcoords.splice(p,1)
         clippedPixels++
      }
   }

   let pixelsLeft = numPixels - clippedPixels

   let newXcoords = oldXcoords
   let newYcoords = oldYcoords
   let xOffset = (startX>0) ? -startX : 0  // this needs testing
   let yOffset = (startY>0) ? -startY : 0

   transform(newXcoords, xOffset)
   transform(newYcoords, yOffset)

   return {
      clippedPixels,
      pixelsLeft,
      oldXcoords,
      oldYcoords,
      newXcoords,
      newYcoords
   }
}

