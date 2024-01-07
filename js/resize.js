// resize.js - Resize handling module
import { camera, renderer, scene } from "./appUI.js";
import { windowSettings } from "./appConfig.js";
import { cubeGroup, positionCubes, scaleCubeGroup } from "./cubeUI.js";

// Handles the resizing of the canvas container, renderer, and camera.
export function handleResize() {
  updateAvailableHeight();
  const canvasContainer = document.getElementById("canvas-container");
  if (canvasContainer) {
    canvasContainer.style.height = `${windowSettings.availableHeight}px`;
    scaleCubeGroup();
  }

  // Adjust Renderer and Camera to fit the new size of the canvas container.
  if (renderer && camera) {
    const canvasWidth = canvasContainer ? canvasContainer.clientWidth : window.innerWidth;
    const canvasHeight = canvasContainer ? canvasContainer.clientHeight : windowSettings.availableHeight;

    // Update the aspect ratio of the camera and the size of the renderer.
    camera.aspect = canvasWidth / canvasHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvasWidth, canvasHeight);
    renderer.render(scene, camera);
  }
  
}

function calculateScaleFactor() {
  const baseCubeHeight = cubeSettings.boxY;
  const desiredGroupHeight = windowSettings.availableHeight * windowSettings.fractionHeightToFrustum;
  return desiredGroupHeight / baseCubeHeight;
}

export function updateAvailableHeight() {
  const headerHeight = document.querySelector("header")?.offsetHeight || 0;
  const footerHeight = document.querySelector("footer")?.offsetHeight || 0;
  const articleHeight = document.querySelector("article")?.offsetHeight || 0;
  windowSettings.availableHeight = window.innerHeight - headerHeight - footerHeight - articleHeight;
  console.log("availableHeight in resize: ", windowSettings.availableHeight);
}
