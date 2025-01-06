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
import ListsPage from "./pages/listsPage";
import ListDetailsPage from "./pages/listDetailPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 360000,
      refetchInterval: 360000, 
      refetchOnWindowFocus: false
    },
  },
});


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <SiteHeader />
        <MoviesContextProvider>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
            <Route path="/movies/favorites" element={<ProtectedRoute><FavoriteMoviesPage /></ProtectedRoute>} />
            <Route path="/reviews/:id" element={<ProtectedRoute><MovieReviewPage /></ProtectedRoute>} />
            <Route path="/movies/:id" element={<ProtectedRoute><MoviePage /></ProtectedRoute>} />
            <Route path="/movies/upcoming" element={<ProtectedRoute><UpcomingPage /></ProtectedRoute>} />
            <Route path="/movies/trending" element={<ProtectedRoute><TrendingMoviesPage /></ProtectedRoute>} />
            <Route path="/movies/topRated" element={<ProtectedRoute><TopRatedMoviesPage /></ProtectedRoute>} />
            <Route path="/movies/mustWatch" element={<ProtectedRoute><MustWatchPage /></ProtectedRoute>} />
            <Route path="/lists" element={<ProtectedRoute><ListsPage /></ProtectedRoute>} />
            <Route path="/lists/:username/:listId" element={<ProtectedRoute><ListDetailsPage /></ProtectedRoute>}/>
            <Route path="/reviews/form" element={<ProtectedRoute><AddMovieReviewPage /></ProtectedRoute>} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </MoviesContextProvider>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

const rootElement = createRoot(document.getElementById("root"))
rootElement.render(<App />);