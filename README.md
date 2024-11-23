# Book_Shop

The Book_shop application allows users to manage their bookshop by adding, updating, and deleting books, viewing all or specific book details, creating orders, and calculating total revenue.

## Features

- Facility to Add, Update and Delete Book Details.
- Facility to View All or Specific Book Details.
- Facility to Create And Track Customer Orders.
- Facility to Manage The Quantity Of Books And Availability.
- Automatically Calculate Total Revenue Based On Orders

## Prerequisites

Before running the Book_shop project, install the following:

- **Node.js** (version 16 or higher) – To run the application and dependencies.
- **npm** – To manage and install packages.
- **TypeScript** (version 5.6 or higher) – To compile TypeScript files.
- **Git** – To clone the repository and manage version.

### Development Tools:

- **Mongoose** – A MongoDB ODM (Object Data Modeling) library to interact with the MongoDB database.
- **ts-node-dev** – For running TypeScript code in development mode.
- **ESLint** – For linting and ensuring code quality.
- **Prettier** – For automatic code formatting.

### Database:

- **MongoDB** – Used as the database for storing books and orders.

### Additional Configuration:

- Ensure that your machine supports **MongoDB** (locally or via a cloud) and set up a `.env` file with configuration for database.
- Run the application in a `modern browser` to have a seamless experience.

## Installation

Set up and run the Book_Shop project by following these steps:

### 1. Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/ikhtiaj-arif/Book_Shop_l2a2-.git

cd Book_Shop_l2a2

npm install
```

### 2. .env file

Provide the `PORT` and `DATABASE_URL` inside the `.env` file.

### 3. Run the application

To start the application in development mode, run:

```bash
npm run start:dev
```

To start the production mode:

```bash
npm run start:prod
```

To format the code:

```bash
npm run format
```

To automatically fix linting:

```bash
npm run lint:fix
```

## Contact

For any questions or feedback, reach out to me at [ikhtiaj.arif@gmail.com].
