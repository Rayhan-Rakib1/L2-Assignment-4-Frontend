import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom"; // or next/router if Next.js
import { IBook } from "@/type";
import { useBorrowBookMutation } from "@/redux/Api/baseApi";

interface BorrowBookModalProps {
  book: IBook;
  onClose: () => void;
}

export default function BorrowBookModal({ book, onClose }: BorrowBookModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [dueDate, setDueDate] = useState("");
  const navigate = useNavigate();
  const [borrowBook, { isLoading }] = useBorrowBookMutation();
  console.log(borrowBook);

  const maxQuantity = book.copies;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (quantity < 1) {
      toast.error("Quantity must be at least 1");
      return;
    }

    if (quantity > maxQuantity) {
      toast.error(`Quantity cannot exceed available copies (${maxQuantity})`);
      return;
    }

    if (!dueDate) {
      toast.error("Please select a due date");
      return;
    }

    try {
      // Example API payload, adjust according to your backend
      await borrowBook({
        book: book._id,
        quantity,
        dueDate,
      }).unwrap();

      toast.success("Book borrowed successfully!");
      onClose();
      navigate("/borrowSummary"); // Redirect to borrow summary page
    } catch (error) {
      toast.error("Failed to borrow book.");
      console.error(error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-md shadow-md w-80"
      >
        <h2 className="text-xl font-semibold mb-4">Borrow "{book.title}"</h2>

        <label className="block mb-2">
          Quantity (max {maxQuantity}):
          <input
            type="number"
            min={1}
            max={maxQuantity}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className="w-full border px-2 py-1 rounded mt-1"
            required
          />
        </label>

        <label className="block mb-4">
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full border px-2 py-1 rounded mt-1"
            required
          />
        </label>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {isLoading ? "Borrowing..." : "Borrow"}
          </button>
        </div>
      </form>
    </div>
  );
}
