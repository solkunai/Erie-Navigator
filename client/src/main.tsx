import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Static site deployment - v1.0
createRoot(document.getElementById("root")!).render(<App />);
