## Coding Instruction for AI Agents
## Project Structure 
-`server.js`-Entry point
## Tech Stack & Environment

* Node.js (v24.16.0)
* Framework: Express.js
* Database: MongoDB

## ## Project Structure

* src/ - Source code
* src/config/ - Configuration files
* src/controllers/ - Controller functions
* src/models/ - Mongoose models
* src/routes/ - Route definitions
* src/services/ - Business logic
* src/utils/ - Utility functions
* src/dao/ - Database interactions
* server.js - Entry point

## ## Architecture Patterns

* Follow a strict Controller-Service-Repository pattern.
* Routes must only map to Controllers.
* Always generate swagger model for every newly added API.

## Coding Style Examples
#### 1. Controller

const userDao = require('../dao/userDao');
const authController = {
    login: async (request, response) => const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({errors: errors.array()});}
const { email, password } = request.body;