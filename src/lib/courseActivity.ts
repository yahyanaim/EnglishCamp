import type { ActivityQuestion } from "@/data/types";

export function countWords(text: string): number {
  return text.trim().match(/\S+/g)?.length ?? 0;
}
export function normalizeAnswer(text: string): string {
  return text.normalize("NFKC").replace(/[‘’]/g, "'").trim().toLowerCase().replace(/\s+/g, " ");
}
export function checkActivityAnswer(question: ActivityQuestion, answer: string): boolean {
  if (question.selectCount) {
    try {
      const selected: unknown = JSON.parse(answer);
      return Array.isArray(selected) && selected.length === question.selectCount && new Set(selected).size === selected.length && question.answers.every(key => selected.includes(key));
    } catch { return false; }
  }
  if (question.maxWords && countWords(answer) > question.maxWords) return false;
  const normalize = (value: string) => {
    const normalized = normalizeAnswer(value);
    return question.punctuation === "terminal" ? normalized.replace(/\.$/, "") : normalized;
  };
  return question.answers.some(key => normalize(key) === normalize(answer));
}
export function activityStorageKey(exerciseId: string, taskId: string): string {
  return `englishcamp-course-v1:${exerciseId}:${taskId}`;
}
export function microphoneError(error: unknown): string {
  const name = error instanceof Error ? error.name : "";
  if (name === "NotAllowedError" || name === "SecurityError") return "Microphone access was denied. Allow it in your browser settings, then try again.";
  if (name === "NotFoundError") return "No microphone was found. Connect one and try again.";
  if (name === "NotReadableError") return "The microphone is busy or unavailable. Close other recording apps and try again.";
  return "Recording could not start. Check your microphone and browser permissions, then try again.";
}

export function selectedAnswers(answer: string): string[] {
  try { const values: unknown = JSON.parse(answer); return Array.isArray(values) && values.every(v => typeof v === "string") ? values : []; } catch { return []; }
}

/** Stop the acquired stream if a browser codec/recorder constructor fails. */
export async function createLocalRecording(
  devices: Pick<MediaDevices, "getUserMedia">,
  Recorder: typeof MediaRecorder,
): Promise<{ media: MediaStream; recorder: MediaRecorder }> {
  const media = await devices.getUserMedia({ audio: true });
  try { return { media, recorder: new Recorder(media) }; }
  catch (error) { media.getTracks().forEach(track => track.stop()); throw error; }
}

export interface RecordingSession {
  start: () => Promise<void>;
  stop: () => void;
  dispose: () => void;
}

/** Own one take, including a permission request that may finish after navigation. */
export function createRecordingSession(
  devices: Pick<MediaDevices, "getUserMedia">,
  Recorder: typeof MediaRecorder,
  callbacks: {
    onStart: () => void;
    onReady: (audio: Blob) => void;
    onError: (message: string) => void;
  },
): RecordingSession {
  let media: MediaStream | undefined;
  let recorder: MediaRecorder | undefined;
  let started = false, finished = false, disposed = false;
  const chunks: Blob[] = [];
  function release() {
    media?.getTracks().forEach(track => track.stop());
    media = undefined;
    if (recorder) {
      recorder.ondataavailable = null;
      recorder.onstop = null;
      recorder.onerror = null;
    }
  }
  function stopRecorder() {
    if (recorder && recorder.state !== "inactive") recorder.stop();
  }
  function fail(message: string) {
    if (finished || disposed) return;
    finished = true;
    release();
    try { stopRecorder(); } catch { /* Tracks are already released. */ }
    callbacks.onError(message);
  }
  return {
    async start() {
      if (started || disposed) return;
      started = true;
      try {
        const capture = await createLocalRecording(devices, Recorder);
        media = capture.media; recorder = capture.recorder;
        if (disposed) { release(); return; }
        recorder.ondataavailable = event => { if (!finished && !disposed && event.data.size) chunks.push(event.data); };
        recorder.onstop = () => {
          if (finished || disposed) return;
          finished = true;
          const audio = new Blob(chunks, { type: recorder!.mimeType || "audio/webm" });
          release();
          if (audio.size) callbacks.onReady(audio);
          else callbacks.onError("No audio was captured. Please record again.");
        };
        recorder.onerror = () => fail("Recording was interrupted. Please try again.");
        recorder.start();
        if (!finished && !disposed) callbacks.onStart();
      } catch (error) { fail(microphoneError(error)); }
    },
    stop() {
      if (finished || disposed) return;
      try { stopRecorder(); }
      catch { fail("Recording could not stop normally. Please record again."); }
    },
    dispose() {
      disposed = true;
      release();
      try { stopRecorder(); } catch { /* Navigation must still release the stream. */ }
    },
  };
}
