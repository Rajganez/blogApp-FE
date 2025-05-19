// import { useState } from 'react'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
const Home = lazy(() => import("./pages/Home"));
const BlogPage = lazy(() => import("./pages/BlogPage"));
const ProtectedRoutes = lazy(() => import("./components/ProtectedRoutes"));

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
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        }
      >
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
}

export default App;
