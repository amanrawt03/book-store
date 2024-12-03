import axios from "axios";
import client from '../config/redisConfig.js'

// API URL and Key
const apiUrl = "https://www.googleapis.com/books/v1/volumes";
const key = "AIzaSyDZM1wVAo6gCblQdxUjIcDlKqbXl6w31FM";
// const key = "AIzaSyD-0-rF3KEGQHQcEPAPxDMM6fszvaLNjTk";

// Function to implement retry logic with exponential backoff
// const fetchWithRetry = async (url, retries = 5, delay = 1000) => {
//   try {
//     const response = await axios.get(url);
//     return response; // Return successful response
//   } catch (error) {
//     if (error.response && error.response.status === 429 && retries > 0) {
//       const retryAfter = error.response.headers['retry-after'] || delay;
//       console.warn(`Rate limit exceeded. Retrying in ${retryAfter}ms...`);
//       // Wait for the retry time (either from header or default exponential backoff)
//       await new Promise(resolve => setTimeout(resolve, retryAfter));
//       return fetchWithRetry(url, retries - 1, delay * 2); // Exponential backoff
//     } else {
//       throw error; // For other errors or no retries left, throw the error
//     }
//   }
// };

// getBooks function with rate-limited API calls
const getBooks = async (req, res) => {
  try {
    const { query } = req.query;
    let apiQuery = "";  
    let books;

    // Build the query based on the provided query parameter
    if (query === "New-arrivals") {
      apiQuery = `q=book&maxResults=40&orderBy=newest`;
    } else if (query === "E-books") {
      apiQuery = `q=book&maxResults=40`;
    } else if (query === "Comic-books") {
      apiQuery = `q=comicbooks&maxResults=40`;
    } else if (query) {
      apiQuery = `q=subject:${query}&maxResults=40`;
    } else {
      apiQuery = `q=book&maxResults=40`;
    }

    if(client.isOpen){
      books = await client.get('fetchedBooks')
    }
    if(books){
      console.log('cache hit')
      books = JSON.parse(books)
    }else{
      console.log('cache miss')
      let response = await axios(`${apiUrl}?${apiQuery}&key=${key}`);
      if (!response.data.items || response.data.items.length === 0) {
        return res.status(404).json({ error: "No books found" });
      }
      books = response.data.items;
      if(client.isOpen){
        await client.setEx('fetchedBooks', 10, JSON.stringify(books))
      }
    }

    // Sort books if the query is for "New-arrivals"
    if (query === "New-arrivals") {
      books = books.sort((a, b) => {
        const dateA = new Date(a.volumeInfo.publishedDate);
        const dateB = new Date(b.volumeInfo.publishedDate);
        return dateB - dateA;
      });
    } else if (query === "E-books") {
      books = books.filter((book) => {
        return book.saleInfo && book.saleInfo.isEbook === true;
      });
    }

    return res.status(200).json({ books });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// filterBooks function with rate-limited API calls
const filterBooks = async (req, res) => {
  try {
    const {
      query = "book",
      startIndex = 0,
      limit = 40,
      genre,
      sort,
    } = req.body;
    let books;
    let apiQuery = `q=${query}`;
    if (genre) {
      apiQuery += `+subject:${genre}`;
    }
    apiQuery += `&startIndex=${startIndex}&maxResults=${limit}`;
    apiQuery += `&key=${key}`;

    if(client.isOpen){
      books = await client.get('filterBooks')
    }
    if(books){
      console.log('Cache hit')
      books = JSON.parse(books)
    }else{
      console.log("cache miss")
      let response = await axios.get(`${apiUrl}?${apiQuery}`);

    if (!response.data.items || response.data.items.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }

    books = response.data.items;
    if(client.isOpen){
      await client.setEx('filterBooks', 10, JSON.stringify(books))
    }
    }
    

    // Sorting logic based on the provided sort order
    if (sort === "newToOld") {
      books = books.sort((a, b) => {
        const dateA = new Date(a.volumeInfo.publishedDate);
        const dateB = new Date(b.volumeInfo.publishedDate);
        return dateB - dateA;
      });
    } else if (sort === "oldToNew") {
      books = books.sort((a, b) => {
        const dateA = new Date(a.volumeInfo.publishedDate);
        const dateB = new Date(b.volumeInfo.publishedDate);
        return dateA - dateB;
      });
    }

    return res.status(200).json({
      books,
      totalItems: books.length,
    });
  } catch (error) {
    console.error("Error filtering books:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export { getBooks, filterBooks };
