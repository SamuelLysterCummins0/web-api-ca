import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavoriteMoviesPage from "./pages/favoriteMoviesPage.js";
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage'
import UpcomingPage from "./pages/upcomingPage.js";
import MustWatchPage from "./pages/mustWatchPage.js";
import TopRatedMoviesPage from "./pages/topRatedMoviesPage.js";
import PopularMoviesPage from "./pages/trendingMoviesPage.js";
import TrendingMoviesPage from "./pages/trendingMoviesPage.js";
import LoginPage from "./pages/loginPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});

const ProtectedRoute = ({ element: Element }) => {
  const token = localStorage.getItem('token');
  return token ? Element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/movies/favorites" element={<ProtectedRoute element={<FavoriteMoviesPage />} />} />
            <Route path="/reviews/:id" element={<ProtectedRoute element={<MovieReviewPage />} />} />
            <Route path="/movies/:id" element={<ProtectedRoute element={<MoviePage />} />} />
            <Route path="/movies/upcoming" element={<ProtectedRoute element={<UpcomingPage />} />} />
            <Route path="/movies/trending" element={<ProtectedRoute element={<TrendingMoviesPage />} />} />
            <Route path="/movies/topRated" element={<ProtectedRoute element={<TopRatedMoviesPage />} />} />
            <Route path="/movies/mustWatch" element={<ProtectedRoute element={<MustWatchPage />} />} />
            <Route path="/" element={<ProtectedRoute element={<HomePage />} />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/reviews/form" element={<ProtectedRoute element={<AddMovieReviewPage />} />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);