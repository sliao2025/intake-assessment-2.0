import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Square,
  Play,
  Pause,
  Trash2,
  Upload,
  Loader2,
} from "lucide-react";
import { intPsychTheme } from "./theme";

function useRecorder(audioState?: string | null, fileName?: string | null) {
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const [recording, setRecording] = useState(false);
  const [permissionError, setPermissionError] = useState<string | null>(null);
  const [audioURL, setAudioURL] = useState<string | null>(audioState ?? null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [duration, setDuration] = useState(0);
  const timerRef = useRef<number | null>(null);
  const elapsedRef = useRef(0);
  const audioURLRef = useRef<string | null>(audioState ?? null);

  // Keep ref in sync with state
  useEffect(() => {
    audioURLRef.current = audioURL;
  }, [audioURL]);

  // ✅ UPDATE audioURL when audioState prop changes
  useEffect(() => {
    if (audioState && audioState !== audioURL) {
      console.log(`[useRecorder] Loading existing audio from: ${audioState}`);
      setAudioURL(audioState);
    }
  }, [audioState, audioURL]);

  const start = async () => {
    setPermissionError(null);
    setAudioURL(null);
    setAudioBlob(null);
    setDuration(0);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mr = new MediaRecorder(stream);
      chunksRef.current = [];
      mr.ondataavailable = (e) => {
        if (e.data && e.data.size > 0) chunksRef.current.push(e.data);
      };
      mr.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioBlob(blob);
        const url = URL.createObjectURL(blob);
        setAudioURL(url);
        setDuration(elapsedRef.current); // Capture the duration when stopping
        chunksRef.current = [];

        // Clean up stream
        if (streamRef.current) {
          streamRef.current.getTracks().forEach((t) => t.stop());
          streamRef.current = null;
        }
      };
      mediaRecorderRef.current = mr;
      mr.start();
      setRecording(true);
      setElapsed(0);
      elapsedRef.current = 0;
      timerRef.current = window.setInterval(() => {
        elapsedRef.current += 1;
        setElapsed(elapsedRef.current);
      }, 1000) as unknown as number;
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
    // Revoke blob URL to free memory if it's a blob URL
    const currentURL = audioURLRef.current;
    if (currentURL && currentURL.startsWith("blob:")) {
      console.log(`[useRecorder] Revoking blob URL: ${currentURL}`);
      URL.revokeObjectURL(currentURL);
    }

    setAudioURL(null);
    setAudioBlob(null);
    setElapsed(0);
    setDuration(0);
    elapsedRef.current = 0;
    audioURLRef.current = null;
  };

  // Cleanup blob URL on unmount
  useEffect(() => {
    return () => {
      const currentURL = audioURLRef.current;
      if (currentURL && currentURL.startsWith("blob:")) {
        console.log(`[useRecorder] Cleanup: Revoking blob URL on unmount`);
        URL.revokeObjectURL(currentURL);
      }
    };
  }, []);

  return {
    start,
    stop,
    reset,
    recording,
    permissionError,
    audioURL,
    audioBlob,
    elapsed,
    duration,
  };
}

export interface VoiceRecorderHandle {
  uploadToCloud: () => Promise<{
    url: string;
    fileName: string;
    uploadedAt: string;
  } | null>;
  deleteRecording: () => Promise<void>;
}

export type AttachCallback = (
  data: {
    url: string;
    fileName: string;
    uploadedAt: string;
  } | null
) => void | Promise<void>;

const VoiceRecorder = forwardRef<
  VoiceRecorderHandle,
  {
    onAttach?: AttachCallback;
    fieldName: string;
    label?: string;
    audioState?: string | null;
    fileName?: string | null;
  }
