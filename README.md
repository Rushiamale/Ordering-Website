# Ordering-Website
Here’s a simple README file for your **Ordering Website** project:

```markdown
# Ordering Website

A full-stack web application that allows users to view, add, and search for items in a shopping cart. The app uses React for the frontend, Node.js for the backend, and MongoDB to store the items and user data.

## Features

- **Add Items**: Users can add items to the shopping cart and store the items in a MongoDB database.
- **Search Items**: Users can search for items by SKU or name.
- **Remove Items**: Users can remove items from their shopping cart.
- **Frontend**: Built using React to handle the UI and user interaction.
- **Backend**: Built with Node.js and Express to handle HTTP requests and manage the backend logic.
- **Database**: MongoDB to store item data and shopping cart items.

## Tech Stack

- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **State Management**: React useState hooks

## Prerequisites

Before running the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/)
- [MongoDB](https://www.mongodb.com/)
- [Git](https://git-scm.com/)

## Setup

### Clone the repository

Clone the repository to your local machine:

```bash
git clone https://github.com/your-username/ordering-website.git
cd ordering-website
```

### Backend Setup

1. Go to the `backend` directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the backend server:

   ```bash
   node server.js
   ```

   The backend will run on `http://localhost:5000`.

### Frontend Setup

1. Go to the `frontend` directory:

   ```bash
   cd ../frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the frontend application:

   ```bash
   npm start
   ```

   The frontend will run on `http://localhost:3000`.

## Usage

- **Add Items**: In the frontend, navigate to the "Add Item" section and enter the item name, price, and SKU. Submit the form to add the item to the MongoDB database.
- **Search Items**: Enter the item name or SKU in the search bar and click the "Search" button to filter items by name or SKU.
- **Add to Cart**: Click "Add to Cart" next to an item to add it to your shopping cart.
- **Remove from Cart**: Click "Remove" next to an item in the cart to remove it.

## Contributing

Feel free to fork this repository and submit pull requests. If you find any issues or have ideas for improvement, open an issue in the repository.

