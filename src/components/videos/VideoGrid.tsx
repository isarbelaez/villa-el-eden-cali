import { useState } from "react";
import { videos } from "@/data/videos";
import VideoCard from "./VideoCard";

type VideoItem = {
  id: number;
  src: string;
  thumbnail: string;
};

export default function VideoGrid() {
  const [activeId, setActiveId] = useState<number | null>(null);

  const handleNext = () => {
    if (!videos.length) return;

    const currentIndex =
      activeId === null ? -1 : videos.findIndex((video) => video.id === activeId);

    const nextVideo =
      currentIndex >= 0 ? videos[currentIndex + 1] : videos[0];

    if (nextVideo) {
      setActiveId(nextVideo.id);
    } else {
      setActiveId(videos[0].id);
    }
  };

  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {videos.map((video: VideoItem) => (
            <VideoCard
              key={video.id}
              video={video}
              activeId={activeId}
              setActiveId={setActiveId}
              nextVideo={handleNext}
            />
          ))}
        </div>
      </div>
    </section>
  );
}