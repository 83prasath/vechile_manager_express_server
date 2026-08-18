const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    upcCode: { type: String, required: false },
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    expiryDate: { type: Date, required: true }
}, { timestamps: true });

productSchema.index({ title: 'text', upcCode: 'text' });
productSchema.index({ expiryDate: 1 });

module.exports = mongoose.model('Product', productSchema);
