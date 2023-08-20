import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FiHome } from "react-icons/fi";
import { MdSearch } from "react-icons/md";
import { fetchUpcomingMovies, searchMovies } from "../api";
import MovieCard from "./MovieCard";
import Loader from "./Loader";
import debounce from 'lodash.debounce';

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [pageNo, setPageNo] = useState(1);
  const [hasInitialLoad, setHasInitialLoad] = useState(false);

  const sentinelRef = useRef(null);

  const debouncedSearch = useRef(
    debounce((query) => {
      fetchMovies(query);
    }, 500)
  ).current;

const fetchMovies = async (query) => {
    try {
      setLoading(true);
      let data;

      if (query) {
        data = await searchMovies(query , pageNo);
      } else {
        data = await fetchUpcomingMovies(pageNo);
      }
      
      if (pageNo === 1) {
        setMovies(data);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...data]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  useEffect(() => {
    if (hasInitialLoad) {
      fetchMovies(searchQuery);
    } else {
      setHasInitialLoad(true);
    }
  }, [pageNo, hasInitialLoad]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPageNo((prevPageNo) => prevPageNo + 1);
        }
      },
      { rootMargin: "50px" }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }

    return () => {
      if (sentinelRef.current) {
        observer.unobserve(sentinelRef.current);
      }
    };
  }, [sentinelRef]);

  return (
    <div>
      <div className="flex items-center justify-between mb-4 shadow-md rounded-b-md h-16 py-4 px-8 sticky top-0 z-50 bg-gray-400 bg-opacity-90">
        <div className="relative w-1/2">
          <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
            <MdSearch className="text-gray-600" />
          </span>
          <input
            type="text"
            placeholder="Search movies..."
            className="border rounded-md p-2 pl-10 w-full bg-gray-100 my-auto"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              debouncedSearch(e.target.value);
              setPageNo(1);
            }}
          />
        </div>
        <Link to="/" className="text-gray-600 hover:text-gray-800">
          <FiHome className="text-xl" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 px-8 py-2">
        {movies.map((movie, index) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      <div ref={sentinelRef} style={{ height: "1px" }} />
      {loading && <Loader />}
      {!loading && movies.length === 0 && (
        <p className="text-3xl text-center text-gray-700 font-bold mt-8">
          No movies available.
        </p>
      )}
    </div>
  );
};

export default MovieList;
