import { createBrowserRouter } from "react-router-dom";
import App from "../App.tsx";
import AllBooks from "../pages/AllBooks";
import AddBook from "../pages/AddBook";
import BorrowSummary from "../pages/BorrowSummary";

const router = createBrowserRouter([
  {
    path: "/",
    Component: App,
    children: [
      {
        index: true,
        Component: AllBooks,
      },
      {
        path: "/",
        Component: AllBooks,
      },
      {
        path: "addBook",
        Component: AddBook,
      },
      {
        path: "borrowSummary",
        Component: BorrowSummary,
      },
    ],
  },
]);
export default router;
