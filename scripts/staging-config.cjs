#!/usr/bin/env node
/**
 * Writes wrangler.staging.generated.jsonc from wrangler.jsonc for the free staging Worker.
 * Usage: node scripts/staging-config.cjs <staging-d1-database-id>
 * Staging is a separate Worker (englishcamp-staging) with its own D1 database, PayPal forced to sandbox,
 * paid speech features off and no learner data shared with production.
 */
const fs = require('node:fs'), path = require('node:path');
const root = path.join(__dirname, '..');
const PRODUCTION = { name: 'englishcamp', database: 'englishcamp-learners' };
const STAGING = { name: 'englishcamp-staging', database: 'englishcamp-staging-learners' };

function stagingConfig(production, databaseId) {
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(databaseId || '')) throw new Error('A valid staging D1 database id is required.');
  const productionDb = (production.d1_databases || []).find(db => db.binding === 'LEARNERS_DB');
  if (!productionDb) throw new Error('wrangler.jsonc has no LEARNERS_DB binding.');
  if (databaseId === productionDb.database_id) throw new Error('Staging must not use the production learner database.');
  const config = JSON.parse(JSON.stringify(production));
  config.name = STAGING.name;
  config.workers_dev = true;
  config.d1_databases = [{ ...productionDb, database_name: STAGING.database, database_id: databaseId }];
  config.vars = {
    ...config.vars,
    INVITATION_REQUIRED: 'true',
    BILLING_ENABLED: 'true',
    PAYPAL_ENV: 'sandbox',
    ENGLISHCAMP_SPEAKING_ENABLED: 'false',
  };
  delete config.routes; delete config.route;
  if (config.name === PRODUCTION.name || config.d1_databases[0].database_name === PRODUCTION.database) throw new Error('Staging config points at production.');
  return config;
}

if (require.main === module) {
  const production = JSON.parse(fs.readFileSync(path.join(root, 'wrangler.jsonc'), 'utf8').replace(/^\s*\/\/.*$/gm, ''));
  const config = stagingConfig(production, process.argv[2]);
  fs.writeFileSync(path.join(root, 'wrangler.staging.generated.jsonc'), JSON.stringify(config, null, 2) + '\n');
  console.log(`Staging config written for ${config.name} with database ${config.d1_databases[0].database_name}.`);
}
module.exports = { stagingConfig, STAGING };
