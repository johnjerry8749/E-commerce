import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import App from "./App.jsx";
import "bootstrap-icons/font/bootstrap-icons.css";
import "@tabler/icons-webfont/dist/tabler-icons.min.css";
import { CartProvider } from "./components/context/CartContext.jsx";


createRoot(document.getElementById("root")).render(
  <StrictMode>

    <BrowserRouter>
    <CartProvider>
      <App />
    </CartProvider>
    </BrowserRouter>
  </StrictMode>
);