import React, { useState, useEffect } from "react";
import "./App.css";

// Search Bar Component
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    onSearch(query);
  };

  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-bar"
        placeholder="Search..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleSearch} className="search-button">
        🔍
      </button>
    </div>
  );
}

// Card Item Component
function CardItem({ title, author, summary, link, onLike, likes }) {
  return (
    <div className="card">
      <h3>{title}</h3>
      <div className="author">{author}</div>
      <p>{summary}</p>
      <a href={link} target="_blank" rel="noopener noreferrer" className="read-more">
        Read More
      </a>
      <div className="card-footer">
        <button className="like-button" onClick={onLike}>
          ❤️ {likes}
        </button>
      </div>
    </div>
  );
}

// Main App Component
function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("science");
  const [showTitle, setShowTitle] = useState(true); // Kontrol tampilan judul

  // Fetch articles from API
  const fetchArticles = async (keyword, page = 0) => {
    setLoading(true);
    const baseUrl = "https://export.arxiv.org/api/query";
    const params = new URLSearchParams({
      search_query: `all:${keyword}`,
      start: page * 6,
      max_results: 10,
    });

    try {
      const response = await fetch(`${baseUrl}?${params.toString()}`);
      const text = await response.text();

      // Parse the XML response
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const entries = xml.getElementsByTagName("entry");

      const parsedArticles = Array.from(entries).map((entry) => ({
        title: entry.getElementsByTagName("title")[0].textContent,
        summary: entry.getElementsByTagName("summary")[0].textContent,
        author:
          entry.getElementsByTagName("author")[0]?.getElementsByTagName("name")[0]?.textContent || "Unknown Author",
        link: entry.getElementsByTagName("id")[0].textContent,
        likes: 0,
      }));

      // Append new articles to existing ones for Load More
      setArticles((prev) => (page === 0 ? parsedArticles : [...prev, ...parsedArticles]));
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle like button
  const handleLike = (index) => {
    const updatedArticles = [...articles];
    updatedArticles[index].likes += 1;
    setArticles(updatedArticles);
  };

  // Handle search functionality
  const handleSearch = (newKeyword) => {
    setKeyword(newKeyword);
    setShowTitle(false);
    setPage(0);
    fetchArticles(newKeyword, 0);
  };

  // Handle infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
        document.documentElement.offsetHeight - 10 &&
      !loading
    ) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchArticles(keyword, nextPage);
    }
  };

  useEffect(() => {
    fetchArticles(keyword, 0); // Fetch default articles
    window.addEventListener("scroll", handleScroll); // Infinite scroll listener
    return () => window.removeEventListener("scroll", handleScroll); // Cleanup listener
  }, []);

  return (
    <div className="App">
      <div className="container">
        <SearchBar onSearch={handleSearch} />
        {showTitle && <h1 className="title">TOP JOURNAL</h1>}
        {loading && <p>Loading...</p>}
        <div className="grid">
          {articles.map((article, index) => (
            <CardItem
              key={index}
              title={article.title}
              author={article.author}
              summary={article.summary.slice(0, 150) + "..."}
              link={article.link}
              onLike={() => handleLike(index)}
              likes={article.likes}
            />
          ))}
        </div>
        {loading && <div className="loading">Loading...</div>}
      </div>
    </div>
  );
}

export default App;
