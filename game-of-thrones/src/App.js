import React, { useState, useEffect } from 'react';
import { fetchShow } from './api/fetchShow';
import Dropdown from 'react-dropdown';
import parse from 'html-react-parser';
import { formatSeasons } from './utils/formatSeasons';
import './App.css';

export default function App() {
  const [show, setShow] = useState(null);
  const [seasons, setSeasons] = useState([]);
  const [selectedSeason, setSelectedSeason] = useState('');
  const episodes = seasons[selectedSeason] || [];


  useEffect(() => {
    fetchShow()
      .then(res => {
        console.log(res.data)
        setShow(res.data);
        setSeasons(formatSeasons(res.data._embedded.episodes))
      })
  }, []);

  const handleChange = e => {
    // setSeasons(e.target.value);
    console.log(e.value)
  }

  if (!show) {
    return <h2>Fetching data...</h2>;
  }

  return (
    <div className="App">
      <h1>{show.name}</h1>
      <p>Show Status: {show.status}</p>
      <p>Average Rating: {show.rating.average}</p>
      <img src={show.image.original} alt={show.name} />
      <div>
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
      </div>
    </div>
  );
}
