import './app.css';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { MeshBuilder } from '@babylonjs/core/Meshes/meshBuilder';
import { Scene } from '@babylonjs/core/scene';
import { mount } from 'svelte';
import App from './App.svelte';

// Get the canvas element
const canvas = document.getElementById('renderCanvas') as HTMLCanvasElement;

// Create the BabylonJS engine
const engine = new Engine(canvas, true);

// Create the scene
const scene = new Scene(engine);
scene.clearColor = new Color3(0.1, 0.1, 0.15).toColor4();

// Create camera
const camera = new FreeCamera('camera1', new Vector3(0, 5, -10), scene);
camera.setTarget(Vector3.Zero());
camera.attachControl(canvas, true);

// Store initial camera position for reset functionality
const initialCameraPosition = camera.position.clone();
const initialCameraTarget = Vector3.Zero();

// Create light
const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
light.intensity = 0.7;

// Create sphere
const sphere = MeshBuilder.CreateSphere('sphere', { diameter: 2 }, scene);
sphere.position.y = 1;

// Create material for sphere
const material = new StandardMaterial('sphereMaterial', scene);
material.diffuseColor = new Color3(0.4, 0.4, 0.8);
material.specularColor = new Color3(0.4, 0.4, 0.4);
sphere.material = material;

// Create ground
const ground = MeshBuilder.CreateGround(
  'ground',
  { width: 10, height: 10 },
  scene,
);
const groundMaterial = new StandardMaterial('groundMaterial', scene);
groundMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
ground.material = groundMaterial;

// Mount the Svelte app with props
const appElement = document.getElementById('app');
if (!appElement) {
  throw new Error(
    'Could not find app element with id "app" - check that index.html contains <div id="app"></div>',
  );
}

mount(App, {
  target: appElement,
  props: {
    scene,
    camera,
    sphere,
    initialCameraPosition,
    initialCameraTarget,
  },
});

// Start the render loop
engine.runRenderLoop(() => {
  scene.render();
});

// Handle window resize
window.addEventListener('resize', () => {
  engine.resize();
});
