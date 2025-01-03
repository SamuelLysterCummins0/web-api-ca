import React from "react";
import { useParams } from 'react-router-dom';
import MovieDetails from "../components/movieDetails/";
import PageTemplate from "../components/templateMoviePage";
//import useMovie from "../hooks/useMovie";
import { getMovie } from '../api/tmdb-api'
import { getMovieDetailsWithCredits, getMovieRecommendations} from '../api/tmdb-api';
import MovieRecommendations from '../components/recommendations/MovieRecommendations';
import { useQuery } from "react-query";
import Spinner from '../components/spinner'

const MoviePage = (props) => {
  const { id } = useParams();
  const { data: movie, error, isLoading, isError } = useQuery(
    ["movie", { id: id }],
    () => getMovieDetailsWithCredits(id)
  );

  const { data: recommendations } = useQuery(
    ["recommendations", { id: id }],
    () => getMovieRecommendations(id),
    { enabled: !!movie } 
  );
  

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <>
      {movie ? (
        <>
          <PageTemplate movie={movie}>
            <MovieDetails movie={movie} />
            {/* Display Movie Recommendations */}
            {recommendations && recommendations.results && (
              <MovieRecommendations recommendations={recommendations.results} />
            )}
          </PageTemplate>
        </>
      ) : (
        <p>Waiting for movie details</p>
      )}
    </>
  );
};

export default MoviePage;