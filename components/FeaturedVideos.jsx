import { Play } from "lucide-react";

// Add video objects here when your channel links are ready.
// Supported links: youtube.com/watch?v=..., youtu.be/..., and youtube.com/shorts/...
const featuredVideos = [
  // { title: "Our latest stone project", url: "https://www.youtube.com/watch?v=YOUR_VIDEO_ID" },

  { title: "BAYT AL KHAIR", url: " https://youtu.be/QduipIZDIb0?si=rRWmlg4CCjU8GfZv" },
  // { title: "BAYT AL KHAIR", url: " https://youtu.be/QduipIZDIb0?si=rRWmlg4CCjU8GfZv" },
  // { title: "BAYT AL KHAIR", url: " https://youtu.be/QduipIZDIb0?si=rRWmlg4CCjU8GfZv" }
];
const emptySlots = [1, 2, 3];

function getVideoId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes("youtu.be")) return parsed.pathname.slice(1);
    if (parsed.pathname.includes("/shorts/")) return parsed.pathname.split("/shorts/")[1]?.split("/")[0];
    return parsed.searchParams.get("v") || parsed.pathname.split("/embed/")[1]?.split("/")[0] || "";
  } catch {
    return "";
  }
}

export default function FeaturedVideos() {
  const videos = featuredVideos.map(video => ({ ...video, id: getVideoId(video.url) })).filter(video => video.id);
  //{videos.map((video, index) => <article className="video-card" key={`${video.id}-${index}`}></article>)};
  return <section className="featured-videos section-shell" id="videos">
    <div className="section-title"><span /><h2>Featured Videos</h2><span /></div>
    <p className="videos-intro">Projects, materials and inspiration from United Stones.</p>
    {videos.length ? <div className="video-grid">{videos.map((video, index) => <article className="video-card" key={`${video.id}-${index}`}>
      <div className="video-frame"><iframe src={`https://www.youtube-nocookie.com/embed/${video.id}`} title={video.title} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen /></div>
      <h3>{video.title}</h3>
    </article>)}</div> : <div className="video-grid video-grid-empty">{emptySlots.map(slot => <div className="video-card video-placeholder" key={slot} aria-label={`Featured video slot ${slot}`}>
      <div className="video-placeholder-image"><span><Play size={22} fill="currentColor" /></span><small>COMING SOON</small></div>
      <h3>Featured video</h3>
    </div>)}</div>}
  </section>;
}
