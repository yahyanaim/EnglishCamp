/** Prepare a private owner key without printing it or contacting any service. */
const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto');
const directory=path.resolve(__dirname,'../.camp-cache/invitations');fs.mkdirSync(directory,{recursive:true,mode:0o700});fs.chmodSync(directory,0o700);
const file=path.join(directory,'owner.json');
const owner=fs.existsSync(file)?JSON.parse(fs.readFileSync(file,'utf8')):{key:crypto.randomBytes(32).toString('base64url')};
if(typeof owner.key!=='string'||!/^[A-Za-z0-9_-]{43}$/.test(owner.key))throw new Error('The private owner key file is invalid. Restore your original private file.');
const hash=crypto.createHash('sha256').update(owner.key).digest('hex');
for(const [name,value]of [['owner.json',JSON.stringify(owner,null,2)+'\n'],['owner-secrets.json',JSON.stringify({INVITATION_ADMIN_HASH:hash})+'\n'],['owner-access.txt',`EnglishCamp invitation management\n\nPage: https://englishcamp.yahyanaim2001.workers.dev/admin/invitations\nManagement key: ${owner.key}\n\nKeep this file private. This key can create invitations and manage learner access.\nThe server stores its hash, not this key. Learner recovery codes cannot open management.\nSigning out closes the management session; the key remains valid until you rotate it.\n`]]){fs.writeFileSync(path.join(directory,name),value,{mode:0o600});fs.chmodSync(path.join(directory,name),0o600);}
const dev=path.resolve(__dirname,'../.dev.vars'),previous=fs.existsSync(dev)?fs.readFileSync(dev,'utf8'):'';
fs.writeFileSync(dev,previous.replace(/^INVITATION_ADMIN_HASH=.*(?:\r?\n|$)/gm,'').trimEnd()+'\nINVITATION_ADMIN_HASH='+hash+'\n',{mode:0o600});fs.chmodSync(dev,0o600);
console.log('Private owner details prepared under .camp-cache/invitations. The management key was not printed. Existing service keys were preserved.');
