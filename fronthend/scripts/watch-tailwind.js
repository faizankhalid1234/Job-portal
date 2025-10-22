import { spawn } from 'child_process';
import chokidar from 'chokidar';

const buildCmd = 'node';
const buildArgs = ['--experimental-specifier-resolution=node', 'scripts/build-tailwind.js'];

let child = null;
let running = false;
let debounceTimer = null;

function runBuild() {
  if (running) return;
  running = true;
  if (child) child.kill();
  // avoid shell:true for more predictable behavior
  child = spawn(buildCmd, buildArgs, { stdio: 'inherit' });
  child.on('exit', () => {
    running = false;
  });
}

console.log('Watching for changes to rebuild Tailwind...');

// ignore changes inside public/ (the generated output) to prevent rebuild loops
const watcher = chokidar.watch(['src', 'index.html'], { ignoreInitial: true, ignored: /(^|[\\/])public([\\/]|$)/ });

// debounce rapid file events (e.g., editor save hooks)
watcher.on('all', (event, filePath) => {
  console.log(`File ${filePath} changed (${event}), scheduling rebuild...`);
  if (debounceTimer) clearTimeout(debounceTimer);
  debounceTimer = setTimeout(() => {
    runBuild();
  }, 250);
});

// Do not run an initial build automatically to avoid triggering Vite HMR
// when starting the dev server. Run the watcher manually when needed.
