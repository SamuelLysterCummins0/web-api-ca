# Assignment 2 - Web API.

Name: Sam Lyster Cummins

## Features.
 + Custom Movie Lists - Users can create, view, and delete personal movie lists
 + Add/Remove Movies from Lists - Users can add movies to their custom lists and remove them 
 + User Authentication - JWT-based authentication for secure access to user-specific features 
 + User-specific Data Storage - Separate favorites, must-watch, and lists for each user
 + Movies API Connection - Backend server handles all communication with TMDB
 + Protected Routes - Secure API endpoints requiring authentication

## Setup requirements.

- Install MongoDB locally
- Install Node.js and npm
- Clone the repository
- Run npm install in both movies-api and movies folders
- Start MongoDB service
- Create .env file with required configuration
- Run npm run dev to start the API server
- Run npm start to start the React application

## API Configuration

Create a .env file in the movies-api folder with the following variables:

______________________
NODE_ENV=development
PORT=8080
HOST=localhost
MONGO_DB=mongodb://localhost:27017/movies_db
TMDB_KEY=YourTMDBKey
SECRET=YourJWTSecret
______________________

## API Design

/api/users | POST | Register/login a user
/api/users/:userName/favorites | POST | Update user's favorite movies
/api/users/:userName/mustWatch | POST | Update user's must-watch list
/api/lists/:username/lists | GET | Get all lists for a user
/api/lists/:username/lists | POST | Create a new list
/api/lists/:username/lists/:listId | GET | Get specific list details
/api/lists/:username/lists/:listId | DELETE | Delete a list
/api/lists/:username/lists/:listId/movies | POST | Add movie to list
/api/lists/:username/lists/:listId/movies/:movieId | DELETE | Remove movie from list
/api/movies (GET) - Get movies list
/api/movies/:id (GET) - Get movie details
/api/movies/upcoming (GET) - Get upcoming movies
/api/movies/trending (GET) - Get trending movies
/api/movies/top_rated (GET) - Get top rated movies
/api/movies/:id/credits (GET) - Get movie credits
/api/movies/:id/recommendations (GET) - Get movie recommendations

## Security and Authentication

JWT-based authentication implemented using jsonwebtoken
Protected routes require valid JWT token in Authorization header
User verification on data access (users can only access their own data)
Password hashing using bcrypt
Token-based session management
CORS configured for secure client-server communication

## Integrating with React App

The React frontend now communicates with our Express backend server rather than making direct API calls. 

Authentication is handled through the backend where users can login and signup, with data stored in MongoDB. This keeps user information secure and allows for personalized features.

User data like favorites and must-watch lists are now managed through the backend, letting users keep their preferences between sessions. The React app syncs this data with the database through our API.

The new custom lists feature lets users create and manage their own movie collections, all handled through the backend API and stored in MongoDB.

All movie information now comes through our backend first instead of going directly to TMDB. This adds security and control over how movie data is handled.

The application has several major improvements from the first assignment. User authentication was added to keep user data secure and private. The new custom lists feature lets users organize movies however they want. All routes now check if users are logged in before showing protected content. The app now manages all data through the backend server instead of making direct external API calls, and user data is kept separate and secure with JWT tokens.

## Independent learning (if relevant)

Briefly explain any non-standard features developed for the app.   
