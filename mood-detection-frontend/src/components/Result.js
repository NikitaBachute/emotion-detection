import React from 'react';

function Result({ result }) {
  if (!result) return null;

  return (
    <div>
      <h2>Mood: {result.mood}</h2>
      <h3>Suggested Playlist:</h3>
      <ul>
        {result.playlist.map((song, index) => (
          <li key={index}>{song}</li>
        ))}
      </ul>
    </div>
  );
}

export default Result;
