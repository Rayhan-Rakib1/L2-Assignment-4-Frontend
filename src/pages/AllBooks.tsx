import { useState } from "react";
import { Pencil, Trash2, BookOpen } from "lucide-react";
import { useGetTasksQuery } from "@/redux/Api/baseApi";
import { IBook } from "@/type";

// interface Book {
//   id: string;
//   title: string;
//   author: string;
//   genre: string;
//   isbn: string;
//   copies: number;
// }

// const dummyBooks: Book[] = [
//   {
//     id: "1",
//     title: "The Alchemist",
//     author: "Paulo Coelho",
//     genre: "Fiction",
//     isbn: "1234567890",
//     copies: 3,
//   },
//   {
//     id: "2",
//     title: "Clean Code",
//     author: "Robert C. Martin",
//     genre: "Programming",
//     isbn: "0987654321",
//     copies: 0,
//   },
// ];

function AllBooks() {
  //   const [books, setBooks] = useState<Book[]>(dummyBooks);

  //   const handleEdit = (book: Book) => {
  //     alert(`Edit book: ${book.title}`);
  //     // open form/modal logic here
  //   };

  //   const handleDelete = (id: string) => {
  //     const confirmDelete = confirm("Are you sure you want to delete this book?");
  //     if (confirmDelete) {
  //       setBooks((prev) => prev.filter((book) => book.id !== id));
  //     }
  //   };

  //   const handleBorrow = (book: Book) => {
  //     alert(`Borrowing book: ${book.title}`);
  //     // show borrow form logic here
  //   };

const { data, isLoading, error } = useGetTasksQuery(undefined);
  const books = data || [];

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books</p>;

// console.log("Books from API:", data.data);


  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-5">All Books</h1>
      <div className="grid grid-cols-7 font-semibold border-b pb-2 mb-2">
        <span>Title</span>
        <span>Author</span>
        <span>Genre</span>
        <span>ISBN</span>
        <span>Copies</span>
        <span>Availability</span>
        <span>Actions</span>
      </div>

      {books.map((book: IBook) => (
        <div
          key={book._id}
          className="grid grid-cols-7 items-center border-b py-2 text-sm"
        >
          <span>{book.title}</span>
          <span>{book.author}</span>
          <span>{book.genre}</span>
          <span>{book.isbn}</span>
          <span>{book.copies}</span>
          <span
            className={`font-medium ${
              book.copies === 0 ? "text-red-500" : "text-green-600"
            }`}
          >
            {book.copies === 0 ? "Unavailable" : "Available"}
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              //   onClick={() => handleEdit(book)}
              className="p-1 border rounded border-gray-300 hover:bg-gray-100"
              aria-label={`Edit ${book.title}`}
            >
              <Pencil className="w-4 h-4" />
            </button>

            <button
              type="button"
              //   onClick={() => handleDelete(book.id)}
              className="p-1 border rounded border-gray-300 hover:bg-red-100"
              aria-label={`Delete ${book.title}`}
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>

            <button
              type="button"
              //   onClick={() => handleBorrow(book)}
              disabled={book.copies === 0}
              className={`p-1 border rounded border-gray-300 hover:bg-blue-100 ${
                book.copies === 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              aria-label={`Borrow ${book.title}`}
            >
              <BookOpen className="w-4 h-4 text-blue-500" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default AllBooks; 
