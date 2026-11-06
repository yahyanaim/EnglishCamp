/** Static course pages + a small API Worker. Never copies local secrets or edits source pages. */
const fs = require('node:fs/promises');
const path = require('node:path');
const { spawnSync } = require('node:child_process');
const ts = require('typescript');
const root = path.resolve(__dirname, '..');
const build = path.join(root, '.cloudflare-build');
const app = path.join(build, 'app');
function run(command, args, cwd = root) {
  const result = spawnSync(command, args, { cwd, stdio: 'inherit', env: { ...process.env, NEXT_TELEMETRY_DISABLED: '1' } });
  if (result.status !== 0) throw new Error(`${command} failed (${result.status ?? result.signal})`);
}
async function files(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  return (await Promise.all(entries.map(entry => entry.isDirectory() ? files(path.join(directory, entry.name)) : [path.join(directory, entry.name)]))).flat();
}
async function main() {
  run(process.execPath, ['scripts/collect-speech-catalogue.cjs']);
  await fs.mkdir(build, { recursive: true });
  await fs.rm(app, { recursive: true, force: true });
  await fs.mkdir(app);
  for (const file of ['src', 'public', 'package.json', 'package-lock.json', 'tsconfig.json', 'tailwind.config.ts', 'postcss.config.mjs']) await fs.cp(path.join(root, file), path.join(app, file), { recursive: true });
  await fs.symlink(path.join(root, 'node_modules'), path.join(app, 'node_modules'), process.platform === 'win32' ? 'junction' : 'dir');
  await fs.writeFile(path.join(app, 'next.config.mjs'), `import base from '../../next.config.mjs';\nexport default {...base, output:'export', redirects:undefined, rewrites:undefined};\n`);
  // Runtime POST handlers are deployed separately in cloudflare/worker.ts.
  await fs.rm(path.join(app, 'src/app/api'), { recursive: true });
  await fs.writeFile(path.join(app, 'src/app/reading/page.tsx'), `export default function ReadingRedirect(){return null;}\n`);
  const source = await fs.readFile(path.join(root, 'src/data/course-catalogue.ts'), 'utf8');
  const ast = ts.createSourceFile('catalogue.ts', source, ts.ScriptTarget.Latest, true);
  let catalogue;
  function visit(node) {
    if (ts.isVariableDeclaration(node) && node.name.getText(ast) === 'courseCatalogue') catalogue = JSON.parse(node.initializer.getText(ast));
    ts.forEachChild(node, visit);
  }
  visit(ast);
  if (!catalogue?.length) throw new Error('Course catalogue is missing.');
  const lessonParams = catalogue.flatMap(course => course.lessons.map(lesson => ({ id: course.id, lessonId: lesson.id })));
  for (const [file, params] of [
    ['levels/[id]/page.tsx', catalogue.map(course => ({ id: course.id }))],
    ['levels/[id]/lessons/[lessonId]/page.tsx', lessonParams],
    ['exercises/[lessonId]/page.tsx', lessonParams.map(({ lessonId }) => ({ lessonId }))],
  ]) await fs.appendFile(path.join(app, 'src/app', file), `\nexport const dynamicParams=false;\nexport function generateStaticParams(){return ${JSON.stringify(params)};}\n`);
  const quiz = path.join(app, 'src/app/quiz/[levelId]');
  await fs.rename(path.join(quiz, 'page.tsx'), path.join(quiz, '_quiz-client.tsx'));
  await fs.writeFile(path.join(quiz, 'page.tsx'), `import QuizPage from './_quiz-client';\nexport const dynamicParams=false;\nexport function generateStaticParams(){return ${JSON.stringify(catalogue.map(course => ({ levelId: course.id })))};}\nexport default function Page({params}:{params:{levelId:string}}){return <QuizPage params={params}/>;}\n`);
  const { default: routes } = await import(path.join(root, 'src/lib/english-routes.mjs'));
  // Generate the actual English route tree, so static HTML and client navigation agree.
  for (const [legacy, english] of Object.entries(routes)) {
    const from = path.join(app, 'src/app', legacy), to = path.join(app, 'src/app', english);
    if (await fs.stat(to).then(() => true, () => false)) throw new Error(`Route collision: ${english}`);
    await fs.rename(from, to);
  }
  run(process.execPath, [path.join(root, 'node_modules/next/dist/bin/next'), 'build'], app);
  const out = path.join(app, 'out'), assets = await files(out);
  if (assets.length + 1 > 20_000) throw new Error('Static assets exceed the Cloudflare Free file limit.');
  let largest = 0;
  for (const file of assets) { const size = (await fs.stat(file)).size; largest = Math.max(largest, size); if (size > 25 * 1024 * 1024) throw new Error(`Asset exceeds 25 MiB: ${path.relative(out, file)}`); }
  await fs.writeFile(path.join(out, '_headers'), '/_next/static/*\n  Cache-Control: public, max-age=31536000, immutable\n/media/*\n  Cache-Control: public, max-age=86400\n');
  await fs.writeFile(path.join(build, 'manifest.json'), JSON.stringify({ staticFiles: assets.length + 1, largestAssetBytes: largest, courses: catalogue.length, lessonPages: lessonParams.length, exercisePages: lessonParams.length, quizPages: catalogue.length, backend: 'Cloudflare Worker', paidCloudflareBindings: [] }, null, 2) + '\n');
  console.log(`Cloudflare build ready: ${assets.length + 1} static files; ${lessonParams.length} lessons and ${lessonParams.length} exercise pages. No paid bindings.`);
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
