const useMovie = (id) => {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    getMovieDetailsWithCredits(id)
      .then((movieDetails) => {
        setMovie(movieDetails);
      })
      .catch((error) => {
        console.error("Error fetching movie details with credits:", error);
      });
  }, [id]);

  return [movie, setMovie];
};

export default useMovie;
