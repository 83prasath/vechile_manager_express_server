const productDao = require('../dao/productDao');

const productService = {
    addProduct: async (userId, data) => {
        return await productDao.createProduct({ ...data, userId });
    },
    
    getProducts: async (userId, page = 1, limit = 20, search = '', expiryFilter = '') => {
        const skip = (page - 1) * limit;
        let query = {};
        
        if (search) {
            query.$text = { $search: search };
        }
        
        if (expiryFilter) {
            const now = new Date();
            let endDate = new Date();
            
            if (expiryFilter === '1_month') {
                endDate.setMonth(endDate.getMonth() + 1);
                query.expiryDate = { $gte: now, $lte: endDate };
            } else if (expiryFilter === '3_months') {
                endDate.setMonth(endDate.getMonth() + 3);
                query.expiryDate = { $gte: now, $lte: endDate };
            } else if (expiryFilter === 'expired') {
                query.expiryDate = { $lt: now };
            }
        }
        
        const sort = { expiryDate: 1 };
        
        const products = await productDao.getProducts(userId, query, skip, limit, sort);
        const total = await productDao.countProducts(userId, query);
        
        return {
            products,
            total,
            page,
            totalPages: Math.ceil(total / limit)
        };
    },
    
    updateProduct: async (id, userId, data) => {
        return await productDao.updateProduct(id, userId, data);
    },
    
    deleteProduct: async (id, userId) => {
        return await productDao.deleteProduct(id, userId);
    }
};

module.exports = productService;
