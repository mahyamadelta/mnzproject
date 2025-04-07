import React, { useState, useEffect } from "react";
import "../App.css";
import CardItem from "../components/CardItem";
import SearchBar from "../components/SearchBar";
import { fetchArticles } from "../utils/fetchArticles";
import { isArticleSaved } from "../utils/saveUtils";

//📜 mnzproject adalah platform berbasis web yang memungkinkan pengguna untuk scrolling jurnal penelitian ilmiah seperti TikTok.

function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState(""); // Kosong = default latest
  const [searchedKeyword, setSearchedKeyword] = useState(null);
  const [saveMessage, setSaveMessage] = useState("");

  useEffect(() => {
    const loadInitialArticles = async () => {
      setLoading(true);
      const fetched = await fetchArticles(keyword || "science", 0);

      // Hindari artikel duplikat
      const unique = fetched.filter(
        (item, index, self) =>
          index === self.findIndex((a) => a.link === item.link)
      );

      setArticles(unique);
      setLoading(false);
    };

    loadInitialArticles();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScroll = async () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 &&
      !loading
    ) {
      setLoading(true);
      const nextPage = page + 1;
      const newArticles = await fetchArticles(keyword || "science", nextPage);
  
      setArticles((prevArticles) => {
        const combined = [...prevArticles, ...newArticles];
  
        // Hindari duplikat berdasarkan link
        const unique = combined.filter(
          (item, index, self) =>
            index === self.findIndex((a) => a.link === item.link)
        );
  
        return unique;
      });
  
      setPage(nextPage); // pindah ke bawah agar gak race condition
      setLoading(false);
    }
  };
  

  const handleSearch = async (newKeyword) => {
    setKeyword(newKeyword);
    setPage(0);
    setSearchedKeyword(newKeyword);
    setLoading(true);
    const fetched = await fetchArticles(newKeyword, 0);

    // Hilangkan duplikat juga saat pencarian
    const unique = fetched.filter(
      (item, index, self) =>
        index === self.findIndex((a) => a.link === item.link)
    );

    setArticles(unique);
    setLoading(false);
  };

  const handleLike = (index) => {
    const updatedArticles = [...articles];
    updatedArticles[index].likes = (updatedArticles[index].likes || 0) + 1;
    setArticles(updatedArticles);
  };

  const handleSave = (article) => {
    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
    const index = saved.findIndex((a) => a.link === article.link);

    let newSaved;
    let message;

    if (index !== -1) {
      newSaved = saved.filter((a) => a.link !== article.link);
      message = "Artikel berhasil dihapus dari penyimpanan.";
    } else {
      newSaved = [...saved, article];
      message = "Artikel berhasil disimpan!";
    }

    localStorage.setItem("savedArticles", JSON.stringify(newSaved));
    setSaveMessage(message);
    setTimeout(() => setSaveMessage(null), 3000);
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen font-sans">
        <div className="w-11/12 max-w-6xl mx-auto py-5">
          <SearchBar onSearch={handleSearch} />

          {!searchedKeyword && (
            <h2 className="text-2xl font-bold mb-5 text-center">
              🆕 Latest Articles
            </h2>
          )}

          {searchedKeyword && (
            <>
              <p className="text-center text-gray-700 mb-4">
                Showing results for:{" "}
                <span className="font-semibold">{searchedKeyword}</span>
              </p>
              <h1 className="text-center text-3xl font-bold mb-5">
                TOP JOURNAL
              </h1>
            </>
          )}

          {loading && <p className="text-center">Loading...</p>}

          <div className="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {articles.map((article, index) => (
              <CardItem
                key={index}
                title={article.title}
                author={article.author}
                summary={article.summary}
                link={article.link}
                onLike={() => handleLike(index)}
                onSave={() => handleSave(article)}
                likes={article.likes || 0}
                isSaved={isArticleSaved(article.link)}
              />
            ))}
          </div>

          {articles.length === 0 && !loading && (
            <p className="text-center text-gray-500">No articles found.</p>
          )}
        </div>
      </div>

      {saveMessage && (
        <div className="fixed bottom-5 left-1/2 transform -translate-x-1/2 sm:left-auto sm:right-5 sm:translate-x-0 bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-fade-in-out z-50 text-sm sm:text-base max-w-[90%] sm:max-w-xs text-center">
          {saveMessage}
        </div>
      )}
    </>
  );
}

export default Home;
