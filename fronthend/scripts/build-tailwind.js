import fs from 'fs';
import postcss from 'postcss';
import tailwindPlugin from '@tailwindcss/postcss';
import autoprefixer from 'autoprefixer';

const inputPath = new URL('../src/index.css', import.meta.url);
const outputPath = new URL('../public/output.css', import.meta.url);

// Load the Tailwind config (CommonJS). dynamic import may put the exported object
// on the `default` property depending on Node resolution, so normalize it.
const configModule = await import('../tailwind.config.cjs');
const tailwindConfig = configModule.default || configModule;

const css = await fs.promises.readFile(inputPath, 'utf8');

// Pass the actual config object to the plugin so safelist/content are honored.
const result = await postcss([tailwindPlugin(tailwindConfig), autoprefixer()]).process(css, {
  from: inputPath.pathname,
  to: outputPath.pathname,
});

await fs.promises.mkdir(new URL('../public', import.meta.url), { recursive: true });
await fs.promises.writeFile(outputPath, result.css, 'utf8');

console.log('Tailwind build complete -> public/output.css');
