// import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import { Suspense } from "react";
import BlogPage from "./pages/BlogPage";
import ProtectedRoutes from "./components/ProtectedRoutes";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    {
      path: "/home",
      element: (
        <ProtectedRoutes>
          <BlogPage />
        </ProtectedRoutes>
      ),
    },
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
