import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Portfolio from './components/Portfolio';
import CryptoDetail from './components/CryptoDetail';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Portfolio />} />
                <Route path="/crypto/:id" element={<CryptoDetail />} />
            </Routes>
        </Router>
    );
}

export default App;
