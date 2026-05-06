<script lang="ts">
import type { Mesh } from '@babylonjs/core';
import { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import { Engine } from '@babylonjs/core/Engines/engine';
import { HemisphericLight } from '@babylonjs/core/Lights/hemisphericLight';
import { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import { Vector3 } from '@babylonjs/core/Maths/math.vector';
import { CreateGround } from '@babylonjs/core/Meshes/Builders/groundBuilder';
import { CreateSphere } from '@babylonjs/core/Meshes/Builders/sphereBuilder';
import { Scene } from '@babylonjs/core/scene';
import { onDestroy, onMount } from 'svelte';
import type { ColorPreset } from './Sidebar.svelte';

interface Props {
  color: ColorPreset;
  fps: (value: number) => void;
}

let { color = $bindable(), fps = () => {} }: Props = $props();

let canvasRef: HTMLCanvasElement | null = null;
let engine: Engine | null = null;
let scene: Scene | null = null;
let camera: FreeCamera | null;
let sphere: Mesh;

let fpsInterval: ReturnType<typeof setInterval> | undefined;

const initialCameraPosition = new Vector3(0, 5, -10);
const initialCameraTarget = Vector3.Zero();

onMount(() => {
  engine = new Engine(canvasRef, true);
  scene = new Scene(engine);

  camera = new FreeCamera('camera1', initialCameraPosition, scene);
  camera.setTarget(Vector3.Zero());
  camera.attachControl(canvasRef, true);

  // Create light
  const light = new HemisphericLight('light1', new Vector3(0, 1, 0), scene);
  light.intensity = 0.7;

  // Create sphere
  sphere = CreateSphere('sphere', { diameter: 2 }, scene);
  sphere.position.y = 1;

  // Create material for sphere
  const material = new StandardMaterial('sphereMaterial', scene);
  material.diffuseColor = new Color3(0.4, 0.4, 0.8);
  material.specularColor = new Color3(0.4, 0.4, 0.4);
  sphere.material = material;

  // Create ground
  const ground = CreateGround('ground', { width: 10, height: 10 }, scene);
  const groundMaterial = new StandardMaterial('groundMaterial', scene);
  groundMaterial.diffuseColor = new Color3(0.5, 0.5, 0.5);
  ground.material = groundMaterial;

  // Start the render loop
  engine.runRenderLoop(() => {
    scene?.render();
  });

  const resizeObserver = new ResizeObserver(() => {
    engine?.resize(true);
    scene?.render();
  });

  resizeObserver.observe(canvasRef!);
});

// Update FPS counter
onMount(() => {
  fpsInterval = window.setInterval(() => {
    fps(Math.round(scene?.getEngine().getFps() || 0));
  }, 1000);
});

onDestroy(() => {
  if (fpsInterval) {
    clearInterval(fpsInterval);
  }
  if (engine) {
    engine.dispose();
  }
});

export function resetCamera() {
  if (camera) {
    camera.position = initialCameraPosition.clone();
    camera?.setTarget(initialCameraTarget);
  }
}

const colorLookup: Record<ColorPreset, Color3> = {
  red: Color3.Red(),
  green: Color3.Green(),
  blue: Color3.Blue(),
};

$effect(() => {
  changeColor(color);
});

function changeColor(color: ColorPreset) {
  const material = sphere.material as StandardMaterial;
  if (material) {
    material.diffuseColor = colorLookup[color];
  }
}
</script>
<canvas bind:this={canvasRef}></canvas>
