import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes.jsx";
import "./styles/App.css";
import ThemeProvider from "./context/ThemeContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={3000} />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
