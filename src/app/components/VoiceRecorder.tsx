import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Square, Play, Pause, Trash2 } from "lucide-react";

const theme = {
  primary: "#16a34a",
  accent: "#84cc16",
};

function useRecorder(audioState?: string | null) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recording, setRecording] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(audioState ?? null);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<number | null>(null);

  const start = async () => {
    setPermissionError(null);
    setAudioURL(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioURL(URL.createObjectURL(blob));
        chunksRef.current = [];
        stream.getTracks().forEach((t) => t.stop());
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setRecording(true);
      setElapsed(0);
      timerRef.current = window.setInterval(
        () => setElapsed((s) => s + 1),
        1000
      ) as unknown as number;
    } catch (err: any) {
      setPermissionError(err?.message || "Microphone not available.");
    }
  };

  const stop = () => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
    if (timerRef.current) window.clearInterval(timerRef.current);
  };

  const reset = () => {
    setAudioURL(null);
    setElapsed(0);
  };

  return { start, stop, reset, recording, permissionError, audioURL, elapsed };
}

export default function VoiceRecorder({
  onAttach,
  label = "Record a quick answer (optional)",
  audioState,
}: {
  onAttach?: (url: string | null) => void;
  label?: string;
  audioState?: string | null;
}) {
  const { start, stop, reset, recording, permissionError, audioURL, elapsed } =
    useRecorder(audioState);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  useEffect(() => {
    if (onAttach) onAttach(audioURL || null);
  }, [audioURL]);
  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnd = () => setPlaying(false);
    a.addEventListener("ended", onEnd);
    return () => a.removeEventListener("ended", onEnd);
  }, []);

  const mmss = (s: number) =>
    `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(
      2,
      "0"
    )}`;

  const startVisualizer = (stream: MediaStream) => {
    stopVisualizer();
    const audioCtx = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 128;
    analyser.smoothingTimeConstant = 0.7;
    const src = audioCtx.createMediaStreamSource(stream);
    src.connect(analyser);
    audioCtxRef.current = audioCtx;
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      const canvas = canvasRef.current;
      const wrap = canvasRef.current;
      if (!canvas || !wrap) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      analyser.getByteFrequencyData(dataArray);
      const w = wrap.clientWidth;
      const h = wrap.clientHeight;
      ctx.clearRect(0, 0, w, h);

      const bars = 96;
      const step = Math.floor(dataArray.length / bars);
      const barWidth = Math.max(2, (w - (bars - 1) * 3) / bars);

      for (let i = 0; i < bars; i++) {
        const v = dataArray[i * step] / 255;
        const barHeight = Math.max(2, v * (h - 6));
        const x = i * (barWidth + 3);
        const y = h - barHeight;
        const grad = ctx.createLinearGradient(0, y, 0, y + barHeight);
        grad.addColorStop(0, theme.accent);
        grad.addColorStop(1, theme.primary);
        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "#0f172a";
        ctx.fillRect(x, y + barHeight - 2, barWidth, 2);
        ctx.globalAlpha = 1;
      }
    };
    draw();
  };

  const stopVisualizer = () => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    if (audioCtxRef.current && audioCtxRef.current.state !== "closed")
      audioCtxRef.current.close();
    rafRef.current = null;
    audioCtxRef.current = null;
    analyserRef.current = null;
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  };

  const handleStart = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      startVisualizer(stream);
      await start();
    } catch (e) {}
  };

  const handleStop = () => {
    stop();
    stopVisualizer();
  };

  return (
    <div className="rounded-2xl border border-slate-300 p-3 md:p-4 bg-slate-50">
      <div className="flex justify-between gap-2">
        <div>
          <p className="text-sm text-slate-600 font-medium">{label}</p>
          {permissionError && (
            <p className="text-xs text-amber-700 mt-1">{permissionError}</p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {!recording ? (
            <button
              onClick={handleStart}
              className="inline-flex items-center gap-2 hover:bg-red-600 cursor-pointer bg-red-500 text-white rounded-full px-3 py-2 text-sm font-semibold shadow-sm"
            >
              <Mic className="h-4 w-4" /> Record
            </button>
          ) : (
            <button
              onClick={handleStop}
              className="inline-flex items-center gap-2 hover:bg-red-600 cursor-pointer rounded-full px-3 py-2 text-sm font-semibold bg-red-500 text-white shadow-sm"
            >
              <Square className="h-4 w-4" /> Stop
            </button>
          )}
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between text-xs text-slate-600">
        <span>
          {recording
            ? "Recording…"
            : audioURL
            ? "Recorded clip"
            : "No recording yet"}
        </span>
        <span className="font-mono">{mmss(elapsed)}</span>
      </div>
      {recording && (
        <div className="mt-2 h-12 w-full overflow-hidden">
          <canvas ref={canvasRef} className="h-full w-full" />
        </div>
      )}
      {audioURL && (
        <div className="mt-3 flex items-center gap-2">
          <audio ref={audioRef} src={audioURL} />
          {!playing ? (
            <button
              onClick={() => {
                setPlaying(true);
                audioRef.current?.play();
              }}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-800"
            >
              <Play className="h-4 w-4" /> Play
            </button>
          ) : (
            <button
              onClick={() => {
                audioRef.current?.pause();
                setPlaying(false);
              }}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-800"
            >
              <Pause className="h-4 w-4" /> Pause
            </button>
          )}
          <button
            onClick={() => {
              audioRef.current?.pause();
              setPlaying(false);
              reset();
              if (onAttach) onAttach(null);
            }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-800"
          >
            <Trash2 className="h-4 w-4" /> Remove
          </button>
        </div>
      )}
    </div>
  );
}
