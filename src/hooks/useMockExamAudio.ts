"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { mockExamAudio } from "@/data/mock-exam-audio";

export function useMockExamAudio(sectionId: string, enabled: boolean, speed: number) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playRequest = useRef({ version: 0 });
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioHasPlayed, setAudioHasPlayed] = useState<Record<string, boolean>>({});
  const [audioError, setAudioError] = useState<string | null>(null);
  const src = mockExamAudio[sectionId];

  const stopAudio = useCallback(() => {
    playRequest.current.version++;
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setIsPlayingAudio(false);
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    const requests = playRequest.current;
    setIsPlayingAudio(false);
    setAudioError(null);
    if (!enabled && audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    // Capture the old element so a pending play or navigation cannot leave it speaking.
    return () => {
      requests.version++;
      audio?.pause();
    };
  }, [sectionId, enabled]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.playbackRate = speed;
  }, [speed, sectionId, enabled]);

  const toggleAudioPlayback = async () => {
    const audio = audioRef.current;
    if (!enabled || !audio || !src) return;
    setAudioError(null);
    if (!audio.paused) {
      playRequest.current.version++;
      audio.pause();
      return;
    }
    if (audio.error) audio.load();
    if (audio.ended) audio.currentTime = 0;
    audio.playbackRate = speed;
    const request = ++playRequest.current.version;
    try {
      await audio.play();
    } catch {
      if (request !== playRequest.current.version || audio !== audioRef.current) return;
      setIsPlayingAudio(false);
      setAudioError("The recording could not play. Please try Play Audio Stream again.");
    }
  };

  return {
    src,
    isPlayingAudio,
    audioHasPlayed,
    audioError,
    stopAudio,
    toggleAudioPlayback,
    audioProps: {
      ref: audioRef,
      src,
      preload: "none" as const,
      hidden: true,
      onPlay: () => {
        setIsPlayingAudio(true);
        setAudioHasPlayed((played) => ({ ...played, [sectionId]: true }));
      },
      onPause: () => setIsPlayingAudio(false),
      onEnded: () => setIsPlayingAudio(false),
      onError: () => {
        setIsPlayingAudio(false);
        setAudioError("The recording could not load. Please try Play Audio Stream again.");
      },
    },
  };
}
