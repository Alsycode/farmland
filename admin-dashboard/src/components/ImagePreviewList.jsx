// path: src/components/ImagePreviewList.jsx
import React from 'react';

/**
 * Small image preview list - shows available images (from url) and local selects (File objects)
 * props:
 *  - images: array of { url, filename } or array of File objects (when newly selected)
 */
export default function ImagePreviewList({ images = [], onRemove }) {
  return (
    <div className="flex gap-3 flex-wrap">
      {images.map((img, idx) => {
        const isFile = img instanceof File;
        const src = isFile ? URL.createObjectURL(img) : img.url || img.path || img;
        return (
          <div key={idx} className="w-36 border rounded overflow-hidden relative">
            <img src={src} alt={img.filename || `img-${idx}`} className="w-full h-24 object-cover" />
            <button
              type="button"
              onClick={() => onRemove && onRemove(idx)}
              className="absolute top-1 right-1 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
              title="Remove"
            >
              ×
            </button>
            <div className="p-2 text-xs">{img.filename || (isFile ? img.name : '')}</div>
          </div>
        );
      })}
    </div>
  );
}
