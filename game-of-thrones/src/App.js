import React, { useState, useEffect } from 'react';
import { fetchShow } from './api/fetchShow';
import Dropdown from 'react-dropdown';
import parse from 'html-react-parser';
import { Route, Link } from 'react-router-dom';
import { formatSeasons } from './utils/formatSeasons';
import './App.css';

import { Episodes } from './components/Episodes';
import { WatchedList } from './components/WatchedList';
import WatchedContext from './contexts/WatchedContext';

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const [watched, setWatched] = useState([])
  const episodes = seasons[selectedSeason] || [];


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

  return (
    <div className="App">
      <h1>{show.name}</h1>
      <Link to="/watched">Watched List</Link>
      <Link to="/">Home</Link>
      <label htmlFor="progress">Your Progress</label>
      {/* Will break progress bar out into own component once save
      functionality is complete */}
      <progress value={watched.length} max={show._embedded.episodes.length}>15%</progress>

      <p>Show Status: {show.status}</p>
      <p>Average Rating: {show.rating.average}</p>
      <img src={show.image.original} alt={show.name} />

      <div>
        <Route exact path="/">
          {show.genres.map(genre => (
            <ul>
              <li>{genre}</li>
            </ul>
          ))}

          <div>
            <p>Where To Watch: {show.network.name}</p>
          </div>

          <div>
            <h3>Summary</h3>
            <p>{parse(show.summary)}</p>
          </div>
          <Dropdown
            options={Object.keys(seasons)}
            onChange={handleChange}
            placeholder="Select a season"
            value={selectedSeason || "Select a season"}
          />
        </Route>
        <WatchedContext.Provider value={[watched, setWatched]}>
          <Route exact path="/" render={props => {
            return <Episodes {...props} episodes={episodes} />
          }} />
          <Route exact path="/watched" component={WatchedList} />
        </WatchedContext.Provider>
      </div>
    </div>
  );
}
