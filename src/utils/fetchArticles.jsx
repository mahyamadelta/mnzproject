export const fetchArticles = async (keyword, page = 0) => {
    const baseUrl = "https://export.arxiv.org/api/query";
    const params = new URLSearchParams({
      search_query: `all:${keyword}`,
      start: page * 6,
      max_results: 10,
    });
  
    try {
      const response = await fetch(`${baseUrl}?${params.toString()}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "text/xml");
      const entries = xml.getElementsByTagName("entry");
  
      const parsedArticles = Array.from(entries).map((entry) => ({
        title: entry.getElementsByTagName("title")[0].textContent,
        summary: entry.getElementsByTagName("summary")[0].textContent,
        author:
          entry.getElementsByTagName("author")[0]?.getElementsByTagName("name")[0]?.textContent ||
          "Unknown Author",
        link: entry.getElementsByTagName("id")[0].textContent,
        likes: 0,
      }));
  
      return parsedArticles;
  
    } catch (error) {
      console.error("🚨 Error fetching articles:", error);
      return []; // return kosong biar nggak crash
    }
  };
  