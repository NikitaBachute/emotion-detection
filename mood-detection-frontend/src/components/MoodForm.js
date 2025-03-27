import React, { useState } from 'react';
import axios from 'axios';

function MoodForm({ setResult }) {
  const [text, setText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:5000/predict_mood', { text });
      setResult(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea
        placeholder="Enter your mood text here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Detect Mood</button>
    </form>
  );
}

export default MoodForm;