>(function VoiceRecorder(
  {
    onAttach,
    fieldName,
    label = "Record a quick answer (optional)",
    audioState,
    fileName: existingFileName,
  },
  ref
) {
  const [playing, setPlaying] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState(!!existingFileName);
  const [currentFileName, setCurrentFileName] = useState<string | null>(
    existingFileName || null
  );
  const [actualDuration, setActualDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Update state when props change (e.g., when navigating back to the page)
  useEffect(() => {
    if (existingFileName && existingFileName !== currentFileName) {
      console.log(
        `[VoiceRecorder ${fieldName}] Updating fileName from props:`,
        existingFileName
      );
      setCurrentFileName(existingFileName);
      setIsUploaded(true);
    }
  }, [existingFileName, currentFileName, fieldName]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);

  const {
    start,
    stop,
    reset,
    recording,
    permissionError,
    audioURL,
    audioBlob,
    elapsed,
    duration,
  } = useRecorder(audioState, existingFileName);

  // Upload function - uploads blob to cloud storage AND saves to SQL
  const uploadBlobToCloud = async (
    blob: Blob
  ): Promise<{
    url: string;
    fileName: string;
    uploadedAt: string;
  } | null> => {
    if (!blob || !fieldName) {
      console.warn(
        `[VoiceRecorder ${fieldName}] Upload aborted - missing blob or fieldName`
      );
      return null;
    }

    console.log(`[VoiceRecorder ${fieldName}] Starting upload to cloud...`);
    setUploading(true);
    setUploadError(null);

    try {
      const formData = new FormData();
      formData.append("audio", blob, `${fieldName}.webm`);
      formData.append("fieldName", fieldName);

      console.log(
        `[VoiceRecorder ${fieldName}] Uploading to /api/upload/audio`
      );
      const response = await fetch("/api/upload/audio", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Upload failed");
      }

      const data = await response.json();
      console.log(
        `[VoiceRecorder ${fieldName}] Cloud upload successful:`,
        data
      );

      // Mark as uploaded and return full data object
      if (data.url && data.fileName) {
        setIsUploaded(true);
        setCurrentFileName(data.fileName);

        const uploadData = {
          url: data.url,
          fileName: data.fileName,
          uploadedAt: data.uploadedAt,
        };

        console.log(
          `[VoiceRecorder ${fieldName}] Saving to SQL database via onAttach...`
        );

        // Update parent state AND save to SQL (parent is responsible for SQL save)
        if (onAttach) {
          await onAttach(uploadData);
        }

        console.log(
          `[VoiceRecorder ${fieldName}] Upload and SQL save complete`
        );
        return uploadData;
      }
      console.warn(
        `[VoiceRecorder ${fieldName}] Upload response missing url or fileName`
      );
      return null;
    } catch (err: any) {
      setUploadError(err?.message || "Failed to upload audio");
      console.error(`[VoiceRecorder ${fieldName}] Upload error:`, err);
      return null;
    } finally {
      setUploading(false);
    }
  };

  // Debug: Log when audioURL changes
  useEffect(() => {
    console.log(`[VoiceRecorder ${fieldName}] audioURL changed:`, audioURL);
  }, [audioURL, fieldName]);

  // Debug: Log when props change
  useEffect(() => {
    console.log(`[VoiceRecorder ${fieldName}] Props:`, {
      audioState,
      fileName: existingFileName,
    });
  }, [audioState, existingFileName, fieldName]);

  // Existing useEffect for duration from audio element
  useEffect(() => {
    const audio = audioRef.current;
    if (audio && audioURL && !audioBlob) {
      // This is an existing recording
      const handleLoadedMetadata = () => {
        console.log(
          `[VoiceRecorder ${fieldName}] Audio metadata loaded, duration:`,
          audio.duration
        );
        if (
          audio.duration &&
          !isNaN(audio.duration) &&
          isFinite(audio.duration)
        ) {
          setActualDuration(Math.floor(audio.duration));
        }
      };

      const handleError = (e: Event) => {
        console.error(`[VoiceRecorder ${fieldName}] Audio load error:`, e);
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("error", handleError);

      // Try to load if not already loading
      if (audio.readyState === 0) {
        console.log(`[VoiceRecorder ${fieldName}] Starting audio load...`);
        audio.load();
      }

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("error", handleError);
      };
    }
  }, [audioURL, audioBlob, fieldName]);

  // Update actualDuration when duration changes from recording
  useEffect(() => {
    if (duration > 0) {
      setActualDuration(duration);
    }
  }, [duration]);

  // Auto-upload when a new recording blob is created
  const uploadingRef = useRef(false);
  useEffect(() => {
    if (audioBlob && !isUploaded && !uploading && !uploadingRef.current) {
      console.log(
        `[VoiceRecorder ${fieldName}] New blob detected, triggering upload...`
      );
      uploadingRef.current = true;
      uploadBlobToCloud(audioBlob)
        .catch((err) => {
          console.error(
            `[VoiceRecorder ${fieldName}] Auto-upload failed:`,
            err
          );
        })
        .finally(() => {
          uploadingRef.current = false;
        });
    }
  }, [audioBlob, isUploaded, uploading, fieldName]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    const onEnd = () => setPlaying(false);
    a.addEventListener("ended", onEnd);
    return () => a.removeEventListener("ended", onEnd);
  }, []);

  const handleUpload = async (): Promise<{
    url: string;
    fileName: string;
    uploadedAt: string;
  } | null> => {
    if (!audioBlob) {
      console.warn(`[VoiceRecorder ${fieldName}] No audioBlob available`);
      return null;
    }
    return await uploadBlobToCloud(audioBlob);
  };

  const handleDelete = async () => {
    console.log(`[VoiceRecorder ${fieldName}] Starting delete operation...`);

    try {
      // Step 1: Delete from cloud storage if file exists
      if (currentFileName) {
        console.log(
          `[VoiceRecorder ${fieldName}] Deleting from cloud: ${currentFileName}`
        );
        const response = await fetch(
          `/api/upload/audio?fileName=${encodeURIComponent(currentFileName)}`,
          { method: "DELETE" }
        );

        if (!response.ok) {
          console.error(
            `[VoiceRecorder ${fieldName}] Cloud delete failed with status ${response.status}`
          );
          throw new Error("Failed to delete from cloud storage");
        }
        console.log(`[VoiceRecorder ${fieldName}] Cloud delete successful`);
      }

      // Step 2: Clear SQL reference (set audio field to undefined)
      console.log(
        `[VoiceRecorder ${fieldName}] Clearing SQL database via onAttach(null)...`
      );
      if (onAttach) {
        await onAttach(null);
      }
      console.log(`[VoiceRecorder ${fieldName}] SQL delete completed`);

      // Step 3: Clear all local state
      reset();
      setIsUploaded(false);
      setActualDuration(0);
      setCurrentFileName(null);

      console.log(`[VoiceRecorder ${fieldName}] Delete operation complete`);
    } catch (err) {
      console.error(
        `[VoiceRecorder ${fieldName}] Delete operation failed:`,
        err
      );
      setUploadError("Failed to delete recording");
      throw err;
    }
  };

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
    analyser.fftSize = 256;
    analyser.smoothingTimeConstant = 0.8;
    const src = audioCtx.createMediaStreamSource(stream);
    src.connect(analyser);
    audioCtxRef.current = audioCtx;
    analyserRef.current = analyser;

    const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const draw = () => {
      rafRef.current = requestAnimationFrame(draw);
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      analyser.getByteFrequencyData(dataArray);
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Modern waveform visualization
      const bars = 60;
      const step = Math.floor(dataArray.length / bars);
      const barWidth = Math.max(3, (w - (bars - 1) * 2) / bars);
      const centerY = h / 2;

      for (let i = 0; i < bars; i++) {
        const v = dataArray[i * step] / 255;
        const barHeight = Math.max(4, v * (h * 0.8));
        const x = i * (barWidth + 2);
        const y = centerY - barHeight / 2;

        // Create gradient for modern look
        const grad = ctx.createLinearGradient(
          0,
          centerY - barHeight / 2,
          0,
          centerY + barHeight / 2
        );
        grad.addColorStop(0, intPsychTheme.accent);
        grad.addColorStop(1, intPsychTheme.primary);

        ctx.fillStyle = grad;
        ctx.fillRect(x, y, barWidth, barHeight);
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
    // If there's an existing recording, delete it first
    if (audioURL || currentFileName) {
      console.log(
        `[VoiceRecorder ${fieldName}] Deleting existing recording before new recording`
      );
      try {
        await handleDelete();
      } catch (err) {
        console.error(
          `[VoiceRecorder ${fieldName}] Failed to delete existing recording:`,
          err
        );
        // Continue with recording even if delete fails
      }
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      startVisualizer(stream);
      await start();
    } catch (e) {
      console.error(
        `[VoiceRecorder ${fieldName}] Failed to start recording:`,
        e
      );
    }
  };

  const handleStop = async () => {
    console.log(`[VoiceRecorder ${fieldName}] Stop button clicked`);
    stop();
    stopVisualizer();

    // Wait for the blob to be created (happens in mr.onstop)
    // We'll trigger the upload after the blob is ready
  };

  // Expose upload and delete functions to parent via ref (must be after handler definitions)
  useImperativeHandle(ref, () => ({
    uploadToCloud: async () => {
      console.log(`[VoiceRecorder ${fieldName}] uploadToCloud called`, {
        hasAudioBlob: !!audioBlob,
        hasFieldName: !!fieldName,
        isUploaded,
        audioURL,
      });

      if (!audioBlob || !fieldName || isUploaded) {
        console.log(
          `[VoiceRecorder ${fieldName}] Skipping upload - already uploaded or no blob`
        );
        return null; // Nothing to upload or already uploaded
      }
      return await handleUpload();
    },
    deleteRecording: async () => {
      await handleDelete();
    },
  }));

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
              ? `Recorded clip (${mmss(actualDuration)})`
              : "No recording yet"}
        </span>
        <span className="font-mono">{recording ? mmss(elapsed) : ""}</span>
      </div>
      {recording && (
        <div className="mt-3 rounded-xl bg-slate-100 p-4 border border-slate-200">
          <canvas
            ref={canvasRef}
            width={800}
            height={100}
            className="w-full h-20"
          />
        </div>
      )}
      {audioURL && (
        <div className="mt-3 space-y-2">
          <audio ref={audioRef} src={audioURL} />
          <div className="flex items-center gap-2 flex-wrap">
            {!playing ? (
              <button
                onClick={() => {
                  setPlaying(true);
                  audioRef.current?.play();
                }}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-800 hover:bg-slate-100"
              >
                <Play className="h-4 w-4" /> Play
              </button>
            ) : (
              <button
                onClick={() => {
                  audioRef.current?.pause();
                  setPlaying(false);
                }}
                className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-800 hover:bg-slate-100"
              >
                <Pause className="h-4 w-4" /> Pause
              </button>
            )}
            <button
              onClick={async () => {
                audioRef.current?.pause();
                setPlaying(false);
                await handleDelete();
              }}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold border border-slate-300 text-slate-800 hover:bg-slate-100"
            >
              <Trash2 className="h-4 w-4" /> Remove
            </button>
          </div>
          {uploadError && (
            <p className="text-xs text-red-600 mt-1">
              Upload error: {uploadError}
            </p>
          )}
        </div>
      )}
    </div>
  );
});

export default VoiceRecorder;
