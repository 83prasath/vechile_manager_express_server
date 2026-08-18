const Product = require('../models/products');

const productDao = {
    createProduct: async (productData) => {
        const product = new Product(productData);
        return await product.save();
    },
    
    getProducts: async (userId, query, skip, limit, sort) => {
        return await Product.find({ userId, ...query })
            .sort(sort)
            .skip(skip)
            .limit(limit);
    },
    
    countProducts: async (userId, query) => {
        return await Product.countDocuments({ userId, ...query });
    },
    
    getProductById: async (id, userId) => {
        return await Product.findOne({ _id: id, userId });
    },
    
    updateProduct: async (id, userId, updateData) => {
        return await Product.findOneAndUpdate({ _id: id, userId }, updateData, { new: true });
    },
    
    deleteProduct: async (id, userId) => {
        return await Product.findOneAndDelete({ _id: id, userId });
    }
};

module.exports = productDao;
