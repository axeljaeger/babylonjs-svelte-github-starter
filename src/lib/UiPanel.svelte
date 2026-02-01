<script lang="ts">
import type { FreeCamera } from '@babylonjs/core/Cameras/freeCamera';
import type { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial';
import { Color3 } from '@babylonjs/core/Maths/math.color';
import type { Vector3 } from '@babylonjs/core/Maths/math.vector';
import type { Mesh } from '@babylonjs/core/Meshes/mesh';
import type { Scene } from '@babylonjs/core/scene';
import { onDestroy, onMount } from 'svelte';

interface Props {
  scene: Scene;
  camera: FreeCamera;
  sphere: Mesh;
  initialCameraPosition: Vector3;
  initialCameraTarget: Vector3;
}

const {
  scene,
  camera,
  sphere,
  initialCameraPosition,
  initialCameraTarget,
}: Props = $props();

let fps = $state(0);
const selectedColor = $state<'red' | 'green' | 'blue'>('blue'); // Default matches initial sphere color
let fpsInterval: ReturnType<typeof setInterval> | undefined;

// Update FPS counter
onMount(() => {
  fpsInterval = window.setInterval(() => {
    fps = Math.round(scene.getEngine().getFps());
  }, 1000);
});

onDestroy(() => {
  if (fpsInterval) {
    clearInterval(fpsInterval);
  }
});

// Color change effect - update sphere color when selectedColor changes
$effect(() => {
  changeColor(selectedColor);
});

function changeColor(color: 'red' | 'green' | 'blue') {
  const material = sphere.material as StandardMaterial;
  if (material) {
    switch (color) {
      case 'red':
        material.diffuseColor = new Color3(1, 0, 0);
        break;
      case 'green':
        material.diffuseColor = new Color3(0, 1, 0);
        break;
      case 'blue':
        material.diffuseColor = new Color3(0, 0, 1);
        break;
    }
  }
}

function resetCamera() {
  camera.position = initialCameraPosition.clone();
  camera.setTarget(initialCameraTarget);
}
</script>

<div class="panel">
  <h2>Controls</h2>
  
  <div class="info">
    <div class="info-label">FPS</div>
    <div class="info-value">{fps}</div>
  </div>

  <div class="button-group">
    <h3>Sphere Color</h3>
    <div class="radio-group">
      <label>
        <input 
          type="radio" 
          name="color" 
          value="red" 
          bind:group={selectedColor}
        />
        Red
      </label>
      <label>
        <input 
          type="radio" 
          name="color" 
          value="green" 
          bind:group={selectedColor}
        />
        Green
      </label>
      <label>
        <input 
          type="radio" 
          name="color" 
          value="blue" 
          bind:group={selectedColor}
        />
        Blue
      </label>
    </div>
  </div>

  <div class="button-group">
    <h3>Camera</h3>
    <button onclick={resetCamera}>Reset Camera</button>
  </div>

  <a 
    href="https://github.com/axeljaeger/babylonjs-svelte-github-starter" 
    target="_blank" 
    rel="noopener noreferrer"
    class="repo-link"
  >
    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/>
    </svg>
    View on GitHub
  </a>
</div>
