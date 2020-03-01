import React, { useState, useContext } from 'react'
import parse from 'html-react-parser'
import WatchedContext from '../contexts/WatchedContext';


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

    return (
        <div>
            {episodes.map(episode => {
                return (
                    <div key={episode.id}>
                        <h3>{episode.name}</h3>
                        <img src={episode.image.original} alt={episode.name} />
                        <div>{parse(episode.summary)}</div>
                        <button onClick={addWatched} value={episode.name}>Watched</button>
                    </div>
                )
            })}
        </div>
    )
}