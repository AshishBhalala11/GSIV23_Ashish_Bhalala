import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { fetchMovieDetails } from "../api";
import { FiHome } from "react-icons/fi";
import Loader from "./Loader";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchMovieDetails(id);
        setMovie(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchDetails();
  }, [id]);

  return (
    <>
      <div className="flex items-center justify-between mb-4 shadow-md rounded-md h-16 py-4 px-8">
        <h1 className="text-2xl font-semibold">Movie Details</h1>
        <Link to="/" className="text-gray-600 hover:text-gray-800">
          <FiHome className="text-xl" />
        </Link>
      </div>
      <div className="bg-white p-4 mb-8">
        {loading ? (
          <Loader />
        ) : (
          <div className="md:flex md:gap-8 lg:px-8">
            <img
              src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
              alt={movie.title}
              className="md:w-1/4 rounded-md shadow-md mb-4 md:mb-0"
            />
            <div className="md:w-3/4">
              <h2 className="text-2xl font-semibold">
                {movie.title} 
								<span className="text-gray-500"> ({movie.vote_average})</span>
              </h2>
              <p className="text-gray-500 mt-4">
                <span>{movie.release_date} | </span>
                <span>{movie.runtime} min | </span>
                <span> Director - </span>
                {movie.director ? (
                  <span>{movie.release_date}</span>
                ) : (
                  <span>N/A</span>
                )}
              </p>
              <p className="mt-2">
                <span>
                  <span>Cast - </span>
                  {movie.cast ? (
                    <span className="text-gray-700">
                      {movie.cast.join(", ")}
                    </span>
                  ) : (
                    <span>N/A</span>
                  )}
                </span>
              </p>
              <p className="mt-4">Description - {movie.overview}</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default MovieDetail;
