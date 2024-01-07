// app.js - Start the Web Application
// https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/jsm/controls/OrbitControls.js

import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { OrbitControls } from './js/OrbitControls.js';
import "./js/animate/animationConfig.js";
import "./js/animate/gapSettings.js";
import "./js/animate/gapUI.js";
import "./js/animate/rotateUI.js";
import "./js/appConfig.js";
import { init } from "./js/appUI.js";
import { animateOrRender } from "./js/appUI.js";
import { scaleCubeGroup } from "./js/cubeUI.js";
import { handleResize } from "./js/resize.js";

init();
handleResize(); // resize for window
animateOrRender(); // animate or render

window.addEventListener("resize", handleResize);
window.addEventListener("DOMContentLoaded", () => {
    scaleCubeGroup();
    handleResize(); // call after creation
});