"""Generate fixed original CEFR passages; no learner data. Input: exported scripts JSON, output directory.
Uses the existing Microsoft neural voice with slower delivery for beginner targets.
"""
import asyncio,hashlib,json,sys
from pathlib import Path
import edge_tts
RATES={'A1':'-30%','A2':'-18%','B1':'-8%','B2':'-2%','C1':'-2%','C2':'-2%'}
async def main():
 scripts=json.loads(Path(sys.argv[1]).read_text());target=Path(sys.argv[2]);target.mkdir(parents=True,exist_ok=True);manifest=[]
 for level,text in scripts.items():
  if level not in RATES or not isinstance(text,str) or not 0<len(text)<12000:raise ValueError('Invalid fixed script')
  file=target/(level.lower()+'.mp3');prior=target/'manifest.json';items=json.loads(prior.read_text()) if prior.exists() else []
  cached=next((x for x in items if x.get('level')==level and x.get('rate')==RATES[level] and x.get('scriptSha256')==hashlib.sha256(text.encode()).hexdigest()),None)
  if not cached or not file.exists():
   temporary=file.with_suffix('.partial');await edge_tts.Communicate(text,'en-GB-SoniaNeural',rate=RATES[level]).save(str(temporary));temporary.replace(file)
  data=file.read_bytes();manifest.append({'level':level,'src':'/media/placement/cefr-2026/'+file.name,'voice':'en-GB-SoniaNeural','rate':RATES[level],'scriptSha256':hashlib.sha256(text.encode()).hexdigest(),'sha256':hashlib.sha256(data).hexdigest(),'bytes':len(data)});print(level+': ready',flush=True)
 (target/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
asyncio.run(main())
