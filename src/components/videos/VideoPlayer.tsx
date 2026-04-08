import { useMemo, useRef, useState } from "react";
import ReactPlayer from "react-player";

type Props = {
  src: string;
  playing: boolean;
  onEnded: () => void;
};

export default function VideoPlayer({ src, playing, onEnded }: Props) {
  const playerRef = useRef<HTMLVideoElement | null>(null);

  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);

  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  const formatTime = (seconds: number) => {
    if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const currentTime = useMemo(() => played * duration, [played, duration]);

  const seekToFraction = (fraction: number) => {
    const player = playerRef.current;
    if (!player || !Number.isFinite(duration) || duration <= 0) return;

    const nextTime = Math.min(Math.max(fraction * duration, 0), duration);
    player.currentTime = nextTime;
  };

  return (
    <div className="relative h-full w-full bg-black">
      <ReactPlayer
        ref={playerRef}
        src={src}
        playing={playing}
        muted={muted}
        volume={volume}
        controls={false}
        playsInline
        width="100%"
        height="100%"
        style={{
          position: "absolute",
          inset: 0,
        }}
        onDurationChange={(event) => {
          const video = event.currentTarget;
          const dur = video.duration;

          if (Number.isFinite(dur) && dur > 0) {
            setDuration(dur);
          }
        }}
        onTimeUpdate={(event) => {
          if (seeking) return;

          const target = event?.currentTarget ?? playerRef.current;
          const current =
            typeof target?.currentTime === "number" ? target.currentTime : 0;
          const nextDuration =
            typeof target?.duration === "number" && target.duration > 0
              ? target.duration
              : duration;

          if (Number.isFinite(nextDuration) && nextDuration > 0) {
            setDuration(nextDuration);
            setPlayed(current / nextDuration);
          }
        }}
        onEnded={onEnded}
      />

      {playing && (
        <div
          className="absolute inset-x-0 bottom-0 z-20 bg-black/60 p-3 text-white backdrop-blur-md transition-opacity duration-200 opacity-100 md:opacity-0 md:pointer-events-none md:group-hover:opacity-100 md:group-hover:pointer-events-auto"
          onClick={(e) => e.stopPropagation()}
          onPointerDown={(e) => e.stopPropagation()}
        >
          <div className="mb-1 flex items-center justify-between text-xs">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>

          <input
            type="range"
            min={0}
            max={1}
            step="0.01"
            value={played}
            onPointerDown={(e) => {
              e.stopPropagation();
              setSeeking(true);
            }}
            onPointerUp={(e) => {
              e.stopPropagation();
              const value = parseFloat(e.currentTarget.value);
              setSeeking(false);
              seekToFraction(value);
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
              setSeeking(true);
            }}
            onTouchEnd={(e) => {
              e.stopPropagation();
              const target = e.currentTarget as HTMLInputElement;
              const value = parseFloat(target.value);
              setSeeking(false);
              seekToFraction(value);
            }}
            onChange={(e) => {
              const value = parseFloat(e.target.value);
              setPlayed(value);
            }}
            className="w-full accent-white"
          />

          <div className="mt-3 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMuted((prev) => !prev);
              }}
              className="text-sm font-medium"
            >
              {muted ? "🔇" : "🔊"}
            </button>

            <div
              className="flex w-40 items-center gap-2"
              onClick={(e) => e.stopPropagation()}
              onPointerDown={(e) => e.stopPropagation()}
            >
              <span className="text-xs">Vol</span>
              <input
                type="range"
                min={0}
                max={1}
                step="0.05"
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-full accent-white"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}