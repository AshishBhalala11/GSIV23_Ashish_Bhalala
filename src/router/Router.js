import React from "react";
import { createHashRouter } from "react-router-dom";
import MovieList from '../components/MovieList';
import MovieDetail from '../components/MovieDetail';


export const Router = createHashRouter([
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
