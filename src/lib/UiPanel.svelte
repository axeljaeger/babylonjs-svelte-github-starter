<script lang="ts">
  import { onMount, onDestroy } from 'svelte'
  import type { Scene } from '@babylonjs/core/scene'
  import type { FreeCamera } from '@babylonjs/core/Cameras/freeCamera'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh'
  import type { Vector3 } from '@babylonjs/core/Maths/math.vector'
  import { Color3 } from '@babylonjs/core/Maths/math.color'
  import type { StandardMaterial } from '@babylonjs/core/Materials/standardMaterial'

  interface Props {
    scene: Scene
    camera: FreeCamera
    sphere: Mesh
    initialCameraPosition: Vector3
    initialCameraTarget: Vector3
  }

  const { scene, camera, sphere, initialCameraPosition, initialCameraTarget }: Props = $props()

  let fps = $state(0)
  let isAnimating = $state(false)
  let selectedColor = $state<'red' | 'green' | 'blue'>('blue') // Default matches initial sphere color
  let fpsInterval: ReturnType<typeof setInterval> | undefined

  // Update FPS counter
  onMount(() => {
    fpsInterval = window.setInterval(() => {
      fps = Math.round(scene.getEngine().getFps())
    }, 1000)
  })

  onDestroy(() => {
    if (fpsInterval) {
      clearInterval(fpsInterval)
    }
  })

  // Animation effect - rotate sphere when animating
  $effect(() => {
    if (isAnimating) {
      const beforeRender = scene.onBeforeRenderObservable.add(() => {
        sphere.rotation.y += 0.01
      })
      return () => {
        scene.onBeforeRenderObservable.remove(beforeRender)
      }
    }
  })

  // Color change effect - update sphere color when selectedColor changes
  $effect(() => {
    changeColor(selectedColor)
  })

  function changeColor(color: 'red' | 'green' | 'blue') {
    const material = sphere.material as StandardMaterial
    if (material) {
      switch (color) {
        case 'red':
          material.diffuseColor = new Color3(1, 0, 0)
          break
        case 'green':
          material.diffuseColor = new Color3(0, 1, 0)
          break
        case 'blue':
          material.diffuseColor = new Color3(0, 0, 1)
          break
      }
    }
  }

  function resetCamera() {
    camera.position = initialCameraPosition.clone()
    camera.setTarget(initialCameraTarget)
  }

  function toggleAnimation() {
    isAnimating = !isAnimating
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

  <div class="button-group">
    <h3>Animation</h3>
    <button onclick={toggleAnimation}>
      {isAnimating ? 'Stop' : 'Start'} Rotation
    </button>
  </div>
</div>
