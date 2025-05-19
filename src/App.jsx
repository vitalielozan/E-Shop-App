import { BrowserRouter } from "react-router";
import AppRoutes from "./routes/AppRoutes.jsx";
import "./styles/App.css";
import { ThemeProvider } from "./context/ThemeContext.jsx";

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppRoutes />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
