# Walkthrough: Products API Implementation

## Overview
Implemented the product management APIs according to the use-cases specified in the prompts for the Expiry Date Manager application.

## Components Built

### 1. Database Model (`src/models/products.js`)
- Created `Product` schema in MongoDB via Mongoose.
- Fields: `userId`, `upcCode`, `title`, `amount`, `expiryDate`.
- Added indexes for text search (`title`, `upcCode`) and sorting (`expiryDate`).

### 2. Data Access Object (`src/dao/productDao.js`)
- Defined database operations to create, find, update, delete products, ensuring they are scoped to the specific `userId`.

### 3. Business Service (`src/services/productService.js`)
- Implemented core business logic.
- Implemented pagination using `skip` and `limit`.
- Added `$text` search support.
- Added expiry filter support for 1 month and 3 months logic.

### 4. Controller (`src/controllers/productController.js`)
- Request parsing and response sending logic.
- Included error handling block in each controller method.

### 5. Routing (`src/routes/productRoutes.js`)
- Registered REST endpoints:
  - `GET /api/products` (Dashboard, Search, Filter)
  - `POST /api/products` (Add Product)
  - `PUT /api/products/:id` (Update Product)
  - `DELETE /api/products/:id` (Delete Product)
- Included Swagger documentation comments for all routes.

### 6. Middleware and Integration
- Registered routes in `server.js`.
- Implemented `authMiddleware.js` for checking JWT tokens for all `/api/products` routes.
