import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function CryptoDetail() {
    const { id } = useParams();
    const [crypto, setCrypto] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/crypto/${id}`)
            .then(response => setCrypto(response.data))
            .catch(error => console.error('Error fetching cryptocurrency:', error));
    }, [id]);

    return (
        <div>
            {crypto ? (
                <>
                    <h1>{crypto.name}</h1>
                    <p>Symbol: {crypto.symbol}</p>
                    <p>Current Price: {crypto.price}</p>
                    <p>Market Cap: {crypto.marketCap}</p>
                    <p>Volume (24h): {crypto.volume24h}</p>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}

export default CryptoDetail;
