// appConfig.js - Consolidates settings for window, cube, and camera in the 3D scene.

export const windowSettings = {
  availableHeight: 400, //  set in resize.js
  fractionHeightToFrustum: 0.8, // 80% of available height
};

export const cubeSettings = {
  size: 1, 
  colorList: [0, 32, 64, 96, 128, 160, 192, 224, 255], // 9 colors
  boxX: 1, // temporary box is 1 unit x direction
  boxY: 3, // temporary box is 3 units y direction
  boxZ: 9, // temporary box is 9 units in z direction
  fractionOfFrustumHeight: 0.8, // 80% of frustum height
};

// set in appUI.js
export const cameraSettings = {
  left: -50,
  right: 50,
  top: 50,
  bottom: -50,
  near: 0,
  far: 100,

  x_pos: 0, // Center of the cube
  y_pos: cubeSettings.boxY / 2, // Midpoint of the cube's height
  z_pos: cubeSettings.boxZ * 1.5, // Adjust multiplier as needed

  // direct camera at the origin (0, 0, 0) where the box is located
  look_x: 0, 
  look_y: 0, 
  look_z: 0, 
};

// The "frustum" in 3D graphics is the volume of space in front of the camera 
// visible on the screen. For an orthographic camera, the frustum is a 
// rectangular prism defined by the left, right, top, bottom, near, and far properties.