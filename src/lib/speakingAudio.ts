/** A small, dependency-free PCM encoder. No transcription or network request happens here. */
export function encodeSpeakingWav(channels: Float32Array[], sourceRate: number): Uint8Array {
  if (!channels.length || !channels[0].length || sourceRate < 8000 || !Number.isFinite(sourceRate) || channels.some(c => c.length !== channels[0].length)) throw new Error('This audio could not be decoded.');
  const length = Math.floor(channels[0].length * 16000 / sourceRate);
  if (length < 16000 * 3 || length > 16000 * 123) throw new Error('Use a recording between three seconds and the task’s response limit.');
  const bytes = new Uint8Array(44 + length * 2), view = new DataView(bytes.buffer);
  const label = (at: number, value: string) => Array.from(value).forEach((c, i) => bytes[at + i] = c.charCodeAt(0));
  label(0, 'RIFF'); view.setUint32(4, bytes.length - 8, true); label(8, 'WAVE'); label(12, 'fmt ');
  view.setUint32(16, 16, true); view.setUint16(20, 1, true); view.setUint16(22, 1, true);
  view.setUint32(24, 16000, true); view.setUint32(28, 32000, true); view.setUint16(32, 2, true); view.setUint16(34, 16, true);
  label(36, 'data'); view.setUint32(40, length * 2, true);
  for (let i = 0; i < length; i++) {
    const start = Math.floor(i * sourceRate / 16000), end = Math.max(start + 1, Math.floor((i + 1) * sourceRate / 16000));
    let total = 0, count = 0;
    for (const channel of channels) for (let j = start; j < Math.min(end, channel.length); j++) { total += channel[j]; count++; }
    const sample = Math.max(-1, Math.min(1, total / count)); view.setInt16(44 + i * 2, Math.round(sample * (sample < 0 ? 32768 : 32767)), true);
  }
  return bytes;
}
export async function prepareSpeakingAudio(blob: Blob) {
  if (blob.size > 20_000_000) throw new Error('This recording is too large. Record a shorter response.');
  const context = new AudioContext();
  try {
    const decoded = await context.decodeAudioData(await blob.arrayBuffer());
    const bytes = encodeSpeakingWav(Array.from({ length: decoded.numberOfChannels }, (_, i) => decoded.getChannelData(i)), decoded.sampleRate);
    return { bytes, hash: Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes as Uint8Array<ArrayBuffer>))).map(n => n.toString(16).padStart(2, '0')).join('') };
  } finally { await context.close(); }
}
