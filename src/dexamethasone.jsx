import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import DexamethasoneTest from "./components/DexamethasoneTest.jsx";

import "@fontsource-variable/hanken-grotesk";
import "@fontsource-variable/bricolage-grotesque";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div className="min-h-screen text-gray-800">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <header className="text-left mb-8">
          <a
            href="/"
            className="text-blue-600 hover:text-blue-800 mb-4 inline-block"
          >
            ← Back to Tests
          </a>
          <h1 className="font-serif text-3xl font-bold text-gray-800 mb-4">
            Dexamethasone Suppression Test
          </h1>
          <p className="text-gray-600">
            Practice interpreting dexamethasone suppression test results to
            determine the source of hypercortisolism
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 text-left">
          <DexamethasoneTest />
        </div>
      </div>
    </div>
  </StrictMode>
);
