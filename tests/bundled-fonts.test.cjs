const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),crypto=require('node:crypto');
const moduleValue=require('next/dist/compiled/@next/font/dist/fontkit');
const parse=moduleValue.default?.default||moduleValue.default||moduleValue;
test('bundled WOFF2 assets retain the four original font families and cover English and Arabic',()=>{
 const manifest=JSON.parse(fs.readFileSync('src/assets/fonts/manifest.json','utf8'));
 assert.deepEqual(manifest.map(f=>f.family),['Nunito','DM Sans','JetBrains Mono','Noto Naskh Arabic']);
 for(const f of manifest){const bytes=fs.readFileSync('src/assets/fonts/'+f.file);assert.equal(bytes.subarray(0,4).toString(),'wOF2');assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),f.sha256);const font=parse(bytes);assert.equal(font.name?.records?.preferredFamily?.en||font.familyName,f.family);assert.ok(font.hasGlyphForCodePoint('A'.codePointAt(0)));if(f.family==='Noto Naskh Arabic')assert.ok(font.hasGlyphForCodePoint('ع'.codePointAt(0)));assert.match(fs.readFileSync('src/assets/fonts/'+f.licence,'utf8'),/SIL OPEN FONT LICENSE/);}
 assert.ok(manifest.reduce((n,f)=>n+fs.statSync('src/assets/fonts/'+f.file).size,0)<450000);
});
test('deployment fonts retain the original CSS variables, weights and fallbacks without remote font fetching',()=>{
 const source=fs.readFileSync('src/app/layout.tsx','utf8');assert.match(source,/next\/font\/local/);assert.ok(!source.includes('next/font/google'));
 for(const variable of ['display','body','mono','arabic'])assert.ok(source.includes('--font-'+variable));
 for(const [name,weights]of [['nunito',[400,600,700,800,900]],['dmsans',[400,500,600,700]],['notonaskharabic',[400,500,600,700]]])for(const weight of weights)assert.ok(source.includes(`fonts/${name}.woff2", weight: "${weight}"`));
 assert.match(source,/weight: "100 800"/);assert.equal((source.match(/display: "swap"/g)||[]).length,4);assert.match(source,/"system-ui", "Arial", "sans-serif"/);
});
