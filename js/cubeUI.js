/* 
  =========================================
  TO GRAB CODE FROM GITHUB (or EDIT in GitHub)
  =========================================
  1. Copy URL: https://github.com/denisecase/color-cube
  2. Open Safari and paste the URL into the address bar.
  3. In the GitHub repository, click on "js/ui_cube.js" to select it.
  4. Use COMMAND A to select all the content in this file, then right-click and copy.
  5. On your machine, select all in your editor, then paste the copied content.
  
  To EDIT in GitHub:
  - Click the pencil icon to "Edit in Place".
  - Commit your changes with the green buttons.
  - Change the commit message as desired.
*/

/* 
  =========================================
  AFTER MAKING CHANGES (git add/commit/push)
  =========================================
  1. Open Terminal: Menu -> Terminal -> New Terminal
  2. Run these commands:
     git add .
     git commit -m "new stuff"
     git push
*/

// cubeUI.js - Cube Group Setup Module
import * as THREE from "https://unpkg.com/three@0.160.0/build/three.module.js";
import { gapInfo } from "./animate/gapSettings.js";
import { scene } from "./appUI.js";
import { handleResize } from "./resize.js";
import { cameraSettings, cubeSettings, windowSettings } from "./appConfig.js";

export let cubeGroup;

export function initCubeGroup() {
  cubeGroup = new THREE.Group();

  const geometry = new THREE.BoxGeometry(cubeSettings.boxX, cubeSettings.boxY, cubeSettings.boxZ);
  const material = new THREE.MeshBasicMaterial({ color: "red" });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube); // Add cube to the scene

  // cube.gridPosition = new THREE.Vector3(0, 0, 0);
  // cubeGroup.add(cube);

  // console.log("cube.position: ", cube.position);
  // console.log("cubeGroup.position: ", cubeGroup.position);
  // scene.add(cubeGroup);
  scaleCubeGroup();
}

export function positionCubes() {
  // const cubeSize = cubeSettings.size;
  console.log("cubeSettings.boxX: ", cubeSettings.boxX);
  console.log("cubeSettings.boxY: ", cubeSettings.boxY);
  console.log("cubeSettings.boxZ: ", cubeSettings.boxZ);
  console.log("gapInfo.currentGap: ", gapInfo.currentGap);

  cubeGroup.children.forEach((cube) => {
    cube.position.set(
      cube.gridPosition.x * (cubeSettings.boxX + gapInfo.currentGap),
      cube.gridPosition.y * (cubeSettings.boxY + gapInfo.currentGap),
      cube.gridPosition.z * (cubeSettings.boxZ + gapInfo.currentGap)
    );
    console.log("cube.position: ", cube.position);
  });
}

export function scaleCubeGroup() {
  const windowHeight = windowSettings.availableHeight;
  const targetCubeGroupHeight = windowHeight * windowSettings.fractionToCubeGroup;
  const scaleY = targetCubeGroupHeight / cubeSettings.boxY;
  cubeGroup.scale.set(scaleY, scaleY, scaleY); // Uniform scaling
}

function calculateVerticalScaleFactor() {
  // Retrieve the camera's frustum height
  const frustumHeight = cameraSettings.top - cameraSettings.bottom;
  const targetCubeHeight = frustumHeight * windowSettings.fractionToCubeGroup;

  // Calculate scale factor based on original and target height
  const originalHeight = cubeSettings.boxY;
  return targetCubeHeight / originalHeight;
}
