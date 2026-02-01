# babylonjs-svelte-github-starter

A modern starter template combining BabylonJS for 3D rendering with Svelte for reactive UI components.

[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://github.com/codespaces/new?repo=axeljaeger/babylonjs-svelte-github-starter)

[![Checked with Biome](https://img.shields.io/badge/Checked_with-Biome-60a5fa?style=flat&logo=biome)](https://biomejs.dev)

## Features

- 🎮 **BabylonJS 3D Rendering** - Powerful 3D engine with tree-shakeable imports
- ⚡ **Svelte 5** - Lightweight, fast reactive framework with runes
- 🚀 **Vite** - Lightning-fast development and optimized production builds
- 📘 **TypeScript** - Full type safety and IntelliSense support
- 🎨 **Modern UI** - Styled overlay components that interact with the 3D scene
- 🔧 **Biome** - Fast formatting and linting
- 📦 **GitHub Pages Ready** - Automatic deployment workflow included

## What's Included

This starter demonstrates:

- Full-screen 3D canvas with BabylonJS
- Interactive Svelte UI components overlaying the 3D scene
- Control panel with buttons to manipulate the scene
- FPS counter displaying real-time frame rate
- Sphere color changing (Red, Green, Blue buttons)
- Camera reset functionality
- Animation toggle that rotates the sphere
- Proper TypeScript typing throughout
- Reactive state management with Svelte's runes

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. **Use this template** to create a new repository (or clone it):
   ```bash
   git clone https://github.com/axeljaeger/babylonjs-svelte-github-starter.git
   cd babylonjs-svelte-github-starter
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to `http://localhost:5173`

## Development Commands

- `npm run dev` - Start the development server with hot reload
- `npm run build` - Build for production
- `npm run build:analyze` - Build with detailed bundle size analysis
- `npm run preview` - Preview the production build locally
- `npm run check` - Run Svelte type checking
- `npm run lint` - Run Biome linter
- `npm run format` - Format code with Biome

## Project Structure

```
babylonjs-svelte-github-starter/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages deployment workflow
├── .devcontainer/
│   └── devcontainer.json       # Dev container configuration
├── .vscode/
│   └── extensions.json         # Recommended VS Code extensions
├── src/
│   ├── lib/
│   │   └── UiPanel.svelte     # Main control panel component
│   ├── App.svelte             # Root Svelte component
│   ├── main.ts                # Entry point - BabylonJS initialization
│   ├── app.css                # Global styles
│   └── vite-env.d.ts          # Vite type definitions
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── vite.config.ts              # Vite configuration
├── svelte.config.js            # Svelte configuration
├── biome.json                  # Biome configuration
└── README.md                   # Documentation
```

## How It Works

### BabylonJS Scene

The 3D scene is initialized in `src/main.ts` and includes:

- A FreeCamera for navigation
- HemisphericLight for illumination
- A textured sphere with material
- A ground plane

### Svelte Components

UI components are built with Svelte 5 and include:

1. **App.svelte** - The root component that receives BabylonJS objects as props
2. **UiPanel.svelte** - A control panel with multiple interactive features:
   - FPS counter that updates every second using `onMount`
   - Color change buttons that modify the sphere's material
   - Reset camera button
   - Animation toggle button using Svelte's `$effect` for rotation

### Integration Pattern

The integration between BabylonJS and Svelte works as follows:

```typescript
// In main.ts - mount Svelte app with props
import { mount } from 'svelte'
import App from './App.svelte'

mount(App, {
  target: appElement,
  props: {
    scene,
    camera,
    sphere,
    initialCameraPosition,
    initialCameraTarget,
  },
})
```

The Svelte components receive references to the BabylonJS scene objects as props, allowing them to directly manipulate the 3D scene using Svelte's reactive system.

### Key Svelte Features Used

- **Runes**: Modern Svelte 5 syntax with `$state`, `$props`, and `$effect`
- **Reactivity**: Automatic UI updates when state changes
- **Lifecycle**: `onMount` for initialization, `onDestroy` for cleanup
- **Type Safety**: Full TypeScript support with proper typing

## Deployment to GitHub Pages

The repository includes a GitHub Actions workflow that automatically builds and deploys your project to GitHub Pages on every push.

### Setup

1. Go to your repository **Settings** → **Pages**
2. Under "Source", select **GitHub Actions**
3. Push to your main branch, and the workflow will automatically deploy

The workflow file is located at `.github/workflows/deploy.yml`

## Customization

### Adopting the Template

If you plan to publish to npm or customize further:

1. Update the `name` field in `package.json`
2. Update repository URLs in `package.json`
3. Update the title in `index.html`

### Adding More Components

Create new Svelte components in `src/lib/`:

```svelte
<script lang="ts">
  let { name = 'World' }: { name?: string } = $props()
</script>

<div>Hello, {name}!</div>

<style>
  div {
    color: white;
  }
</style>
```

### Modifying the 3D Scene

Edit `src/main.ts` to add more objects, lights, or change the scene setup. BabylonJS has extensive documentation and examples at [babylonjs.com](https://www.babylonjs.com/).

## Technologies Used

- [BabylonJS](https://www.babylonjs.com/) - 3D rendering engine
- [Svelte](https://svelte.dev/) - Reactive UI framework
- [Vite](https://vitejs.dev/) - Build tool and dev server
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Biome](https://biomejs.dev/) - Linting and formatting

## Related Work

- [babylonjs-lit-github-starter](https://github.com/axeljaeger/babylonjs-lit-github-starter) - BabylonJS + Lit
- [babylonjs-vite-ts-github-starter](https://github.com/axeljaeger/babylonjs-vite-ts-github-starter) - BabylonJS + Vite + TypeScript
- [babylonjs-angular-github-starter](https://github.com/axeljaeger/babylonjs-angular-github-starter) - BabylonJS + Angular
- [BabylonJS Playground](https://playground.babylonjs.com/) - Online BabylonJS editor

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.
