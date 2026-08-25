import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { redirectToCanonicalDomain } from "./lib/canonicalRedirect";
import { initGoogleAnalytics } from "./lib/analytics";

redirectToCanonicalDomain();
initGoogleAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
