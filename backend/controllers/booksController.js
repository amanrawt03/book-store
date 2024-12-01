import axios from "axios";

const getBooks = async (req, res) => {
  try {
    const { query } = req.query;
    const apiUrl = "https://www.googleapis.com/books/v1/volumes";
    let apiQuery = "";

    if (query === "New-arrivals") {
      apiQuery = `q=book&maxResults=40&orderBy=newest`;
    } else if (query === "E-books") {
      apiQuery = `q=book&maxResults=40`;
    } else if (query) {
      apiQuery = `q=subject:${query}&maxResults=40`;
    } else {
      apiQuery = `q=book&maxResults=40`;
    }

    const response = await axios.get(`${apiUrl}?${apiQuery}&key=AIzaSyCkS0j6hAV0oA1H4CyBVWJhk5yDN-g8KXw`);

    if (!response.data.items || response.data.items.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }

    let books = response.data.items;

    if (query === "New-arrivals") {
      books = books.sort((a, b) => {
        const dateA = new Date(a.volumeInfo.publishedDate);
        const dateB = new Date(b.volumeInfo.publishedDate);
        return dateB - dateA;
      });
    } else if (query === "E-books") {
      books = books.filter(book => {
        return book.saleInfo && book.saleInfo.isEbook===true  
      });
    }

    return res.status(200).json({ books });

  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

export { getBooks };
