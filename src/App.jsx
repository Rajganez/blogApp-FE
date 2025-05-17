// import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { Suspense } from "react";
import BlogPage from "./pages/BlogPage";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/home", element: <BlogPage /> },
  ]);

  return (
    <>
      <Suspense>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
}

export default App;
