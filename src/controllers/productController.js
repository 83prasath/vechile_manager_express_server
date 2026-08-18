const productService = require('../services/productService');

const productController = {
    getProducts: async (req, res) => {
        try {
            const userId = req.user._id;
            const { page, limit, search, expiryFilter } = req.query;
            
            const result = await productService.getProducts(
                userId, 
                parseInt(page) || 1, 
                parseInt(limit) || 20, 
                search, 
                expiryFilter
            );
            
            return res.status(200).json(result);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    
    addProduct: async (req, res) => {
        try {
            const userId = req.user._id;
            const { upcCode, title, amount, expiryDate } = req.body;
            
            if (!title || !amount || !expiryDate) {
                return res.status(400).json({ message: 'Missing required fields' });
            }
            
            const product = await productService.addProduct(userId, { upcCode, title, amount, expiryDate });
            return res.status(201).json(product);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    
    updateProduct: async (req, res) => {
        try {
            const userId = req.user._id;
            const productId = req.params.id;
            const updateData = req.body;
            
            const product = await productService.updateProduct(productId, userId, updateData);
            
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            return res.status(200).json(product);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
    
    deleteProduct: async (req, res) => {
        try {
            const userId = req.user._id;
            const productId = req.params.id;
            
            const product = await productService.deleteProduct(productId, userId);
            
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            
            return res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

module.exports = productController;
