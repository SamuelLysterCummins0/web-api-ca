import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { DiStreamline } from "react-icons/di";
import Spinner from '../spinner';

const formControl = {
  margin: 1,
  minWidth: 220,
  backgroundColor: "rgb(255, 255, 255)"
};

export default function SortingComponent({ sortBy, setSortBy, isLoading, isError, error }) {
  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  if (isLoading) return <Spinner />;
  if (isError) return <h1>{error.message}</h1>;

  return (
    <Card
      sx={{
        backgroundColor: "rgb(128, 0, 128)"
      }}
      variant="outlined"
    >
      <CardContent>
        <Typography variant="h5" component="h1">
          <DiStreamline fontSize="large" />
          Sorting
        </Typography>

        <FormControl sx={{ margin: 1, minWidth: 220 }}>
          <InputLabel id="sort-label">Sort By</InputLabel>
          <Select
            labelId="sort-label"
            id="sort-select"
            value={sortBy || ""}
            onChange={handleSortChange}
          >
            <MenuItem value="title">Title</MenuItem>
            <MenuItem value="release_date">Release Date</MenuItem>
            <MenuItem value="vote_average">Rating</MenuItem> 
          </Select>
        </FormControl>
      </CardContent>
    </Card>
  );
}
