const mongoose = require('mongoose');

const cryptoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    symbol: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    totalValue: {
        type: Number,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Crypto', cryptoSchema);
