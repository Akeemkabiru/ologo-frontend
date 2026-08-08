import React from "react";

const urlRegex = /(https?:\/\/[^\s]+)/g;

/**
 * Renders text with any http(s) URLs turned into clickable links that open in
 * a new tab. Used in chat messages, notes and reviews.
 */
export default function LinkText({
  text,
  className = "text-violet-600",
}: {
  text: string;
  className?: string;
}) {
  const parts = text.split(urlRegex);
  return (
    <>
      {parts.map((part, i) =>
        /^https?:\/\//.test(part) ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener noreferrer"
            className={`underline break-all hover:opacity-80 ${className}`}
          >
            {part}
          </a>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  );
}
