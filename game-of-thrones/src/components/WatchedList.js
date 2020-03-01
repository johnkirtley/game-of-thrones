import React, { useState, useContext } from 'react'
import WatchedContext from '../contexts/WatchedContext';


export const WatchedList = (props) => {
    const [watched] = useContext(WatchedContext);
    const titles = Object.keys(watched)

    return (
        <div>
            {titles.map(title => {
                return (
                    <div key={Date.now()}>{title}</div>
                )
            })}
        </div>
    )
}