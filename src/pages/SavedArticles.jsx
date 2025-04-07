import React, { useEffect, useState } from "react";
import CardItem from "../components/CardItem";
import { isArticleSaved } from "../utils/saveUtils";

function SavedArticles() {
  const [savedArticles, setSavedArticles] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    loadSavedArticles();
  }, []);

  const loadSavedArticles = () => {
    const stored = JSON.parse(localStorage.getItem("savedArticles")) || [];
    setSavedArticles(stored);
  };

  const handleUnsave = (article) => {
    const updated = savedArticles.filter((a) => a.link !== article.link);
    localStorage.setItem("savedArticles", JSON.stringify(updated));
    setSavedArticles(updated);
    setMessage("Artikel berhasil dihapus dari penyimpanan.");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-5">
      <h2 className="text-2xl font-bold mb-4 text-center">📌 Saved Articles</h2>

      {message && (
        <div className="text-green-600 text-center font-semibold mb-4">
          {message}
        </div>
      )}

      {savedArticles.length === 0 ? (
        <p className="text-center text-gray-500">No saved articles yet.</p>
      ) : (
        <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedArticles.map((article, index) => (
            <CardItem
              key={index}
              title={article.title}
              author={article.author}
              summary={article.summary}
              link={article.link}
              likes={article.likes || 0}
              isSaved={true}
              onLike={() => {}} // atau bisa dihilangkan sekalian
              onSave={() => handleUnsave(article)}
            />
          ))}
        </div>
      )}

      {/* Floating notification */}
      {message && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50 text-sm sm:text-base max-w-[90%] sm:max-w-xs text-center">
          {message}
        </div>
      )}
    </div>
  );
}

export default SavedArticles;
