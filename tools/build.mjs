import { copyFile, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import vm from 'node:vm';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = path.join(root, 'esboco_site');
const output = path.join(root, 'dist');
const configText = await readFile(path.join(source, 'site-config.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(configText, context);
const config = context.window.A48_CONFIG;
if (!/^55[1-9]\d9\d{8}$/.test(config.whatsapp)) throw new Error('WhatsApp inválido.');
if (config.formsubmitId && !/^[a-z0-9-]{16,128}$/i.test(config.formsubmitId)) {
  throw new Error('formsubmitId inválido: use somente o identificador público fornecido pelo FormSubmit.');
}
if (!config.formsubmitId) {
  console.warn('Formulário aguardando ativação. O site será publicado com atendimento pelo WhatsApp.');
}
await mkdir(output, { recursive: true });
for (const [from, to] of [
  ['a48_autonomia_landing.html', 'index.html'],
  ['privacidade.html', 'privacidade.html'],
  ['site-config.js', 'site-config.js'],
  ['site.js', 'site.js'],
  ['favicon.svg', 'favicon.svg'],
  ['sitemap.xml', 'sitemap.xml'],
  ['robots.txt', 'robots.txt'],
  // Manter na raiz publicada para preservar a verificação do Google.
  ['google23011148cf338c48.html', 'google23011148cf338c48.html'],
]) await copyFile(path.join(source, from), path.join(output, to));
await writeFile(path.join(output, '.nojekyll'), '');
console.log('Site preparado em dist/.');
