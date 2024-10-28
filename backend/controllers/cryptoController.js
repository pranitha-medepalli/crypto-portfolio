const axios = require('axios');
const Portfolio = require('../models/Portfolio');

// Get user's portfolio
const getPortfolio = async (req, res) => {
    try {
        const portfolio = await Portfolio.findOne({ userId: req.params.userId });
        res.status(200).json(portfolio || {});
    } catch (error) {
        res.status(500).json({ message: 'Error fetching portfolio' });
    }
};

// Add investment to portfolio
const addInvestment = async (req, res) => {
    const { userId, cryptoName, amount, priceBought } = req.body;

    try {
        const portfolio = await Portfolio.findOneAndUpdate(
            { userId },
            {
                $push: {
                    investments: { cryptoName, amount, priceBought }
                }
            },
            { new: true, upsert: true }
        );

        res.status(201).json(portfolio);
    } catch (error) {
        res.status(500).json({ message: 'Error adding investment' });
    }
};

// Get current price of a cryptocurrency
const getCryptoPrice = async (req, res) => {
    const { cryptoName } = req.params;

    try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price?ids=${cryptoName}&vs_currencies=inr`);
        res.status(200).json(response.data);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cryptocurrency price' });
    }
};

module.exports = {
    getPortfolio,
    addInvestment,
    getCryptoPrice // Ensure this is exported
};
