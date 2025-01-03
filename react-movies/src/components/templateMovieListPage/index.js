import React, { useState, useEffect } from "react";
import Header from "../headerMovieList";
import FilterCard from "../filterMoviesCard";
import MovieList from "../movieList";
import Grid from "@mui/material/Grid2";
import SortingComponent from "../sorting/sortingComponent";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function MovieListPageTemplate({ movies, title, action }) {
  const [nameFilter, setNameFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("0");
  const [releaseDate, setReleaseDate] = useState(null);
  const [sortBy, setSortBy] = useState("title");
  const [displayedMovies, setDisplayedMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; 

  useEffect(() => {
    const loadMovies = () => {
      
      const filteredMovies = movies
        .filter((m) => m.title.toLowerCase().includes(nameFilter.toLowerCase()))
        .filter((m) => (Number(genreFilter) > 0 ? m.genre_ids.includes(Number(genreFilter)) : true))
        .filter((m) => (releaseDate ? new Date(m.release_date).getFullYear() === Number(releaseDate) : true));

      const sortedMovies = filteredMovies.sort((a, b) => {
        if (sortBy === "title") return a.title.localeCompare(b.title);
        else if (sortBy === "release_date") return new Date(b.release_date) - new Date(a.release_date);
        else if (sortBy === "vote_average") return Number(b.vote_average) - Number(a.vote_average);
        return 0;
      });

      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = Math.min(startIndex + itemsPerPage, sortedMovies.length);
      setDisplayedMovies(sortedMovies.slice(startIndex, endIndex));
    };

    loadMovies();
  }, [movies, nameFilter, genreFilter, releaseDate, sortBy, currentPage]);

  const handleChange = (type, value) => {
    if (type === "name") setNameFilter(value);
    else if (type === "genre") setGenreFilter(value);
    else if (type === "releaseDate") setReleaseDate(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const totalPages = Math.ceil(movies.length / itemsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <Grid container>
      <Grid size={18}>
        <Header title={title} />
      </Grid>
      <Grid container sx={{ flex: "1 1 500px" }}>
        <Grid key="find" size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }} sx={{ padding: "20px" }}>
          <FilterCard
            onUserInput={handleChange}
            titleFilter={nameFilter}
            genreFilter={genreFilter}
            releaseDate={releaseDate}
          />
          <SortingComponent sortBy={sortBy} setSortBy={handleSortChange} />
        </Grid>
        <MovieList action={action} movies={displayedMovies} />
        <Box>
          <Button
            variant="contained"
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            sx={{ marginRight: 1 }}
          >
            Previous
          </Button>
          <Button
            variant="contained"
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default MovieListPageTemplate;
