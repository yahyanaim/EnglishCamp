/**
 * Course narration and mock-exam recordings are kept as reviewed PCM WAV masters in the
 * repository, and each master has a 48 kbps mono MP3 copy beside it. The Cloudflare build ships
 * only the MP3 copies, so every player asks for those (about 7x smaller downloads).
 */
const MASTER = /^\/media\/(?:courses|mock-exams)\/[\w./-]+\.wav$/;

export function playableAudioSrc(src: string): string;
export function playableAudioSrc(src: string | undefined): string | undefined;
export function playableAudioSrc(src: string | undefined) {
  return src && MASTER.test(src) ? src.slice(0, -4) + ".mp3" : src;
}
