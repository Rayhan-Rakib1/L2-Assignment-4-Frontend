
// interface BorrowedBook {
//   title: string;
//   isbn: string;
//   totalQuantityBorrowed: number;
// }

function BorrowSummary() {

const data = [
    {
        title: 'raldl',
        isbn: '432040',
        totalQuantityBorrowed: 23
    }
]


//   if (loading) return <p>Loading borrow summary...</p>;
//   if (error) return <p className="text-red-600">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-semibold mb-6">Borrow Summary</h1>

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2 text-left">Book Title</th>
            <th className="border border-gray-300 px-4 py-2 text-left">ISBN</th>
            <th className="border border-gray-300 px-4 py-2 text-right">Total Quantity Borrowed</th>
          </tr>
        </thead>

        <tbody>
          {data.map((book) => (
            <tr key={book.isbn} className="even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{book.title}</td>
              <td className="border border-gray-300 px-4 py-2">{book.isbn}</td>
              <td className="border border-gray-300 px-4 py-2 text-right">{book.totalQuantityBorrowed}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BorrowSummary;
