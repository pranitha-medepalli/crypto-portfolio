import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Portfolio = () => {
  const [portfolio, setPortfolio] = useState([]);
  const [cryptoData, setCryptoData] = useState([]);

  useEffect(() => {
    // Fetch portfolio data from backend
    axios.get('http://localhost:5000/api/portfolio')
      .then(response => setPortfolio(response.data))
      .catch(error => console.error('Error fetching portfolio:', error));

    // Fetch cryptocurrency data from backend
    axios.get('http://localhost:5000/api/crypto')
      .then(response => setCryptoData(response.data))
      .catch(error => console.error('Error fetching crypto data:', error));
  }, []);

  return (
    <div>
      <h1>My Portfolio</h1>
      {/* Render portfolio and crypto data */}
      <div>
        {portfolio.map((item, index) => (
          <div key={index}>{item.name}: {item.amount}</div>
        ))}
        {cryptoData.map((crypto, index) => (
          <div key={index}>{crypto.name}: ${crypto.price}</div>
        ))}
      </div>
    </div>
  );
};

export default Portfolio;
