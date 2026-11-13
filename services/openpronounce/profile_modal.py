"""Private, ephemeral profiling of fixed synthetic audio; no learner recordings.

Run with Python 3.12 and the authorized Modal profile. BENCHMARK_IMAGE is the
existing deployed image ID; this script never changes the production endpoint.
"""
import json
import os
from pathlib import Path

import modal

app = modal.App()
image_id = os.environ.get("BENCHMARK_IMAGE", "candidate")
if image_id == "candidate":
    from modal_app import image
else:
    image = modal.Image.from_id(image_id)


def memory_stats():
    import resource
    stats={"peakRssMiB":round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss/1024,1)}
    for label,file in [("currentCgroupMiB","/sys/fs/cgroup/memory.current"),
                       ("peakCgroupMiB","/sys/fs/cgroup/memory.peak")]:
        try:stats[label]=round(int(Path(file).read_text())/1024/1024,1)
        except (OSError,ValueError):pass
    return stats


@app.function(image=image, env={"BENCHMARK_IMAGE":image_id}, cpu=(2, 2), memory=12288,
              timeout=600, startup_timeout=60, max_containers=1)
def profile(raw: bytes):
    import resource
    import time
    import numpy as np
    import torch
    started = time.perf_counter()
    torch.set_num_threads(2)
    torch.set_num_interop_threads(1)
    from openpronounce import speech, phones

    stages = {}
    def memory():
        return {"peakRssMiB":round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss/1024,1)}
    for name, fn in [("asr_load", lambda:speech._load_models(speech.MODEL_NAME)),
                     ("phone_load", phones._load_model)]:
        at=time.perf_counter();fn();stages[name]=round(time.perf_counter()-at,3)
    wave = np.frombuffer(raw,dtype='<i2',offset=44).astype(np.float32)/32768
    reference='Hello, it is nice to meet you. How are you today?'
    results=[]
    for label,samples in [("short-first",wave),("short-warm",wave),("long-warm",np.tile(wave,7))]:
        times={}; originals=[]
        def wrap(module,name):
            original=getattr(module,name);originals.append((module,name,original))
            def timed(*args,**kwargs):
                at=time.perf_counter()
                try:return original(*args,**kwargs)
                finally:times[name]=times.get(name,0)+time.perf_counter()-at
            setattr(module,name,timed)
        for name in ['extract_embeddings','transcribe','compare_transcriptions','extract_f0','extract_energy']:
            wrap(speech,name)
        wrap(phones,'recognize_phones');wrap(phones,'compare_phones')
        at=time.perf_counter()
        try:result=speech.compare_audio_with_text(samples,reference,lang='en',use_phone_model=True)
        finally:
            for module,name,original in originals:setattr(module,name,original)
        results.append({"case":label,"seconds":round(time.perf_counter()-at,3),
                        "stages":{k:round(v,3) for k,v in times.items()},
                        "score":result['score'],**memory()})
    return {"loadStages":stages,"totalSeconds":round(time.perf_counter()-started,3),"samples":results,**memory()}


@app.function(image=image, env={"BENCHMARK_IMAGE":image_id}, cpu=(2, 2), memory=12288,
              timeout=600, startup_timeout=120, max_containers=1)
def compare(cases):
    import resource
    import sys
    import time
    import numpy as np
    import torch
    sys.path.insert(0, "/srv")
    from engine import assess
    from openpronounce import speech, phones
    torch.set_num_threads(2)
    torch.set_num_interop_threads(1)
    speech._load_models(speech.MODEL_NAME);phones._load_model()
    results=[]
    for item in cases:
        samples=np.frombuffer(item['raw'],dtype='<i2',offset=44).astype(np.float32)/32768
        at=time.perf_counter();before=speech.compare_audio_with_text(samples,item['reference'],lang='en',use_phone_model=True);old_time=time.perf_counter()-at
        at=time.perf_counter();after=assess(samples,item['reference']);new_time=time.perf_counter()-at
        difference=abs(before['score']-after['score'])
        transcript_equal=before['transcribe']==after['transcribe']
        errors_equal=before['differences']['errors']==after['differences']['errors']
        results.append({'case':item['case'],'baselineSeconds':round(old_time,3),'optimizedSeconds':round(new_time,3),
                        'score':after['score'],'scoreDifference':difference,'transcriptEqual':transcript_equal,'errorsEqual':errors_equal})
        assert difference<=.001 and transcript_equal and errors_equal, results[-1]
    return {'cases':results,'peakRssMiB':round(resource.getrusage(resource.RUSAGE_SELF).ru_maxrss/1024,1)}


@app.function(image=image, env={"BENCHMARK_IMAGE":image_id}, cpu=(2, 2), memory=(4096,8192),
              timeout=300, startup_timeout=120, max_containers=1)
def optimized(cases):
    import sys
    import time
    import numpy as np
    sys.path.insert(0,"/srv")
    from engine import warmup,assess
    at=time.perf_counter();warmup();startup=time.perf_counter()-at
    result={"warmupSeconds":round(startup,3),"afterWarmup":memory_stats(),"cases":[]}
    for item in cases:
        samples=np.frombuffer(item['raw'],dtype='<i2',offset=44).astype(np.float32)/32768
        at=time.perf_counter();value=assess(samples,item['reference'])
        result['cases'].append({'case':item['case'],'seconds':round(time.perf_counter()-at,3),
                                'score':value['score'],**memory_stats()})
    return result


@app.local_entrypoint()
def main(mode: str = "baseline"):
    raw=Path('.camp-cache/modal-hosting/qa-introduce-canonical.wav').read_bytes()
    if mode == "baseline":
        result=profile.remote(raw)
    else:
        fixtures=Path('.camp-cache/modal-hosting/optimization-fixtures')
        cases=[{**item,'raw':(fixtures/item['file']).read_bytes()} for item in json.loads((fixtures/'cases.json').read_text())]
        if mode == "maximum":
            import io
            import wave
            with wave.open(io.BytesIO(raw),'rb') as recording:pcm=recording.readframes(recording.getnframes())
            buffer=io.BytesIO()
            with wave.open(buffer,'wb') as recording:
                recording.setnchannels(1);recording.setsampwidth(2);recording.setframerate(16000);recording.writeframes((pcm*9)[:33*32000])
            cases=[{'case':'maximum-33s','raw':buffer.getvalue(),'reference':cases[0]['reference']}]
        result=optimized.remote(cases) if mode in ("optimized","maximum") else compare.remote(cases)
    out=Path('../../outputs/openpronounce-optimization-2026-11-13')
    out.mkdir(exist_ok=True)
    (out/(mode+'-profile.json')).write_text(json.dumps(result,indent=2)+'\n')
    print(json.dumps(result,indent=2))
