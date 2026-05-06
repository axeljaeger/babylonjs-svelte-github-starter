import './app.css';
import { mount } from 'svelte';
import App from './App.svelte';

// Mount the Svelte app with props
const appElement = document.getElementById('app');
if (!appElement) {
  throw new Error(
    'Could not find app element with id "app" - check that index.html contains <div id="app"></div>',
  );
}

mount(App, {
  target: appElement,
});
