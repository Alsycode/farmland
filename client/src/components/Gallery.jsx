import React from "react";

/**
 * Simple gallery layout: big left image, top-right video or image, and "show all" tile.
 * Accepts images array and optional videoUrl (if provided we'll render a <video>).
 */
export default function Gallery({ images = [], videoUrl = null }) {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-span-2">
        <img src={images[0]} alt="main" className="w-full h-[420px] object-cover rounded-xl" />
      </div>

      <div className="flex flex-col gap-4">
        {videoUrl ? (
          <video
            controls
            src={videoUrl}
            className="w-full h-[200px] object-cover rounded-xl"
          />
        ) : (
          <img src={images[1] || images[0]} alt="side" className="w-full h-[200px] object-cover rounded-xl" />
        )}

        <div className="w-full h-[200px] bg-gray-300 rounded-xl flex items-center justify-center text-white font-semibold">
          Show All {images.length} media
        </div>
      </div>
    </div>
  );
}
