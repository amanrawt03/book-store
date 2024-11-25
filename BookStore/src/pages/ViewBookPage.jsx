import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import SuggestedBook from "../components/SuggestedBook";

const ViewBook = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null); // book is initially null
  const [bookSuggestion, setBookSuggestion] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state

  const getBook = async () => {
    setLoading(true); // Start loading
    try {
      const response = await axios.get("http://localhost:5000/bookStore");
      const data = response.data; // Axios automatically parses JSON
      // Find the selected book based on the ID from the URL
      const selectedBook = data.find((book) => book.id === Number(id));
      if (selectedBook) {
        setBook(selectedBook);
      }

      // Generate random book suggestions (ensuring no duplicates)
      const getRandomIndex = () => {
        let randomIndex;
        do {
          randomIndex = Math.floor(Math.random() * data.length);
        } while (data[randomIndex].id === Number(id)); // Exclude the selected book
        return randomIndex;
      };

      // Ensure unique suggestions
      let suggestionArr = [];
      while (suggestionArr.length < 3) {
        const randomBook = data[getRandomIndex()];
        if (!suggestionArr.some((book) => book.id === randomBook.id)) {
          suggestionArr.push(randomBook);
        }
      }

      setBookSuggestion(suggestionArr);

    } catch (error) {
      console.error("Error fetching book data:", error);
    }
    setLoading(false); // End loading
  };

  useEffect(() => {
    getBook();
  }, [id]); // Fetch book data when the `id` parameter changes

  if (loading) {
    return (
      <div className="loading-container">
        <p>Loading book details...</p>
        {/* Optionally show a spinner */}
      </div>
    );
  }

  // Safely render the book data if available
  if (!book) {
    return <p>Book not found.</p>; // Render this if no book is found (edge case handling)
  }

  return (
    <main className="container">
      <div className="p-4 p-md-5 mb-4 rounded text-body-emphasis bg-body-secondary">
        <div className="col-lg-6 px-0">
          <h1 className="display-4 fst-italic">
            {book.bookName}
          </h1>
          <p className="lead my-3">{book.displayContent}</p>
        </div>
      </div>

      <div className="row g-5">
        <div className="col-md-8">
          <h3 className="pb-4 mb-4 fst-italic border-bottom">
            From {book.author}
          </h3>

          <article className="blog-post">
            {book.aboutBook}
          </article>
        </div>

        <div className="col-md-4">
          <div className="position-sticky" style={{ top: "2rem" }}>
            <div className="p-4 mb-3 bg-body-tertiary rounded">
              <h4 className="fst-italic">About the Author</h4>
              <p className="mb-0">{book.aboutAuthor}</p>
            </div>

            <div>
              <h4 className="fst-italic">Read other books</h4>
              <ul className="list-unstyled">
                {bookSuggestion.length === 3 ? (
                  bookSuggestion.map((suggestedBook) => (
                    <li key={suggestedBook.id}>
                      <SuggestedBook bookData={suggestedBook} />
                    </li>
                  ))
                ) : (
                  <p>Loading suggestions...</p>
                )}
              </ul>
            </div>

            <div className="p-4">
              <h4 className="fst-italic">Find us on</h4>
              <ol className="list-unstyled">
                <li>
                  <a href="#">GitHub</a>
                </li>
                <li>
                  <a href="#">Twitter</a>
                </li>
                <li>
                  <a href="#">Facebook</a>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewBook;
