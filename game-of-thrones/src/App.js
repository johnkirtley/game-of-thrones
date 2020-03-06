import React, { useState, useEffect } from 'react';
import { fetchShow } from './api/fetchShow';
import Dropdown from 'react-dropdown';
import parse from 'html-react-parser';
import { Route, Link } from 'react-router-dom';
import { formatSeasons } from './utils/formatSeasons';
import './App.css';
import { Button, Grid, Container } from '@material-ui/core'

import { Episodes } from './components/Episodes';
import { WatchedList } from './components/WatchedList';
import WatchedContext from './contexts/WatchedContext';

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [watched, setWatched] = useState([])
  const episodes = seasons[selectedSeason] || [];

  const size = Object.keys(watched).length

  console.log(size)

  useEffect(() => {
    fetchShow()
      .then(res => {
        setShow(res.data);
        setSeasons(formatSeasons(res.data._embedded.episodes))
      })
  }, []);

  const handleChange = e => {
    setSelectedSeason(e.value);
  }

  if (!show) {
    return <h2>Fetching data...</h2>;
  }

  console.log(episodes)

  return (
    <main role="main">
      <div className="App">
        <h1><img className="title" src="https://fontmeme.com/permalink/200306/bde143405de2a86298ff02a29c36c19b.png" alt="game-of-thrones-font" border="0"></img></h1>
        {/* <Link to="/watched">Watched List</Link> */}
        {/* <Link to="/">Home</Link> */}
        {/* <label htmlFor="progress">Your Progress</label> */}
        {/* Will break progress bar out into own component once save
      functionality is complete */}
        {/* <progress value={size} max={show._embedded.episodes.length}>15%</progress> */}
        <Grid className="sub-info">
          <Grid item>
            <Button className="status" variant="outlined">Show Status: {show.status}</Button>
          </Grid>
          <Grid item>
            <Button className="rating" variant="outlined">Average Rating: {show.rating.average}</Button>
          </Grid>
        </Grid>
        <img className="main-image" src={show.image.original} alt={show.name} />

        <div>
          <Route exact path="/">
            <Grid container direction="row" justify="center" id="genre-list" spacing={3}>
              {show.genres.map(genre => (
                <Grid item>
                  <Button className="genre" variant="outlined">{genre}</Button>
                </Grid>
              ))}
            </Grid>

            {/* 
          <div>
            <p>Where To Watch: {show.network.name}</p>
          </div> */}
            <Button variant="contained" id="dropdown">
              <Dropdown
                options={Object.keys(seasons)}
                onChange={handleChange}
                placeholder="Select a season"
                value={selectedSeason || "Select a season"}
              />
            </Button>

            {/* <Container className="summary">
            <h3>Summary</h3>
            <p>{parse(show.summary)}</p>
          </Container> */}
          </Route>
          <WatchedContext.Provider value={[watched, setWatched]}>
            <Route exact path="/" render={props => {
              return <Episodes {...props} episodes={episodes} />
            }} />
            <Route exact path="/watched" render={props => {
              return <WatchedList {...props} episodes={episodes} />
            }} />
          </WatchedContext.Provider>
        </div>
      </div>
    </main>
  );
}
