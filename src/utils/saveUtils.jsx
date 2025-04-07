export const saveArticle = (article) => {
    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
    const exists = saved.some((a) => a.link === article.link);
    if (!exists) {
      saved.push(article);
      localStorage.setItem("savedArticles", JSON.stringify(saved));
    }
  };
  
  export const getSavedArticles = () => {
    return JSON.parse(localStorage.getItem("savedArticles")) || [];
  };
  
  export const isArticleSaved = (link) => {
    const saved = JSON.parse(localStorage.getItem("savedArticles")) || [];
    return saved.some((a) => a.link === link);
  };
  
  