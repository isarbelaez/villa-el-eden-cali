import VideoPlayer from "./VideoPlayer";

type VideoItem = {
  id: number;
  src: string;
  thumbnail: string;
};

type Props = {
  video: VideoItem;
  activeId: number | null;
  setActiveId: (id: number | null) => void;
  nextVideo: () => void;
};

export default function VideoCard({
  video,
  activeId,
  setActiveId,
  nextVideo,
}: Props) {
  const isPlaying = activeId === video.id;

  const handleToggle = () => {
    setActiveId(isPlaying ? null : video.id);
  };

  return (
    <div
      className="group relative aspect-9/16 overflow-hidden rounded-2xl bg-black select-none cursor-pointer outline-none"
      role="button"
      tabIndex={0}
      aria-label={isPlaying ? "Pausar video" : "Reproducir video"}
      onClick={handleToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleToggle();
        }
      }}
    >
      <VideoPlayer src={video.src} playing={isPlaying} onEnded={nextVideo} />

      {!isPlaying && (
        <div className="absolute inset-0 flex items-end justify-center overflow-hidden">

          {/* Imagen con scale */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-500 ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${video.thumbnail})` }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-b from-transparent to-black/70" />

          {/* Botón */}
          <div className="relative z-10 w-full h-full flex items-end justify-center">

            <button
              type="button"
              tabIndex={-1}
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 translate-y-1/2 group-hover:translate-y-[-50%] transform transition-all duration-500 ease-out flex h-16 w-16 items-center justify-center rounded-full border border-white/40 bg-white/20 backdrop-blur-md"
            >
              <svg viewBox="0 0 24 24" className="h-8 w-8 fill-white text-white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            </button>

          </div>
        </div>
      )}
    </div>
  );
}