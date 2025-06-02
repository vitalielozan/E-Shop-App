import { BrowserRouter } from "react-router";
import CartFavProvider from "../context/CartFavProvider.jsx";
import ThemeProvider from "../context/ThemeProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <CartFavProvider>
          {children}
          <ToastContainer position="top-right" autoClose={3000} />
        </CartFavProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default AppProviders;
