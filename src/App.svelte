<script lang="ts">
  import UiPanel from './lib/UiPanel.svelte'
  import type { Scene } from '@babylonjs/core/scene'
  import type { FreeCamera } from '@babylonjs/core/Cameras/freeCamera'
  import type { Mesh } from '@babylonjs/core/Meshes/mesh'
  import type { Vector3 } from '@babylonjs/core/Maths/math.vector'

  interface Props {
    scene: Scene
    camera: FreeCamera
    sphere: Mesh
    initialCameraPosition: Vector3
    initialCameraTarget: Vector3
  }

  const { scene, camera, sphere, initialCameraPosition, initialCameraTarget }: Props = $props()
</script>

<UiPanel 
  {scene} 
  {camera} 
  {sphere} 
  {initialCameraPosition}
  {initialCameraTarget}
/>
