# Remainder Backend - Budgeting and Investment Recommendation API

## Table of Contents

- [Overview](#overview)
  - [Current Features](#current-features)
- [Links](#links)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [API Routes](#api-routes)
- [Frontend Links](#frontend-links)
- [Contributing](#contributing)
- [Contact](#contact)

## Overview

This is the backend service for the Remainder budgeting, savings, and investment recommendation application. The backend is built using **Express** and **Node.js** to provide a RESTful API, with **PostgreSQL** as the database and **Sequelize** as the ORM. The backend handles user data, income and expense records, and disposable income calculations, providing essential data to support the Remainder application.

### Current Features

- **User Management**: Routes for user creation and authentication.
- **Income & Expenses**: APIs to add, update, and delete income and expense records.
- **Disposable Income Calculation**: Calculation of disposable income based on tracked income and expenses.

## Links

- **Frontend Repository**: [Remainder Frontend](https://github.com/joshuanelsondev/frontend-remainder)
- **Frontend URL (Netlify)**: [Remainder Frontend Deployment](https://remainderinvest.netlify.app/)
- **Backend URL (Render)**: [Remainder Backend Deployment](https://backend-remainder.onrender.com)

## Technologies Used

- **Express**: A fast, unopinionated, minimalist web framework for Node.js.
- **Node.js**: A JavaScript runtime for building scalable network applications.
- **PostgreSQL**: A powerful, open-source object-relational database system.
- **Sequelize**: A promise-based Node.js ORM for SQL databases.

## Installation

To set up the backend locally:

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/joshuanelsondev/backend-remainder.git
   cd backend-remainder
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root of the project with the following variables:

   ```
   DATABASE_URL=<your_postgresql_database_url>
   JWT_SECRET=<your_jwt_secret>
   PORT=5000
   NODE_ENV=development
   ```

4. **Run Database Migrations**:

   ```bash
    npm run migrate
   ```

5. **Run the Server**:
   ```bash
   npm run start
   ```
   The server will be available at `http://localhost:5000`.

## API Routes

The API has the following endpoints:

- **Users**: `/api/users` - Manage user registration and authentication.
- **Incomes**: `/api/incomes` - Add, update, delete, and view incomes.
- **Expenses**: `/api/expenses` - Add, update, delete, and view expenses.
- **Disposable Income**: `/api/budget` - Calculate disposable income based on income and expenses.

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests with new features, bug fixes, or documentation updates.

## Contact

For any questions or inquiries, reach out via:

- Email: joshuanelsondev@gmail.com

[Back to the top](#table-of-contents)
