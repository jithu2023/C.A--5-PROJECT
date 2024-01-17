import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import SearchIcon from '../assets/SearchIcon.png';
import LoadingImage from '../assets/LoadingImage.png';
import Details from "./Details";

function Books() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    async function getBooks() {
      try {
        const response = await fetch("https://reactnd-books-api.udacity.com/books", {
          headers: { 'Authorization': 'whatever-you-want' }
        });
        const data = await response.json();
        setBooks(data.books);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setError("Error in fetching books. Please try again later.");
        setLoading(false);
      }
    }
    getBooks();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  }

  const openDetails = (book) => {
    setSelectedBook(book);
  }

  const closeDetails = () => {
    setSelectedBook(null);
  }

  const filteredBooks = books.filter((book) => {
    if (search === "") {
      return true;
    }
    const title = book.title.toLowerCase();
    return title.includes(search.toLowerCase());
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  }

  return (
    <div className={`background ${darkMode ? 'dark' : 'light'} min-h-screen flex flex-col items-center justify-center`}>
      <div className={`container mx-auto my-10 p-8 ${darkMode ? 'bg-gray-800' : 'bg-white'} border border-black border-20 rounded-lg shadow-xl text-${darkMode ? 'white' : 'black'}`}>
        <div className="flex justify-between items-center mb-8">
          <img className="logo w-1/5" src="https://kalvium.com/wp-content/uploads//2023/04/Kalvium-Logo-SVG.svg" alt="Logo" />
          <div className={`flex  border ${darkMode ? 'border-gray-700' : 'border-red-500'} border-2 rounded-lg overflow-hidden ${darkMode ? 'bg-gray-700' : 'bg-white'} shadow-md`}>
            <input
              className={`input p-2 outline-none font-normal text-${darkMode ? 'white' : 'gray-800'} w-full`}
              type="text"
              placeholder="Search for books"
              onChange={handleSearch}
            />
            <div className={`search w-1/5 ${darkMode ? 'bg-white' : 'bg-red-100'} hover:bg-gray-200 flex items-center justify-center`}>
              <img className="h-10" src={SearchIcon} alt="Search" />
            </div>
          </div>
          <NavLink to="/register">
            <button className={`px-5 py-2 ${darkMode ? 'bg-red-600' : 'bg-red-500'} rounded text-white font-bold hover:bg-${darkMode ? 'red-500' : 'red-700'}`}>Register</button>
          </NavLink>
          <button onClick={toggleDarkMode} className=" toggle ml-2 px-3 py-1 bg-gray-400 rectangle-full">
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {loading && <img className="loader" src={LoadingImage} alt="Loading" />}
        {loading && <p className={`text-xl text-${darkMode ? 'white' : 'gray-800'} font-normal`}>Loading...</p>}
        {error && <p className={`text-lg text-${darkMode ? 'white' : 'gray-800'}`}>{error}</p>}
        { selectedBook ? (
          <Details select={selectedBook} onBack={closeDetails} />
        ) : (
          <div className="flex justify-center flex-wrap gap-8">
            {filteredBooks.map((book) => (
              <div key={book.id} onClick={() => openDetails(book)} className={`book-box bg-${darkMode ? 'white' : 'white'} cursor-pointer rounded-md shadow-2xl hover:shadow-xl text-center p-8 w-64 transition-transform transform hover:scale-105 `}>
                <div className="h-40 flex justify-center items-center mb-4">
                  <img src={book.imageLinks.thumbnail} alt={`Cover of ${book.title} by ${book.authors.join(", ")}`} className="h-48 w-32 rounded-md object-cover" />
                </div>
                <div className="flex flex-col justify-center items-center">
                  <p className={`title text-lg font-semibold text-${darkMode ? 'white' : 'gray-800'} mb-2`}>{book.title}</p>
                  <p className={`author text-sm text-${darkMode ? 'gray-500' : 'gray-800'}`}>{book.authors.join(", ")}</p>
                  <div className="down">
                    <p className={`star text-sm mt-2 text-${darkMode ? 'white' : 'gray-800'}`}>⭐ {book.averageRating || "4"}</p>
                    <p className={`free text-${darkMode ? 'gray-300' : 'gray-800'}`}>FREE</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        <footer className={`mt-8 text-center text-${darkMode ? 'gray-300' : 'gray-600'}`}>
          <p>&copy; 2024 Kalvium. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default Books;
