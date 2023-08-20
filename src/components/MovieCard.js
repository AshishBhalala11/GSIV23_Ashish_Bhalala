import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie }) => {
  return (
    <div className="bg-gray-100 rounded-xl shadow-md overflow-hidden transition duration-300 transform group">
      <Link to={`/movie/${movie.id}`}>
        <div className="relative">
          <img
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            className="w-full rounded-md"
          />
          <div className="absolute top-0 left-0 p-1 bg-indigo-500 text-white text-xs rounded-tl-md">
            {movie.vote_average}
          </div>
        </div>
      </Link>
      <div className="group-hover:translate-y-0 absolute left-0 right-0 bottom-0 bg-gray-200 bg-opacity-90 transform translate-y-full transition-transform duration-300">
        <p className="text-gray-900 mt-2 p-4 pb-12">
          <div className="font-bold">Overview: </div>
          {movie.overview}
        </p>
      </div>
      <div className="px-4 py-2">
        <h2 className="text-lg font-semibold mt-2 text-blue-500 hover:underline">
          <Link to={`/movie/${movie.id}`}>{movie.title}</Link>
        </h2>
        <p className="text-gray-500 mt-1">{movie.release_date}</p>
        {/* <p className="text-gray-700 mt-2 line-clamp-3">{movie.overview}</p> */}
      </div>
    </div>
  );
};

export default MovieCard;
