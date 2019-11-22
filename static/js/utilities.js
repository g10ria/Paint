// utility functions

/**
 * @return if a number is even or not
 */
function even(num) { 
   return num % 2 == 0 
}

/**
 * Transforms an array of values by a specified offset (additive)
 */
function transform(values, offset) {
   for(let i=0;i<values.length;i++)
      values[i] += offset
   return values
}

/**
 * Clamps a number to a minimum and maximum value (inclusive)
 */
function clamp(num, min, max) {
   if (num < min) return min
   if (num > max) return max
   return num
}