import * as THREE from  'three';
import {TrackballControls} from '../build/jsm/controls/TrackballControls.js';
import KeyboardState from '../libs/util/KeyboardState.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        InfoBox,
        onWindowResize, 
        degreesToRadians,
        createGroundPlaneXZ} from "../libs/util/util.js";

var scene = new THREE.Scene();    // Create main scene
var renderer = initRenderer();    // View function in util/utils
var camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
initDefaultBasicLight(scene);

// Use to scale the cube
var scale = 1.0;

// Show text information onscreen
showInformation();

// To use the keyboard
var keyboard = new KeyboardState();

// Enable mouse rotation, pan, zoom etc.
var trackballControls = new TrackballControls( camera, renderer.domElement );

// Show axes (parameter is size of each axis)
var axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// create a cube
var cubeGeometry = new THREE.BoxGeometry(11, 0.3, 6);
var cubeMaterial = new THREE.MeshLambertMaterial({color: "rgb(200,0,0)"});
var cube = new THREE.Mesh(cubeGeometry, cubeMaterial);

// position the cube
cube.position.set(0.0, 0.0, 0.0);
cube.translateY(3);

// Cylinders
const geometry1 = new THREE.CylinderGeometry( 0.2, 0.2, 3, 32 );
const material1 = new THREE.MeshLambertMaterial({color: "rgb(200,0,0)"})
const cylinder1 = new THREE.Mesh( geometry1, material1 );

const geometry2 = new THREE.CylinderGeometry( 0.2, 0.2, 3, 32 );
const material2 = new THREE.MeshLambertMaterial({color: "rgb(200,0,0)"})
const cylinder2 = new THREE.Mesh( geometry2, material2 );

const geometry3 = new THREE.CylinderGeometry( 0.2, 0.2, 3, 32 );
const material3 = new THREE.MeshLambertMaterial({color: "rgb(200,0,0)"})
const cylinder3 = new THREE.Mesh( geometry3, material3 );

const geometry4 = new THREE.CylinderGeometry( 0.2, 0.2, 3, 32 );
const material4 = new THREE.MeshLambertMaterial({color: "rgb(200,0,0)"})
const cylinder4 = new THREE.Mesh( geometry4, material4 );

cylinder1.translateY(1.5);
cylinder2.translateY(1.5);
cylinder3.translateY(1.5);
cylinder4.translateY(1.5);

cylinder1.translateX(5);
cylinder2.translateX(5);
cylinder3.translateX(-5);
cylinder4.translateX(-5);

cylinder1.translateZ(2.5);
cylinder2.translateZ(-2.5);
cylinder3.translateZ(2.5);
cylinder4.translateZ(-2.5);

// add the cube to the scene
scene.add(cube);
scene.add( cylinder1 );
scene.add( cylinder2 );
scene.add( cylinder3 );
scene.add( cylinder4 );

var cubeAxesHelper = new THREE.AxesHelper(9);
cube.add(cubeAxesHelper);

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

render();

function keyboardUpdate() {  
  /*
   keyboard.update();
  if ( keyboard.pressed("left") )     cube.translateX( -1 );
  if ( keyboard.pressed("right") )    cube.translateX(  1 );
  if ( keyboard.pressed("up") )       cube.translateY(  1 );
  if ( keyboard.pressed("down") )     cube.translateY( -1 );
  if ( keyboard.pressed("pageup") )   cube.translateZ(  1 );
  if ( keyboard.pressed("pagedown") ) cube.translateZ( -1 );

  let angle = degreesToRadians(10);
  if ( keyboard.pressed("A") )  cube.rotateY(  angle );
  if ( keyboard.pressed("D") )  cube.rotateY( -angle );

  if ( keyboard.pressed("W") )
  {
    scale+=.1;
    cube.scale.set(scale, scale, scale);
  }
  if ( keyboard.pressed("S") )
  {
    scale-=.1;
    cube.scale.set(scale, scale, scale);
  }
  */
}


function showInformation()
{
  // Use this to show information onscreen
  /*
  var controls = new InfoBox();
    controls.add("Geometric Transformation");
    controls.addParagraph();
    controls.add("Use keyboard arrows to move the cube in XZ.");
    controls.add("Press Page Up or Page down to move the cube over the Y axis");
    controls.add("Press 'A' and 'D' to rotate.");
    controls.add("Press 'W' and 'S' to change scale");
    controls.show();
  */
}

function render()
{
  trackballControls.update();
  keyboardUpdate();
  requestAnimationFrame(render); // Show events
  renderer.render(scene, camera) // Render scene
}
