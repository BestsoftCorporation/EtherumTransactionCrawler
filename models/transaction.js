const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    to: {
        type: String,
    },
    from: {
        type: String,
    },
    value: {
        type: String,
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

module.exports = Item = mongoose.model('transaction', TransactionSchema);