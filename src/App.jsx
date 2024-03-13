import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WeatherSearch from './WeatherSearch';
import Description from './Description';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WeatherSearch />} />
        <Route path="/description" element={<Description />} />
      </Routes>
    </Router>
  );
};

export default App;
