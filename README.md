# ROXILER SYSTEM - TASK

## Overview

This project is an Express and React-based web application for managing and visualizing e-commerce transaction data. It includes functionalities to list transactions, display statistics, and generate bar and pie charts. The backend is built with Node.js and MongoDB, and the frontend is created using React.js with Chart.js for data visualization.



## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features


- **Transaction Listings**: View detailed information about each transaction, including ID, title, description, price, category, sold status, and image.
- **Search Functionality**: Search for transactions based on title, description, or price.
- **Month Filter**: Filter transactions by month to view relevant data.
- **Statistics**: View key statistics for each month, including total sale amount, total sold items, and total not sold items.
- **Bar Chart**: Visualize the number of items in different price ranges for each month.

## Installation

To get started with TransactiViz, follow these steps:

1. Clone the repository:
    ```bash
    git clone https://github.com/gajanan0210/ROXILER-SYSTEM-MERN-TASK.git
    cd ROXILER-SYSTEM-MERN-TASK
    ```

2. Install the dependencies for the frontend:
    ```bash
    npm install
    ```

3. Install the dependencies for the backend:
    ```bash
    cd server
    npm install
    ```

4. Start the backend server:
    ```bash
    npm start
    ```

5. Start the frontend development server:
    ```bash
    cd ..
    npm start
    ```

## Usage

1. Open your web browser and navigate to `http://localhost:3000`.
2. Use the search bar to search for transactions by title, description, or price.
3. Use the dropdown menu to select a month and filter the transactions.
4. View the transaction listings, statistics, and bar chart for the selected month.

## API Endpoints

### Transactions

- **GET /api/products/transactions**: List transactions with search and pagination.
  - Query Parameters:
    - `search` (string, optional): Search term.
    - `month` (string, optional): Month to filter by.
    - `page` (number, optional): Page number for pagination.
    - `perPage` (number, optional): Number of transactions per page.

### Statistics

- **GET /api/products/statistics**: Get statistics for a specific month.
  - Query Parameters:
    - `month` (string, required): Month to filter by.

### Bar Chart Data

- **GET /api/products/bar-chart**: Get bar chart data for a specific month.
  - Query Parameters:
    - `month` (string, required): Month to filter by.

### Pie Chart Data

- **GET /api/products/pie-chart**: Get pie chart data for a specific month.
  - Query Parameters:
    - `month` (string, required): Month to filter by.

### Combined Data

- **GET /api/products/combined**: Get combined data (statistics, bar chart data, pie chart data) for a specific month.
  - Query Parameters:
    - `month` (string, required): Month to filter by.

## Technologies Used

- **Frontend**:
  - React
  - React Bootstrap
  - Axios
  - Chart.js

- **Backend**:
  - Node.js
  - Express.js
  - MongoDB (Mongoose)


