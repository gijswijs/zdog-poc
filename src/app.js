import Zdog from "zdog/js"
import "bulma/css/bulma.css"
import './styles/component.css'

const heightInput = document.getElementById("heightInput")
const speedInput = document.getElementById("speedInput")
const startBtn = document.getElementById("startBtn")
const resetBtn = document.getElementById("resetBtn")
const progressBar = document.getElementById("progressBar")
// const pageX = document.getElementById("pageX")
// const pageY = document.getElementById("pageY")

let rotationTargetY = -0.3
let rotationTargetX = -0.5
let rotationStepY = 0
let rotationStepX = 0
let rotationSteps = 100

let illo = new Zdog.Illustration({
  element: '.zdog-canvas',  
  rotate: {
    y: rotationTargetY,
    x: rotationTargetX  
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


// a tower of Hanoi with a number of 6 disks at the first stack
let disks = []

// an array to hold all timeouts, so that they can be cleared on a reinit
var timeouts = [];

// create an empty array to hold the zdog ellipse objects
let diskObjects = []

// set the bottom of the stack. The translation for each disk is calculated off this value
let bottomTranslate = 200

// step counter
let steps = 0

// time between steps in the animation (ms)
let stepTimer = 500

init();

resetBtn.addEventListener("click",init)
speedInput.addEventListener("change",init)
heightInput.addEventListener("change",init)
document.body.addEventListener('mousemove',changeRotation)

// start animation
animate();

// FUNCTIONS

function startClick() {
  hanoi(disks, disks.length-1, 2)
  startBtn.removeEventListener("click",startClick)
}

function changeRotation(event) {
  let pageXmax = 1200
  let pageYmax = 800
  let rotationXmax = 0.5
  let rotationYmax = 1
  let locX = event.pageX > pageXmax ? pageXmax : event.pageX
  let locY = event.pageY > pageYmax ? pageYmax : event.pageY
  locX = locX*2-pageXmax
  locY = locY*2-pageYmax
  rotationTargetY = locX/pageXmax * rotationYmax
  rotationTargetX = locY/pageYmax * rotationXmax
  rotationStepY = (rotationTargetY - illo.rotate.y) / rotationSteps
  rotationStepX = (rotationTargetX - illo.rotate.x) / rotationSteps
  // pageX.value = "step X:" + rotationStepX.toString() + " illo-x:" + illo.rotate.x.toString() + " target X:" + rotationTargetX.toString()
  // pageY.value = "step Y:" + rotationStepY.toString() + " illo-y:" + illo.rotate.y.toString() + " target Y:" + rotationTargetY.toString()
}

function init() {
  // set progress bar to 0%
  progressBar.value = 0
  // clear all timeouts (this only applies if this is a reinit)
  timeouts.forEach(t => clearTimeout(t))
  // remove all disks (this only applies if this is a reinit)
  diskObjects.forEach(d => d.remove())
  diskObjects = []
  if (parseInt(heightInput.value) > 10) {
    heightInput.value = "10"
  }
  if (parseInt(heightInput.value) < 1) {
    heightInput.value = "1"
  }
  if (parseInt(speedInput.value) > 5000) {
    speedInput.value = "5000"
  }
  if (parseInt(speedInput.value) < 100) {
    speedInput.value = "100"
  }
  disks = new Array(parseInt(heightInput.value)).fill(0)
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
  let bottomStroke = (height / disks.length) * (1 + relativeDiff)
  // calculate top stroke
  let topStroke = (height / disks.length) * (1-relativeDiff)
  // calculate the difference for the strokes in between top and bottom
  let strokeStep = (bottomStroke - topStroke) / (disks.length - 1)
  // calculate the difference for the diameter in between top and bottom
  let diameterStep = (diameter - topDiameter) / (disks.length - 1)
  // set the stroke for the first iteration
  let stroke = bottomStroke
  // step counter
  steps = 0
  // time between steps in the animation (ms)
  stepTimer = parseInt(speedInput.value)
  
  for (let i = 0; i < disks.length; i++) {
    let translate = bottomTranslate - i * bottomStroke + ((((i * (i + 1)) / 2) - i) * strokeStep) - (0.5 * stroke);
    diskObjects.unshift(new Zdog.Ellipse({
      addTo: spool0,
      diameter: diameter,
      stroke: stroke,
      color: colors[i % colors.length],
      rotate: { x: Zdog.TAU / 4 },
      translate: { y: translate }
    }));
    // diminish stroke and diameter
    stroke -= strokeStep;
    diameter -= diameterStep;
  }
  illo.updateRenderGraph();
  startBtn.addEventListener("click",startClick)
}

function animate() {
  if (Math.abs(illo.rotate.y - rotationStepY - rotationTargetY) > 0.01) {
    illo.rotate.y += rotationStepY
  }
  if (Math.abs(illo.rotate.x - rotationStepX - rotationTargetX) > 0.01) {
    illo.rotate.x += rotationStepX
  }
  // pageX.value = "step X:" + rotationStepX.toString() + " illo-x:" + illo.rotate.x.toString() + " target X:" + rotationTargetX.toString()
  // pageY.value = "step Y:" + rotationStepY.toString() + " illo-y:" + illo.rotate.y.toString() + " target Y:" + rotationTargetY.toString()

  illo.updateRenderGraph();
  // animate next frame
  requestAnimationFrame( animate );
}

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
  timeouts.push(setTimeout(moveDisk,steps * stepTimer, diskObjects[toMove], target, steps))
  
  // move the disk that's one smaller on top of it
  if (toMove > 0) {
    hanoi(disks, toMove - 1, target)
  }
}

function moveDisk(disk, to, step) {
  // get the target spool
  progressBar.value=step/(Math.pow(2,disks.length)-1)*100
  let spool = eval('spool' + to)
  // move the disk down as far as possible (on to the disks that are already on the spool)

  let height = spool.children.length > 0 ? spool.children.reduce((t, d) => t + d.stroke, 0) : 0
  let translate = bottomTranslate - height - (disk.stroke / 2)
  // move the disk to the target spool
  spool.addChild(disk)
  disk.translate = { y: translate }
  illo.updateRenderGraph()
}