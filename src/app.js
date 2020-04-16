import Zdog from "zdog/js"
import component from "./component";

document.body.appendChild(component());

let illo = new Zdog.Illustration({
  element: '.zdog-canvas',
  dragRotate: true,
  rotate: {
    y: -0.3,
    x: -0.5  
  }
});

let spool1 = new Zdog.Anchor({
  addTo: illo,
})

let spool2 = spool1.copy({
  // overwrite original options
  translate: { x: 208 },
});

let spool0 = spool1.copy({
  // overwrite original options
  translate: { x: -208 },
});


// function animate() {
//   illo.updateRenderGraph();
//   requestAnimationFrame( animate );
// }

// animate();

// a tower of Hanoi with a number of 6 disks at the first stack
let disks = new Array(4).fill(0)
let stackHeight = disks.length
let colors = ['#A57548','#BA1200','#F45866','#82DDF0','#5296A5','#C45AB3']
// bottom diameter of the stack
let diameter = 150
// top diameter of the stack
let topDiameter = 50
// stack height
let height = 300
// relative difference of the top (thinner) and bottom (thicker) stroke compared to the average stroke
let relativeDiff = 0.3
// calculate bottom stroke
let bottomStroke = (height / stackHeight) * (1 + relativeDiff)
// calculate top stroke
let topStroke = (height / stackHeight) * (1-relativeDiff)
// calculate the difference for the strokes in between top and bottom
let strokeStep = (bottomStroke - topStroke) / (stackHeight - 1)
// calculate the difference for the diameter in between top and bottom
let diameterStep = (diameter - topDiameter) / (stackHeight - 1)
// create an empty array to hold the zdog ellipse objects
let diskObjects = []
// set the stroke for the first iteration
let stroke = bottomStroke
// set the bottom of the stack. The translation for each disk is calculated off this value
let bottomTranslate = 200

for (let i=0; i < stackHeight; i++) {

  let translate = bottomTranslate - i * bottomStroke + ((((i*(i+1))/2)-i) * strokeStep) - (0.5 * stroke)
  diskObjects.unshift(new Zdog.Ellipse({
    addTo: spool0,
    diameter: diameter,
    stroke: stroke,
    color: colors[i%colors.length],
    rotate: { x: Zdog.TAU/4 },
    translate: { y: translate }
  }))

  // diminish stroke and diameter
  stroke -= strokeStep
  diameter -= diameterStep 
}

illo.updateRenderGraph();

// step counter
let steps = 0
// time between steps in the animation (ms)
let stepTimer = 500

// move the bottom disk to the third stack
hanoi(disks, stackHeight-1, 2)

function animate() {
  illo.updateRenderGraph();
  // animate next frame
  requestAnimationFrame( animate );
}
// start animation
animate();

function hanoi(disks, toMove, target) {
  // disks is an array with a length of the number of disks in the game.
  // each element holds the place of the disk: 0, 1 or 2.
  // toMove is the disk to be moved, referenced by the index in the array.
  // target is the place to move the disk to, so 0, 1 or 2.

  // check if the disk is on top of its stack
  if (disks.indexOf(disks[toMove]) < toMove) {
    // the disk is not on top of its stack, so first move the one on top of it
    // find the disk directly on top of it
    let diskOnTop = toMove - disks.slice(0, toMove).reverse().indexOf(disks[toMove]) - 1
    // the target for the disk on top cannot be the current stack or the target stack, which leaves only one
    let diskOnTopTarget = 3 - disks[toMove] - target
    hanoi(disks, diskOnTop, diskOnTopTarget) 
  }
  // move the disk
  disks[toMove] = target
  // update Zdog
  steps += 1
  setTimeout(moveDisk,steps * stepTimer, diskObjects[toMove], target)
  
  // move the disk that's one smaller on top of it
  if (toMove > 0) {
    hanoi(disks, toMove - 1, target)
  }
}

function moveDisk(disk, to) {
  // get the target spool
  let spool = eval('spool' + to)
  // move the disk down as far as possible (on to the disks that are already on the spool)

  let height = spool.children.length > 0 ? spool.children.reduce((t, d) => t + d.stroke, 0) : 0
  let translate = bottomTranslate - height - (disk.stroke / 2)
  // move the disk to the target spool
  spool.addChild(disk)
  disk.translate = { y: translate }
  illo.updateRenderGraph()
}