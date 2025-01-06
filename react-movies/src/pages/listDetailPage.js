import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { getListDetails } from "../api/lists-api";
import { getMovie } from "../api/tmdb-api";
import MovieList from "../components/movieList";
import Spinner from '../components/spinner';
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import PageTemplate from '../components/templateMovieListPage';
import RemoveFromListIcon from "../components/cardIcons/removeFromList";

const ListDetailsPage = () => {
    const { username, listId } = useParams();

    const { data: list, isLoading: listLoading, refetch: listRefetch } = useQuery(
        ['list', listId],
        () => getListDetails(username, listId)
    );

    const { data: movies, isLoading: moviesLoading, refetch: moviesRefetch } = useQuery(
        ['listMovies', list?.movies],
        async () => {
            if (!list?.movies?.length) return [];
            const moviePromises = list.movies.map(movieId => 
                getMovie({ queryKey: ['movie', { id: movieId }] })
            );
            return Promise.all(moviePromises);
        },
        {  
            enabled: !!list?.movies,
            onSuccess: () => {
                listRefetch(); 
            }
        }
    );

    if (listLoading || moviesLoading) {
        return <Spinner />;
    }

    return (
        <PageTemplate
            title={list.name}
            movies={movies || []}
            action={(movie) => (
                <RemoveFromListIcon 
                    movie={movie} 
                    listId={listId} 
                    onRemove={() => {
                        listRefetch();
                        moviesRefetch();
                    }}
                />
            )}
        />
    );
};

export default ListDetailsPage;