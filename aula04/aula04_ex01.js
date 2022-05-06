import * as THREE from  'three';
import Stats from       '../build/jsm/libs/stats.module.js';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';  
import {
  initRenderer, 
  initCamera,
  InfoBox,
  onWindowResize,
  degreesToRadians,
  createGroundPlaneWired
} from "../libs/util/util.js";

var stats = new Stats();          // To show FPS information
var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils

var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.lookAt(0, 0, 0);
camera.position.set(0, 0, 1);
camera.up.set( 0, 1, 0 );

var cameraHolder = new THREE.Object3D();
cameraHolder.add(camera);
cameraHolder.position.set(0, 2.0, 0);

scene.add(cameraHolder);

// To use the keyboard
var keyboard = new KeyboardState();

// Show text information onscreen
showInformation();

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

scene.add(createGroundPlaneWired(50, 50));
scene.add(new THREE.HemisphereLight());
// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

render();
function keyboardUpdate() {

  keyboard.update();

  var angle = degreesToRadians(1);

  if ( keyboard.pressed("space") )
    cameraHolder.translateZ(-0.5);

  if ( keyboard.pressed("left") )
    cameraHolder.rotateY(angle);
  if ( keyboard.pressed("right") )
    cameraHolder.rotateY(-angle);
    
  if ( keyboard.pressed("down") )
    cameraHolder.rotateX(-angle);
  if ( keyboard.pressed("up") )
    cameraHolder.rotateX(angle);
    
  if ( keyboard.pressed(".") )
    cameraHolder.rotateZ(-angle);
  if ( keyboard.pressed(",") )
    cameraHolder.rotateZ(angle);    
}

function showInformation()
{
  // Use this to show information onscreen
  var controls = new InfoBox();
    controls.add("Geometric Transformation");
    controls.addParagraph();
    controls.add("Use keyboard arrows to move the cube in XZ.");
    controls.add("Press Page Up or Page down to move the cube over the Y axis");
    controls.add("Press 'A' and 'D' to rotate.");
    controls.add("Press 'W' and 'S' to change scale");
    controls.show();
}

function render()
{
  keyboardUpdate();
  stats.update(); // Update FPS
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
  //trackballControls.update(); // Enable mouse movements
}