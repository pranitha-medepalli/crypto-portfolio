const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    investments: [
        {
            cryptoName: { type: String, required: true },
            amount: { type: Number, required: true },
            priceBought: { type: Number, required: true },
            date: { type: Date, default: Date.now }
        }
    ]
});

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;
