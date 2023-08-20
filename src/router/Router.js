import React from "react";
import { createBrowserRouter } from "react-router-dom";
import MovieList from '../components/MovieList';
import MovieDetail from '../components/MovieDetail';


export const Router = createBrowserRouter([
  {
    path: "/",
    element: <MovieList />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetail />,
  },
  {
    path: "*",
    element: <MovieList />,
  },
]);
