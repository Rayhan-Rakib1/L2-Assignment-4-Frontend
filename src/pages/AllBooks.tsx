import { Pencil, Trash2, BookOpen } from "lucide-react";
import { IBook } from "@/type";
import { useDeleteBookMutation, useGetBooksQuery } from "@/redux/Api/baseApi";
import { useState } from "react";
import UpdateBook from "@/components/modules/UpdateBook";
import Swal from "sweetalert2";
import BorrowBookModal from "@/components/modules/BorrowBookModal";
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom";

function AllBooks() {
  const [editingBook, setEditingBook] = useState<IBook | null>(null); // 👈 modal state

  const handleUpdate = (book: IBook) => {
    setEditingBook(book); // 👈 Open modal
  };

  const [deleteBook] = useDeleteBookMutation();

  const handleDelete = async (id: string) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteBook(id).unwrap();
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      }
    });
  };

  const [borrowingBook, setBorrowingBook] = useState<IBook | null>(null);

  const handleBorrow = (book: IBook) => {
    setBorrowingBook(book);
  };
  const { data, isLoading, error } = useGetBooksQuery(undefined);
  const books = data || [];
  // console.log(books);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching books</p>;

  // console.log("Books from API:", data.data);

  return (
    <div className="max-w-6xl mx-auto mt-10">
      <div className="justify-between mb-4 flex flex-row">
        <div>
          <h1 className="text-2xl    font-bold mb-8">All Books</h1>
        </div>
        <NavLink to={"/addBook"}>
          <Button className=" text-center font-bold ">Add Book</Button>
        </NavLink>
      </div>
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
              onClick={() => handleUpdate(book)}
              className="group flex items-center gap-2 px-3 py-1.5 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 hover:shadow transition-all duration-200"
              aria-label={`Edit ${book.title}`}
            >
              <Pencil className="w-4 h-4 text-gray-600 group-hover:text-gray-900 transition" />
              <span className="text-sm font-medium group-hover:text-gray-900">
                Edit
              </span>
            </button>

            <button
              type="button"
              onClick={() => handleBorrow(book)} // ← uncomment when ready
              disabled={book.copies === 0}
              className={`group flex items-center gap-2 px-3 py-1.5 border rounded-md transition-all duration-200
    ${
      book.copies === 0
        ? "border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed opacity-60"
        : "border-blue-300 text-blue-600 hover:bg-blue-50 hover:shadow"
    }
  `}
              aria-label={`Borrow ${book.title}`}
            >
              <BookOpen
                className={`w-4 h-4 ${
                  book.copies === 0
                    ? "text-gray-400"
                    : "text-blue-500 group-hover:text-blue-700"
                } transition`}
              />
              <span
                className={`text-sm font-medium ${
                  book.copies === 0
                    ? "text-gray-400"
                    : "group-hover:text-blue-700"
                }`}
              >
                Borrow
              </span>
            </button>
            <button
              type="button"
              onClick={() => handleDelete(book._id)}
              className="group flex items-center gap-2 px-3 py-1.5 border border-red-300 rounded-md text-red-600 hover:bg-red-50 hover:shadow transition-all duration-200"
              aria-label={`Delete ${book.title}`}
            >
              <Trash2 className="w-4 h-4 text-red-500 group-hover:text-red-700 transition" />
              {/* <span className="text-sm font-medium group-hover:text-red-700">
                Delete
              </span> */}
            </button>
          </div>
        </div>
      ))}

      {editingBook && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <UpdateBook book={editingBook} onClose={() => setEditingBook(null)} />
        </div>
      )}

      {borrowingBook && (
        <BorrowBookModal
          book={borrowingBook}
          onClose={() => setBorrowingBook(null)}
        />
      )}
    </div>
  );
}

export default AllBooks;
