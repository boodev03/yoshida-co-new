"use client";

import { VideoData } from "@/hooks/useGetCases";

interface VideoContentProps {
  data: VideoData;
}

export default function VideoContent({ data }: VideoContentProps) {
  const { url, title } = data;

  // Extract video ID from YouTube URL
  const getYouTubeVideoId = (url: string) => {
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  const videoId = getYouTubeVideoId(url);
  const embedUrl = videoId ? `https://www.youtube.com/embed/${videoId}` : url;

  return (
    <div className="container mx-auto my-8 md:my-16">
      {title && (
        <h3 className="text-jp-h3 font-bold text-web-dark mb-4 md:mb-6">
          {title}
        </h3>
      )}
      <div className="relative aspect-video md:mx-[96px]">
        <iframe
          src={embedUrl}
          title={title || "Video player"}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="size-full object-cover"
        />
      </div>
    </div>
  );
}
