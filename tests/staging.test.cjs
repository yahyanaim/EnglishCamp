require('./register.cjs');
const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs');
const {stagingConfig}=require('../scripts/staging-config.cjs');
const {withSecurityHeaders}=require('../cloudflare/securityHeaders.ts');
const production=JSON.parse(fs.readFileSync('wrangler.jsonc','utf8'));
const STAGING_ID='11111111-2222-4333-8444-555555555555';

test('staging is a separate Worker with its own database, PayPal sandbox and paid speech off',()=>{
 const c=stagingConfig(production,STAGING_ID);
 assert.equal(c.name,'englishcamp-staging');
 assert.equal(c.d1_databases.length,1);
 assert.deepEqual([c.d1_databases[0].binding,c.d1_databases[0].database_name,c.d1_databases[0].database_id],['LEARNERS_DB','englishcamp-staging-learners',STAGING_ID]);
 assert.equal(c.vars.PAYPAL_ENV,'sandbox');assert.equal(c.vars.ENGLISHCAMP_SPEAKING_ENABLED,'false');assert.equal(c.vars.INVITATION_REQUIRED,'true');
 assert.equal(c.assets.directory,production.assets.directory);assert.equal(c.main,production.main);
 assert.equal(production.name,'englishcamp','production config is unchanged');
});

test('staging refuses the production database or a malformed id',()=>{
 assert.throws(()=>stagingConfig(production,production.d1_databases[0].database_id),/production learner database/);
 assert.throws(()=>stagingConfig(production,''),/valid staging D1/);
 assert.throws(()=>stagingConfig(production,'englishcamp-learners'),/valid staging D1/);
});

test('only the staging host is marked noindex',()=>{
 const tag=url=>withSecurityHeaders(new Request(url),new Response('ok')).headers.get('X-Robots-Tag');
 assert.equal(tag('https://englishcamp-staging.yahyanaim2001.workers.dev/invite'),'noindex, nofollow');
 assert.equal(tag('https://englishcamp.yahyanaim2001.workers.dev/invite'),null);
});

test('the staging workflow runs only on the staging branch and never uses production names',()=>{
 const wf=fs.readFileSync('.github/workflows/cloudflare-staging.yml','utf8');
 assert.match(wf,/branches: \[staging\]/);assert.match(wf,/github\.ref == 'refs\/heads\/staging'/);
 assert.ok(!/englishcamp-learners\b/.test(wf.replace(/englishcamp-staging-learners/g,'')),'no production database name');
 assert.ok(!wf.includes('npm run deploy:cloudflare'),'never runs the production deploy script');
 for(const line of wf.split('\n').filter(l=>/wrangler (deploy|d1 migrations|secret)/.test(l)))assert.match(line,/--config wrangler\.staging\.generated\.jsonc/,line.trim());
 assert.match(fs.readFileSync('.gitignore','utf8'),/wrangler\.staging\.generated\.jsonc/);
});
