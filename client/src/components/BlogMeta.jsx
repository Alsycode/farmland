import React from "react";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";

export default function BlogMeta({ date, readTime, author, className = "" }) {
  return (
    <div className={`flex items-center gap-6 text-gray-500 text-sm ${className}`}>
      <div className="flex items-center gap-2">
        <FaCalendarAlt />
        <span>{date}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaClock />
        <span>{readTime}</span>
      </div>
      <div className="flex items-center gap-2">
        <FaUser />
        <span>{author}</span>
      </div>
    </div>
  );
}
