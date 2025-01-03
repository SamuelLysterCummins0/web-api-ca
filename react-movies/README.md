# Assignment 1 - ReactJS app.

Name: [Sam Lyster Cummins]

## Overview.

This repository contains a React-based Movies Fan app that allows users to browse, filter, and explore movie information, utilizing the TMDB API. The app provides users with access to trending movies on the homepage, details for specific movies, and recommendations, along with filtering and sorting capabilities.

### Features.
+ Trending Movies Page
+ Must Watch Lists 
+ Upcoming
+ Top Rated Page
+ New Filtering Option - Release Year
+ New Sorting Option - Sort by title, release, and rating
+ Cast and Crew in Movie Details
+ Recommendations based off each Movie in movie details
+ Animated Cards when hovered over
+ Some UI style changes
+ Next and Previous buttons at the end of each Page - Max 10 Movies per Page

## Setup requirements.
+ Make sure TMDB API key is in '.env' file.
+ Run 'npm install' to install packages.
+ Start the app locally by running npm start

## API endpoints.

+ Discover list of movies - discover/movie
+ Movie details - movie/:id
+ Movie genres = /genre/movie/list
+ Upcoming Movies - /movie/upcoming
+ Trending Movies - /movie/trending
+ Top Rated Movies - /movie/top_rated
+ Movie Recommendations - /movie/:id/recommendations
+ Movie Credits - /movie/:id?append_to_response=credits

## Routing.
+ /movies/upcoming - Shows a list of upcoming movies.
+ /movies/trending - Displays a page with trending movies.
+ /movies/topRated - Shows top-rated movies.
+ /movies/mustWatch - Shows the "Must Watch" movies page with users selected upcoming movies.

