// routes/cryptoRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();
const Crypto = require('../models/Crypto');

// Create a new cryptocurrency
router.post('/', async (req, res) => {
    const { name, symbol, amount, price } = req.body;
    const newCrypto = new Crypto({ name, symbol, amount, price });
    try {
        await newCrypto.save();
        res.status(201).json(newCrypto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get all cryptocurrencies
router.get('/', async (req, res) => {
    try {
        const cryptos = await Crypto.find();
        res.status(200).json(cryptos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get real-time cryptocurrency data from CoinGecko
router.get('/real-time/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a cryptocurrency
router.put('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const updatedCrypto = await Crypto.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedCrypto);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete a cryptocurrency
router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await Crypto.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
