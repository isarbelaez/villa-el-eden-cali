const base = import.meta.env.BASE_URL;

export const videos = [
  {
    id: 1,
    src: `${base}/videos/videuno.mp4`,
    thumbnail: "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop",
    title: "Experiencia Única"
  },
  {
    id: 2,
    src: `${base}/videos/videodos.mp4`,
    thumbnail: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1200&auto=format&fit=crop",
    title: "Confort Natural"
  },
  {
    id: 3,
    src: `${base}/videos/videotres.mp4`,
    thumbnail: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=1200&auto=format&fit=crop",
    title: "Vistas Inolvidables"
  }
];