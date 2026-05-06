<script lang="ts">
import Canvas from './lib/Canvas.svelte';
import Sidebar, { type ColorPreset } from './lib/Sidebar.svelte';

let babylonScene: Canvas | null = null;
let color = $state<ColorPreset>('red');
let fps = $state<number>(0);

function resetCamera() {
  if (babylonScene) {
    babylonScene.resetCamera();
  }
}

function onFpsUpdate(value: number) {
  fps = value;
}
</script>
<Canvas bind:this={babylonScene} bind:color fps={onFpsUpdate} />
<Sidebar bind:color fps={fps}
  onResetCamera={resetCamera}
/>
