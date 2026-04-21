# Book Shop Backend 📚

A professional, scalable, and secure backend system for a Book Shop application. Built with **Node.js**, **Express.js**, **TypeScript**, and **MongoDB**, this project provides a comprehensive API for managing users, products, orders, and payments.

## 🚀 Key Features

-   **Secure Authentication**: Implementation of JWT (JSON Web Token) for stateless authentication, including access and refresh tokens.
-   **Role-Based Access Control (RBAC)**: Fine-grained permissions for different user roles (e.g., User, Admin).
-   **Product Management**: Full CRUD operations for books, including advanced search, filtering, and pagination.
-   **Order Processing**: Efficient order management system from creation to payment.
-   **Payment Integration**: Integrated with **Shurjopay** for secure and seamless payment transactions.
-   **Data Validation**: Robust schema validation using **Zod** to ensure data integrity.
-   **Global Error Handling**: Centralized error management for consistent API responses.
-   **Performance Optimized**: Built with TypeScript for type safety and better developer experience.

## 🛠️ Tech Stack

-   **Runtime**: [Node.js](https://nodejs.org/)
-   **Framework**: [Express.js](https://expressjs.com/)
-   **Language**: [TypeScript](https://www.typescriptlang.org/)
-   **Database**: [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)
-   **Validation**: [Zod](https://zod.dev/)
-   **Security**: [Bcrypt](https://github.com/kelektiv/node.bcrypt.js) & [JWT](https://jwt.io/)
-   **Payment Gateway**: [Shurjopay](https://shurjopay.com.bd/)
-   **Deployment**: [Vercel](https://vercel.com/)

## 📂 Project Structure

```text
src/
├── app/
│   ├── builder/      # Query builders for search/filter
│   ├── config/       # Environment & configuration files
│   ├── errors/       # Custom error classes
│   ├── interface/    # Global interfaces
│   ├── middlewears/  # Authentication & error middlewares
│   ├── modules/      # Feature-based modules (Auth, User, Products, Orders)
│   ├── routes/       # API route definitions
│   └── utils/        # Helper functions
├── app.ts            # Express application setup
└── server.ts         # Server entry point
```

## ⚙️ Getting Started

### Prerequisites

-   Node.js (v16 or higher)
-   npm or yarn
-   MongoDB Atlas account or local MongoDB instance

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/book-shop-backend.git
    cd book-shop-backend
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Environment Setup**:
    Create a `.env` file in the root directory and add the following variables:
    ```env
    NODE_ENV=development
    PORT=5000
    DATABASE_URL=your_mongodb_connection_string
    BCRYPT_SALT_ROUNDS=12
    JWT_ACCESS_SECRET=your_access_secret
    JWT_REFRESH_SECRET=your_refresh_secret
    JWT_ACCESS_EXP_IN=15m
    JWT_REFRESH_EXP_IN=30d

    # Shurjopay Credentials
    SP_ENDPOINT=https://sandbox.shurjopayment.com/api/prepare-pay
    SP_USERNAME=your_sp_username
    SP_PASSWORD=your_sp_password
    SP_PREFIX=your_sp_prefix
    SP_RETURN_URL=your_return_url
    ```

### Running the App

-   **Development Mode**:
    ```bash
    npm run start:dev
    ```
-   **Production Build**:
    ```bash
    npm run build
    npm run start:prod
    ```

## 📡 API Endpoints

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/auth/login` | `POST` | User login |
| `/api/users/create-user` | `POST` | Register a new user |
| `/api/products` | `GET` | Get all books (with search/filter) |
| `/api/products/:id` | `GET` | Get book details |
| `/api/orders` | `POST` | Place an order |
| `/api/orders/verify` | `GET` | Verify payment status |

## 🚀 Deployment

The project is configured for deployment on **Vercel**. Ensure you set up the environment variables in your Vercel project settings.

## 📄 License

This project is licensed under the [ISC License](LICENSE).
