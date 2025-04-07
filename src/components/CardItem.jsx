import React from "react";
import { MdBookmarkBorder, MdBookmark } from "react-icons/md";


export default function CardItem({ title, author, summary, link, onLike, onSave, likes, isSaved }) {
  const maxWords = title.length < 80 ? 40 : 25;

  const getTrimmedSummary = (text, maxWords) => {
    const words = text.split(" ");
    return words.length > maxWords
      ? words.slice(0, maxWords).join(" ") + "..."
      : text;
  };

  const trimmedSummary = getTrimmedSummary(summary, maxWords);

  return (
    <div className="bg-white p-5 rounded-md shadow-md flex flex-col h-full">
      <h3 className="text-lg font-bold mb-1">{title}</h3>
      <div className="text-sm text-gray-500 mb-2">{author}</div>
      <p className="text-sm text-gray-700 flex-1 mb-2">{trimmedSummary}</p>
      <div className="flex justify-between items-center mt-3">
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline text-sm"
        >
          Read More
        </a>
        <div className="flex gap-2">
          <button
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-400 text-sm"
            onClick={onLike}
          >
            ❤️ {likes}
          </button>
          <button
            className={`px-3 py-1 rounded text-white flex items-center gap-2 ${
              isSaved ? "bg-gray-500 hover:bg-gray-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
            onClick={onSave}
            title={isSaved ? "Unsave Article" : "Save Article"}
            style={{ cursor: "pointer" }}
          >
            {isSaved ? <MdBookmark /> : <MdBookmarkBorder />} {isSaved ? "Unsave" : "Save"}
          </button>




        </div>
      </div>
    </div>
  );
}
