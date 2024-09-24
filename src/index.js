/**
 * @fileoverview Entry point for the React application.
 *
 * This file sets up the root of the React application and renders the main App component
 * within a StrictMode wrapper to help identify potential problems in the application.
 *
 * @module index
 */

/**
 * Importing necessary modules from React and ReactDOM libraries.
 * - StrictMode: A tool for highlighting potential problems in an application.
 * - createRoot: Method to create a root to render the React component tree.
 */

/**
 * Importing the main App component and global CSS styles.
 */

/**
 * Rendering the App component inside the root element of the HTML document.
 * The App component is wrapped in StrictMode to enable additional checks and warnings.
 */
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
