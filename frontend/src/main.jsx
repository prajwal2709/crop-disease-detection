
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { LanguageProvider } from "./context/LanguageContext";
import { ChatProvider } from "./context/ChatContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <LanguageProvider>
    <ChatProvider>
      <App />
    </ChatProvider>
  </LanguageProvider>
);

