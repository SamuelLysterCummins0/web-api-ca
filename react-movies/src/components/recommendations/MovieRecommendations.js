import React from "react";
import { Link } from "react-router-dom";
import { Grid, Paper } from "@mui/material"; 

const MovieRecommendations = ({ recommendations }) => {
  return (
    <div>
      <h2>Recommendations</h2>
      {recommendations.length > 0 ? (
        <Grid container spacing={2}>
          {recommendations.map((recMovie) => (
            <Grid item key={recMovie.id} xs={6} sm={4} md={3}>
              <Paper elevation={2}>
                <Link to={`/movies/${recMovie.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                  <img
                    src={`https://image.tmdb.org/t/p/w200${recMovie.poster_path}`} 
                    alt={recMovie.title}
                    style={{ width: "100%", borderRadius: "4px" }} 
                  />
                  <h3>{recMovie.title}</h3>
                  <p>{recMovie.release_date}</p>
                </Link>
              </Paper>
            </Grid>
          ))}
        </Grid>
      ) : (
        <p>No recommendations available.</p>
      )}
    </div>
  );
};

export default MovieRecommendations;
