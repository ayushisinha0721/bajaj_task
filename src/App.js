import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [input, setInput] = useState('');  // State to hold the user's JSON input
  const [response, setResponse] = useState(null);  // State to hold the response from the backend
  const [error, setError] = useState('');  // State to handle input validation errors
  const [selectedOptions, setSelectedOptions] = useState([]);  // State for selected options from the dropdown

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Try to parse the input as JSON
      const parsedInput = JSON.parse(input);
      const res = await axios.post('http://localhost:5000/bfhl', parsedInput);  // POST request to the backend API
      setResponse(res.data);  // Set response state with data from backend
      setError('');  // Clear any previous error
    } catch (err) {
      setError('Invalid JSON or API call failed');  // Set error if input is invalid or API call fails
    }
  };

  // Function to handle dropdown option changes
  const handleOptionChange = (e) => {
    const options = Array.from(e.target.selectedOptions, option => option.value);  // Convert selected options to array
    setSelectedOptions(options);  // Set selected options state
  };

  // Function to render the filtered response based on selected dropdown options
  const renderFilteredResponse = () => {
    if (!response) return null;
    return (
      <div>
        {selectedOptions.includes('Alphabets') && <p>Alphabets: {response.alphabets.join(', ')}</p>}
        {selectedOptions.includes('Numbers') && <p>Numbers: {response.numbers.join(', ')}</p>}
        {selectedOptions.includes('Highest lowercase alphabet') && <p>Highest Lowercase Alphabet: {response.highest_lowercase_alphabet.join(', ')}</p>}
      </div>
    );
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>ENTER DATA</h1>  {/* Roll number as the website title */}

      {/* Form to submit JSON data */}
      <form onSubmit={handleSubmit}>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Enter JSON data in format: { "data": ["A", "B", "1"] }'
          rows="5"
          cols="50"
        />
        <br />
        <button type="submit">Submit</button>
      </form>

      {/* Display error if present */}
      {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}

      {/* Show response and dropdown only if response is present */}
      {response && (
        <div>
          <h3>Response</h3>
          {/* Dropdown for filtering response */}
          <select multiple onChange={handleOptionChange} style={{ marginBottom: '20px' }}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
          {/* Render filtered response */}
          {renderFilteredResponse()}
        </div>
      )}
    </div>
  );
}

export default App;
