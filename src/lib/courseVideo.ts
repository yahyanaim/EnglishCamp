import type { TeachingVideo } from "@/data/course-enrichment/types";

export function courseVideoUrls(video: TeachingVideo) {
  return {
    watchUrl: `https://www.youtube.com/watch?v=${video.id}&t=${video.start}s`,
    embedUrl: `https://www.youtube-nocookie.com/embed/${video.id}?start=${video.start}${video.end ? `&end=${video.end}` : ""}&autoplay=0&playsinline=1&cc_load_policy=1`,
  };
}
