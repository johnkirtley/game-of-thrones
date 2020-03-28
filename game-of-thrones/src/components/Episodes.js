import React, { useState, useContext } from 'react';
import parse from 'html-react-parser';
import WatchedContext from '../contexts/WatchedContext';
import { Button, Grid, Paper, Container } from '@material-ui/core';

const initialState = {};

export const Episodes = ({ episodes }) => {
  const [watched, setWatched] = useContext(WatchedContext);

  const addWatched = e => {
    if (!e.value) {
      setWatched({
        ...watched,
        [e.target.value]: true
      });
    }
    // NEED TO SET NOTIFICATION IF ALREADY ADDED
  };

  console.log(watched);
  console.log('episodes', episodes);

  return (
    <Container>
      <Grid container justify="center" spacing={3}>
        {episodes.map(episode => {
          return (
            <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
              <Paper key={episode.id} id="episode-card">
                <h2 className="episode-name">{episode.name}</h2>
                <img
                  src={episode.image.original}
                  alt={episode.name}
                  className="episode-image"
                />
                <div className="episode-summary">{parse(episode.summary)}</div>
                {/* <button onClick={addWatched} value={episode.name}>Watched</button> */}
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Container>
  );
};
