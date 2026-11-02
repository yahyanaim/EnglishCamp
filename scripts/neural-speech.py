"""Microsoft neural speech helper. Receives only the selected text through stdin."""
import asyncio, json, sys
import edge_tts
async def main():
    request=json.load(sys.stdin)
    if request['voice'] not in ('en-GB-SoniaNeural','ar-SA-ZariyahNeural'): raise ValueError('Unsupported voice')
    if not 0<len(request['text'])<=12000: raise ValueError('Invalid text length')
    async for part in edge_tts.Communicate(request['text'],request['voice'],rate='-2%').stream():
        if part['type']=='audio': sys.stdout.buffer.write(part['data'])
    sys.stdout.buffer.flush()
asyncio.run(main())
