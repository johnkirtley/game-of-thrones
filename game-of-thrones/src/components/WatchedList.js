import React, { useState, useContext } from 'react'
import WatchedContext from '../contexts/WatchedContext';


export const WatchedList = () => {
    const [watched] = useContext(WatchedContext);

    return (
        <div>
            {watched.map(item => {
                return (
                    <div>{item}</div>
                )
            })}
        </div>
    )
}