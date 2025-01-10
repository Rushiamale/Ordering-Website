

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');

  // Fetch items from the backend
  const fetchItems = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/items/search?query=${searchQuery}`);
      setItems(response.data);
    } catch (error) {
      setMessage('Failed to fetch items');
    }
  };

  // Handle adding an item to the database
  const handleAddItem = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/items', { name, sku, price });
      setMessage('Item added successfully!');
      setName('');
      setSku('');
      setPrice('');
      fetchItems();  // Reload the items list after adding
    } catch (error) {
      setMessage('Failed to add item');
    }
  };

  // Add item to cart
  const handleAddToCart = (item) => {
    setCart((prevCart) => [...prevCart, item]);
  };

  // Remove item from cart
  const handleRemoveFromCart = (itemToRemove) => {
    setCart(cart.filter(item => item._id !== itemToRemove._id));
  };

  // Handle search change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle submit search
  const handleSearch = () => {
    fetchItems();
  };

  // Effect to fetch items when the search query changes
  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  return (
    <div>
      <h1>Ordering Page</h1>

      {/* Add Item Section */}
      <div>
        <h2>Add Item</h2>
        <form onSubmit={handleAddItem}>
          <input
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button type="submit">Add Item</button>
        </form>
      </div>

      {/* Search Section */}
      <div>
        <h2>Search Items</h2>
        <input
          type="text"
          placeholder="Search by Name or SKU"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Item List Section */}
      <div>
        <h2>Item List</h2>
        <ul>
          {items.length === 0 ? (
            <p>No items found</p>
          ) : (
            items.map((item) => (
              <li key={item._id}>
                {item.name} - SKU: {item.sku} - ${item.price}
                <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Cart Section */}
      <div>
        <h2>Shopping Cart</h2>
        <ul>
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <li key={item._id}>
                {item.name} - ${item.price}
                <button onClick={() => handleRemoveFromCart(item)}>Remove</button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Message Section */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default App;
