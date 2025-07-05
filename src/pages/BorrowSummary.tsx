import { useGetAllBorrowBooksQuery } from "@/redux/Api/baseApi";

interface BorrowedBook {
  title: string;
  isbn: string;
  totalQuantityBorrowed: number;
}

function BorrowSummary() {
  const { data, error, isLoading } = useGetAllBorrowBooksQuery();

  if (isLoading) return <p className="text-white">Loading borrow summary...</p>;

  if (error)
    return <p className="text-red-400">Error loading borrow summary</p>;

  if (!data || data.length === 0) {
    return <p className="text-white">No borrow records found.</p>;
  }

  const borrowedBooks: BorrowedBook[] = data.map((item: any) => ({
    title: item.book.title,
    isbn: item.book.isbn,
    totalQuantityBorrowed: item.totalQuantity,
  }));

  return (
    <div className="max-w-4xl mx-auto mt-10 text-white bg-gray-900 p-6 rounded-lg">
      <h1 className="text-2xl font-semibold mb-6 text-center">Borrow Summary</h1>

      <table className="w-full border-collapse border border-gray-700">
        <thead>
          <tr className="bg-gray-800">
            <th className="border border-gray-700 px-4 py-2 text-left">Book Title</th>
            <th className="border border-gray-700 px-4 py-2 text-left">ISBN</th>
            <th className="border border-gray-700 px-4 py-2 text-right">
              Total Quantity Borrowed
            </th>
          </tr>
        </thead>

        <tbody>
          {borrowedBooks.map((book) => (
            <tr key={book.isbn} className="even:bg-gray-700 odd:bg-gray-800">
              <td className="border border-gray-700 px-4 py-2">{book.title}</td>
              <td className="border border-gray-700 px-4 py-2">{book.isbn}</td>
              <td className="border border-gray-700 px-4 py-2 text-right">
                {book.totalQuantityBorrowed}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowSummary;