import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getListDetails } from "../api/lists-api";
import { getMovie } from "../api/tmdb-api";
import MovieList from "../components/movieList";
import Spinner from '../components/spinner';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";

const ListDetailsPage = () => {
    const { username, listId } = useParams();
    
    const { data: list, isLoading: listLoading } = useQuery(
        ['list', listId],
        () => getListDetails(username, listId)
    );

    const { data: movies, isLoading: moviesLoading } = useQuery(
        ['listMovies', listId],
        async () => {
            if (!list?.movies?.length) return [];
            const moviePromises = list.movies.map(movieId => getMovie({ queryKey: ['movie', { id: movieId }] }));
            return Promise.all(moviePromises);
        },
        { enabled: !!list }
    );

    if (listLoading || moviesLoading) return <Spinner />;

    return (
        <>
            <Paper elevation={3} sx={{ padding: 2, margin: 2 }}>
                <Typography variant="h4" component="h2">
                    {list.name}
                </Typography>
                <Typography variant="body1">
                    {movies?.length || 0} movies in this list
                </Typography>
            </Paper>
            {movies?.length > 0 && <MovieList movies={movies} />}
        </>
    );
};

export default ListDetailsPage;