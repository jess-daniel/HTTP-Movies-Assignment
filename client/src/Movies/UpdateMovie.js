import React, { useState, useEffect } from "react";
import axios from "axios";

const UpdateMovie = props => {
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/movies/${props.match.params.id}`)
      .then(res => {
        console.log(res);
        setMovie(res.data);
      })
      .catch(err => console.log(err.response));
  }, [props.match.params.id]);

  const handleChanges = e => {
    e.persist();
    let value = e.target.value;
    if (e.target.name === "metascore") {
      value = parseInt(value, 10);
    }
    setMovie({
      ...movie,
      [e.target.name]: value
    });
  };

  const putMovie = e => {
    e.preventDefault();
    axios
      .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
      .then(res => {
        setMovie(res.data);
        console.log(movie);
        props.history.push("/");
      })
      .catch(err => console.log(err.response));
  };

  return (
    <>
      <form onSubmit={putMovie}>
        <label>
          {" "}
          Title:
          <input
            name="title"
            type="text"
            value={movie.title}
            onChange={handleChanges}
          />
        </label>
        <label>
          {" "}
          Director:
          <input
            name="director"
            type="text"
            value={movie.director}
            onChange={handleChanges}
          />
        </label>
        <label>
          {" "}
          Metascore:
          <input
            name="metascore"
            type="number"
            value={movie.metascore}
            onChange={handleChanges}
          />
        </label>
        <label>
          {" "}
          Stars:
          <input
            name="stars"
            type="text"
            value={movie.stars}
            onChange={handleChanges}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </>
  );
};

export default UpdateMovie;
