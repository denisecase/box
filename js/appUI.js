// appUI.js - Initializes and manages the 3D environment using Three.js

import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import OrbitControls from "./OrbitControls.js";
import { handleResize } from "./resize.js";
import { cameraSettings, cubeSettings, windowSettings } from "./appConfig.js";
import { initCubeGroup } from "./cubeUI.js";
import { animateGap } from "./animate/gapSettings.js";
import { animateRotation } from "./animate/rotateUI.js";

export let scene, camera, renderer, controls;

export function init() {
  setupScene();
  addTemporaryAxesHelper();
  setupCamera();
  setupRenderer();
  setupControls();  // move the camera with your mouse
  initCubeGroup();
  logCameraPosition();
  handleResize(); // resize for window
  animateOrRender(); // animate or render
}

function logCameraPosition() {
  const wait_ms = 5000;
  setInterval(() => {
    console.log("Camera position:", camera.position);
    console.log("Camera looking at:", new THREE.Vector3().setFromMatrixPosition(camera.matrixWorld));
  }, wait_ms)
}

function setupScene() {
  scene = new THREE.Scene();
  // set the background to a light gray color
  scene.background = new THREE.Color(0xeeeeee);
}

function addTemporaryAxesHelper() {
  const nUnits = 12;
  const axesHelper = new THREE.AxesHelper(10);
  scene.add(axesHelper);
  console.log("Added temporary axes helper. X is red, y is green, z is blue.");
  // read more at https://threejs.org/docs/#api/en/helpers/AxesHelper
}

function max(x, y, z) {
  return Math.max(x, Math.max(y, z));
}

function setupCamera() {
  // Calculate aspect ratio to match the cube group
  const boxAspectRatio = cubeSettings.boxX / cubeSettings.boxY;
  const windowAspectRatio = window.innerWidth / window.innerHeight;

  // Frustum height based on the box height
  const largestSide = max(cubeSettings.boxX, cubeSettings.boxY, cubeSettings.boxZ);
  const frustumHeight = largestSide * 2;
  const frustumWidth = frustumHeight * boxAspectRatio; // Width based on box aspect ratio

  // Assuming you want to maintain a fixed frustum height and adjust the width
  const frustumWidthHalf = frustumWidth / 2;
  const frustumHeightHalf = frustumHeight / 2;
  cameraSettings.left = -frustumWidthHalf;
  cameraSettings.right = frustumWidthHalf;
  cameraSettings.top = frustumHeightHalf;
  cameraSettings.bottom = -frustumHeightHalf;
  cameraSettings.near = 0;
  cameraSettings.far = largestSide * 2; // Twice the depth of the box for margin

  camera = new THREE.OrthographicCamera(
    cameraSettings.left,
    cameraSettings.right,
    cameraSettings.top,
    cameraSettings.bottom,
    cameraSettings.near,
    cameraSettings.far
  );

  console.log("Camera settings: ");
  console.log(" boxAspectRatio: ", boxAspectRatio);
  console.log(" windowAspectRatio: ", windowAspectRatio);
  console.log(" left: ", cameraSettings.left);
  console.log(" right: ", cameraSettings.right);
  console.log(" top: ", cameraSettings.top);
  console.log(" bottom: ", cameraSettings.bottom);
  console.log(" near: ", cameraSettings.near);
  console.log(" far: ", cameraSettings.far);

  camera.position.set(cameraSettings.x_pos, cameraSettings.y_pos, cameraSettings.z_pos);
  camera.lookAt(cameraSettings.look_x, cameraSettings.look_y, cameraSettings.look_z);

  console.log("Camera position: ", camera.position);
  console.log("Camera lookAt: ", cameraSettings.look_x, cameraSettings.look_y, cameraSettings.look_z);
}

// The renderer draws the computed 3D scene onto the 2D screen.
function setupRenderer() {
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("canvas-container").appendChild(renderer.domElement);
}

function setupControls() {
  controls = new OrbitControls(camera, renderer.domElement);
  controls.update();
  controls.enableDamping = true;
  controls.dampingFactor = 0.25;
  controls.screenSpacePanning = false;
  controls.maxPolarAngle = Math.PI / 2;
  return controls;

  // read more at https://threejs.org/docs/#examples/en/controls/OrbitControls
}

export function getNew3DVector(x, y, z) {
  return new THREE.Vector3(x, y, z);
}
export function animate() {
  // Continuously request the next frame for smooth animation.
  requestAnimationFrame(animate);
  animateGap();
  animateRotation();
  controls.update(); //  added
  renderer.render(scene, camera);
}
export function animateOrRender() {
  animate();
}
