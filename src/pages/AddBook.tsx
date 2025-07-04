import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function AddBook() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 1,
    available: true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : type === "number" ? Number(value) : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.author || !form.genre || !form.isbn) {
      alert("Please fill all required fields.");
      return;
    }

    const newBook: Book = {
      id: Date.now().toString(), // simple unique id
      title: form.title,
      author: form.author,
      genre: form.genre,
      isbn: form.isbn,
      description: form.description,
      copies: form.copies,
      available: form.available,
    };

    dispatch(addBook(newBook));
    navigate("/books"); // redirect to books list
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Book</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* same form fields as before */}
        <div>
          <label className="block font-medium mb-1" htmlFor="title">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>
        {/* ...repeat for author, genre, isbn, description, copies */}
        <div>
          <label className="block font-medium mb-1" htmlFor="author">
            Author <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="author"
            name="author"
            value={form.author}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="genre">
            Genre <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={form.genre}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="isbn">
            ISBN <span className="text-red-600">*</span>
          </label>
          <input
            type="text"
            id="isbn"
            name="isbn"
            value={form.isbn}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
            rows={3}
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="copies">
            Copies
          </label>
          <input
            type="number"
            id="copies"
            name="copies"
            min={0}
            value={form.copies}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="available"
            name="available"
            checked={form.available}
            onChange={handleChange}
          />
          <label htmlFor="available">Available</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add Book
        </button>
      </form>
    </div>
  );
}

export default AddBook;
