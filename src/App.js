import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputTemp, setInputTemp] = useState('');
  const [fromUnit, setFromUnit] = useState('celsius');
  const [toUnit, setToUnit] = useState('fahrenheit');
  const [convertedTemp, setConvertedTemp] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    updateTemperature(inputTemp, fromUnit);
  }, [inputTemp, fromUnit]);

  const handleInputChange = (event) => {
    setInputTemp(event.target.value);
    setErrorMessage('');
  };

  const handleFromUnitChange = (event) => {
    setFromUnit(event.target.value);
    setErrorMessage('');
  };

  const handleToUnitChange = (event) => {
    setToUnit(event.target.value);
    setErrorMessage('');
  };

  const convertTemperature = () => {
    if (inputTemp.trim() === '') {
      setErrorMessage('Please enter a temperature.');
      return;
    }

    const temperature = parseFloat(inputTemp);
    if (isNaN(temperature)) {
      setErrorMessage('Please enter a valid number.');
      return;
    }

    let result;
    if (fromUnit === 'celsius' && toUnit === 'fahrenheit') {
      result = (temperature * 9) / 5 + 32;
    } else if (fromUnit === 'celsius' && toUnit === 'kelvin') {
      result = temperature + 273.15;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'celsius') {
      result = ((temperature - 32) * 5) / 9;
    } else if (fromUnit === 'fahrenheit' && toUnit === 'kelvin') {
      result = ((temperature - 32) * 5) / 9 + 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'celsius') {
      result = temperature - 273.15;
    } else if (fromUnit === 'kelvin' && toUnit === 'fahrenheit') {
      result = ((temperature - 273.15) * 9) / 5 + 32;
    } else {
      setErrorMessage('Invalid conversion.');
      return;
    }

    setConvertedTemp(result.toFixed(2));
  };

  function updateTemperature(inputTemp, fromUnit) {
    const header = document.querySelector('.App');
    const temperature = parseFloat(inputTemp);

    let startColor, endColor;
    if (fromUnit === "celsius") {
      if (temperature <= 0) {
        startColor = "#0093E9";
        endColor = "#80D0C7";
      } else if (temperature > 0 && temperature <= 25) {
        startColor = "#0093E9";
        endColor = "#80D0C7";
      } else {
        startColor = "#FFE53B";
        endColor = "#FF2525";
      }
    } else if (fromUnit === "fahrenheit") {
      if (temperature <= 32) {
        startColor = "#0093E9";
        endColor = "#80D0C7";
      } else if (temperature > 32 && temperature <= 77) {
        startColor = "#0093E9";
        endColor = "#80D0C7";
      } else {
        startColor = "#FFE53B";
        endColor = "#FF2525";
      }
    } else {
      if (temperature <= 273.15) {
        startColor = "#0093E9";
        endColor = "#80D0C7";
      } else if (temperature > 273.15 && temperature <= 298.15) {
        startColor = "#0093E9";
        endColor = "#80D0C7";
      } else {
        startColor = "#FFE53B";
        endColor = "#FF2525";
      }
    }

    header.style.background = `linear-gradient(160deg, ${startColor} 0%, ${endColor} 55%, #FF99AC 100%)`;
  }

  return (
    <div className="App">
      <header className="App-header">
        <label htmlFor="temperature">Temperature:</label>
        <input
          type="text"
          id="temperature"
          value={inputTemp}
          onChange={handleInputChange}
          placeholder="Enter temperature"
        />
        <br />
        <label>
          Convert from:
          <select value={fromUnit} onChange={handleFromUnitChange}>
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="kelvin">Kelvin</option>
          </select>
        </label>
        <label>
          Convert to:
          <select value={toUnit} onChange={handleToUnitChange}>
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
            <option value="kelvin">Kelvin</option>
          </select>
        </label>
        <br />
        <button onClick={convertTemperature}>Convert</button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {convertedTemp && <p>Converted Temperature: {convertedTemp}</p>}
      </header>
    </div>
  );
}

export default App;
