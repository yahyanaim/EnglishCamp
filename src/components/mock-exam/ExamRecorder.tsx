"use client";
import { Button as ControlButton } from "@/components/ui/shadcn/button";
import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import type { SpokenPrompt } from "@/data/mock-exams/types";
import {
  createRecordingSession,
  microphoneError,
  type RecordingSession,
} from "@/lib/courseActivity";
import { loadTake, saveTake, setRecordingRisk } from "@/lib/activityState";
import { examAudioSource } from "./ExamAudio";
import {
  clockText,
  primaryButton,
  secondaryButton,
  smallClass,
} from "./ExamElements";

export type ExamRecorderHandle = { finish: () => Promise<boolean> };
type Phase =
  | "idle"
  | "requesting"
  | "stimulus"
  | "preparation"
  | "recording"
  | "saving"
  | "ready";

export const ExamRecorder = forwardRef<
  ExamRecorderHandle,
  {
    task: SpokenPrompt;
    storageKey: string;
    onSaved: () => void;
    onBusy: (busy: boolean) => void;
    review?: boolean;
  }
>(function ExamRecorder(
  { task, storageKey, onSaved, onBusy, review = false },
  ref,
) {
  const [phase, setPhase] = useState<Phase>("idle"),
    [remaining, setRemaining] = useState(0),
    [error, setError] = useState(""),
    [url, setUrl] = useState(""),
    [saved, setSaved] = useState(true);
  const currentPhase = useRef<Phase>("idle"),
    alive = useRef(true),
    session = useRef<RecordingSession | null>(null),
    held = useRef<MediaStream | null>(null),
    audio = useRef<HTMLAudioElement>(null),
    objectUrl = useRef("");
  const blob = useRef<Blob | null>(null),
    persisted = useRef(true),
    deadline = useRef(0),
    generation = useRef(0),
    waiter = useRef<((saved: boolean) => void) | null>(null);
  const callbacks = useRef({ onSaved, onBusy });
  callbacks.current = { onSaved, onBusy };
  function changePhase(value: Phase) {
    currentPhase.current = value;
    if (alive.current) setPhase(value);
    callbacks.current.onBusy(!["idle", "ready"].includes(value));
    setRecordingRisk(
      storageKey,
      !["idle", "ready"].includes(value) || !persisted.current,
    );
  }
  function release() {
    held.current?.getTracks().forEach((t) => t.stop());
    held.current = null;
  }
  function show(value: Blob) {
    if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
    objectUrl.current = URL.createObjectURL(value);
    blob.current = value;
    if (alive.current) setUrl(objectUrl.current);
  }
  async function persist(value: Blob) {
    persisted.current = false;
    if (alive.current) setSaved(false);
    changePhase("saving");
    try {
      await saveTake(storageKey, value);
      persisted.current = true;
      if (alive.current) {
        setSaved(true);
        setError("");
      }
      callbacks.current.onSaved();
    } catch {
      if (alive.current)
        setError(
          "This recording could not be saved in browser storage. Retry saving, or download it before leaving. Your previous saved take is retained.",
        );
    } finally {
      changePhase("ready");
      waiter.current?.(persisted.current);
      waiter.current = null;
    }
  }
  useEffect(() => {
    alive.current = true;
    const requests = generation;
    const promptAudio = audio.current;
    const request = ++requests.current;
    loadTake(storageKey)
      .then((value) => {
        if (
          alive.current &&
          request === generation.current &&
          value &&
          currentPhase.current === "idle"
        ) {
          show(value);
          changePhase("ready");
        }
      })
      .catch(() => {
        /* A fresh take can still be downloaded if IndexedDB is unavailable. */
      });
    return () => {
      alive.current = false;
      requests.current++;
      promptAudio?.pause();
      session.current?.dispose();
      release();
      if (objectUrl.current) URL.revokeObjectURL(objectUrl.current);
      setRecordingRisk(storageKey, false);
    };
    // The parent keys the component to the immutable prompt and attempt.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);
  useImperativeHandle(ref, () => ({
    async finish() {
      if (
        currentPhase.current === "recording" ||
        currentPhase.current === "saving"
      )
        return new Promise<boolean>((resolve) => {
          waiter.current = resolve;
          if (currentPhase.current === "recording") session.current?.stop();
        });
      if (!["idle", "ready"].includes(currentPhase.current)) {
        generation.current++;
        audio.current?.pause();
        session.current?.dispose();
        release();
        changePhase(url ? "ready" : "idle");
      }
      return persisted.current;
    },
  }));
  function beginResponse() {
    if (!held.current || !alive.current) return;
    session.current?.dispose();
    const media = held.current;
    held.current = null;
    session.current = createRecordingSession(
      { getUserMedia: async () => media },
      MediaRecorder,
      {
        onStart: () => {
          deadline.current = Date.now() + task.responseSeconds * 1000;
          setRemaining(task.responseSeconds);
          changePhase("recording");
        },
        onReady: (value) => {
          show(value);
          void persist(value);
        },
        onError: (message) => {
          if (alive.current) setError(message);
          changePhase(url ? "ready" : "idle");
          waiter.current?.(false);
          waiter.current = null;
        },
      },
    );
    void session.current.start();
  }
  function afterStimulus() {
    if (task.preparationSeconds) {
      deadline.current = Date.now() + task.preparationSeconds * 1000;
      setRemaining(task.preparationSeconds);
      changePhase("preparation");
    } else beginResponse();
  }
  useEffect(() => {
    if (!["preparation", "recording"].includes(phase)) return;
    const timer = setInterval(() => {
      const left = Math.max(
        0,
        Math.ceil((deadline.current - Date.now()) / 1000),
      );
      setRemaining(left);
      if (left === 0) {
        clearInterval(timer);
        if (currentPhase.current === "preparation") beginResponse();
        else if (currentPhase.current === "recording") session.current?.stop();
      }
    }, 100);
    return () => clearInterval(timer);
    // A prompt's durations do not change while its recorder is mounted.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase]);
  async function start() {
    setError("");
    if (
      !navigator.mediaDevices?.getUserMedia ||
      typeof MediaRecorder === "undefined"
    ) {
      setError(
        "This browser cannot record audio. Use a supported browser with a microphone. Speaking stays unassessed if no response is captured.",
      );
      return;
    }
    if (!persisted.current) {
      setError(
        "Save or download your current recording before starting another take.",
      );
      return;
    }
    const request = ++generation.current;
    changePhase("requesting");
    try {
      const media = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!alive.current || request !== generation.current) {
        media.getTracks().forEach((t) => t.stop());
        return;
      }
      held.current = media;
      if (task.stimulus?.length) {
        if (!audio.current || !examAudioSource(task.id))
          throw new Error("Missing prompt recording");
        changePhase("stimulus");
        audio.current.currentTime = 0;
        await audio.current.play();
      } else afterStimulus();
    } catch (cause) {
      release();
      if (alive.current && request === generation.current) {
        setError(
          cause instanceof Error && cause.message === "Missing prompt recording"
            ? "The spoken prompt is unavailable. Retry when it has loaded; the written repeat target is kept hidden."
            : microphoneError(cause),
        );
        changePhase(url ? "ready" : "idle");
      }
    }
  }
  const busy = !["idle", "ready"].includes(phase);
  return (
    <div className="space-y-4">
      {task.stimulus?.length ? (
        <audio
          ref={audio}
          hidden
          preload="none"
          src={examAudioSource(task.id)}
          onEnded={afterStimulus}
          onError={() => {
            release();
            setError(
              "The spoken prompt could not load. Retry the prompt; your earlier saved response remains available.",
            );
            changePhase(url ? "ready" : "idle");
          }}
        />
      ) : null}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 space-y-3 text-center">
          <span className={smallClass}>
            {phase === "preparation"
              ? "Preparation"
              : phase === "recording"
                ? "Response recording"
                : "Response window"}
          </span>
          <div
            role="timer"
            className="font-mono text-3xl font-extrabold text-[var(--color-text-primary)]"
          >
            {clockText(
              busy && ["preparation", "recording"].includes(phase)
                ? remaining
                : task.responseSeconds,
            )}
          </div>
          <p className={smallClass}>
            {task.preparationSeconds
              ? `${task.preparationSeconds}s preparation before speaking`
              : "No preparation time"}
          </p>
        </div>
        <div className="bg-[var(--color-surface-alt)] border border-[var(--color-border-default)] rounded-[var(--radius-lg)] p-4 space-y-3 text-center">
          <ControlButton variant="unstyled" size="unstyled"
            className={primaryButton}
            disabled={busy || review || !!url}
            onClick={start}
          >
            {phase === "requesting"
              ? "Waiting for microphone…"
              : phase === "stimulus"
                ? "Listen to the prompt…"
                : phase === "preparation"
                  ? "Prepare now…"
                  : phase === "recording"
                    ? "● Recording response…"
                    : phase === "saving"
                      ? "Saving recording…"
                      : url
                        ? "Response recorded"
                        : "Begin speaking task"}
          </ControlButton>
          {phase === "recording" && (
            <ControlButton variant="unstyled" size="unstyled"
              className={secondaryButton}
              onClick={() => session.current?.stop()}
            >
              Stop recording
            </ControlButton>
          )}
          {phase === "requesting" && (
            <ControlButton variant="unstyled" size="unstyled"
              className={secondaryButton}
              onClick={() => {
                generation.current++;
                release();
                changePhase(url ? "ready" : "idle");
              }}
            >
              Cancel microphone request
            </ControlButton>
          )}
          <p className={smallClass}>
            The microphone is checked before the prompt. Recording begins after
            the audio and any preparation period.
          </p>
        </div>
      </div>
      <p className={smallClass}>
        Speaking recordings are saved only in this browser on this device.
        Nothing is uploaded. Writing and speaking remain unassessed until
        reviewed by a qualified assessor.
      </p>
      {error && (
        <p role="alert" className="text-sm text-[var(--color-text-error)]">
          {error}
        </p>
      )}
      {url && (
        <div className="space-y-2">
          <audio
            controls
            src={url}
            aria-label="Your saved speaking response"
            className="w-full"
          />
          <div className="flex flex-wrap gap-3">
            <a
              href={url}
              download={`${task.id}.${blob.current?.type.includes("mp4") ? "m4a" : blob.current?.type.includes("ogg") ? "ogg" : "webm"}`}
              className={secondaryButton}
              onClick={() => {
                if (!persisted.current) {
                  persisted.current = true;
                  setSaved(true);
                  setRecordingRisk(storageKey, false);
                }
              }}
            >
              Download recording
            </a>
            {!saved && (
              <ControlButton variant="unstyled" size="unstyled"
                className={secondaryButton}
                onClick={() => blob.current && void persist(blob.current)}
              >
                Retry saving
              </ControlButton>
            )}
            <span className={smallClass}>
              {saved
                ? "Recording available on this device"
                : "Not yet saved in browser storage"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
});
