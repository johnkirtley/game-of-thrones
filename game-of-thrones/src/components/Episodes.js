import React, { useState, useContext } from 'react'
import parse from 'html-react-parser'
import WatchedContext from '../contexts/WatchedContext';
import { Button, Grid, Paper, makeStyles } from '@material-ui/core';


const initialState = {}



export const Episodes = ({ episodes }) => {
    const [watched, setWatched] = useContext(WatchedContext)

    const addWatched = e => {
        if (!e.value) {
            setWatched({
                ...watched,
                [e.target.value]: true
            })
        }
        // NEED TO SET NOTIFICATION IF ALREADY ADDED
    }

    console.log(watched)
    console.log("episodes", episodes)

    return (
        <Grid container justify="center" alignItems="center" spacing={3}>
            {episodes.map(episode => {
                return (
                    <Grid item xs={6}>
                        <Paper key={episode.id} className="episode-card">
                            <h3>{episode.name}</h3>
                            <img src={episode.image.original} alt={episode.name} className="episode-image" />
                            <div>{parse(episode.summary)}</div>
                            <button onClick={addWatched} value={episode.name}>Watched</button>
                        </Paper>
                    </Grid>
                )
            })}

        </Grid>
    )
}