




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import custom CSS for styling

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [sku, setSku] = useState('');
  const [price, setPrice] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [message, setMessage] = useState('');
  const [chatInput, setChatInput] = useState('');
  const [chatMessages, setChatMessages] = useState([]);

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
      await axios.post('http://localhost:5000/api/items', { name, sku, price });
      setMessage('Item added successfully!');
      setName('');
      setSku('');
      setPrice('');
      fetchItems(); // Reload the items list after adding
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

  // Handle chat input
  const handleChatInput = (e) => {
    setChatInput(e.target.value);
  };

  // Handle chat submission
  const handleChatSubmit = async (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    setChatMessages((prevMessages) => [
      ...prevMessages,
      { sender: 'user', text: chatInput },
    ]);

    try {
      const response = await axios.post('http://localhost:5000/api/chat', { query: chatInput });
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: response.data.reply },
      ]);
    } catch (error) {
      setChatMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'system', text: 'An error occurred while processing your query.' },
      ]);
    }

    setChatInput(''); // Clear chat input
  };

  // Effect to fetch items when the search query changes
  useEffect(() => {
    fetchItems();
  }, [searchQuery]);

  return (
    <div className="container">
      <h1 className="main-heading">Ordering Page</h1>

      {/* Add Item Section */}
      <div className="section">
        <h2>Add Item</h2>
        <form className="form" onSubmit={handleAddItem}>
          <input
            className="input"
            type="text"
            placeholder="Item Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="input"
            type="text"
            placeholder="SKU"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            required
          />
          <input
            className="input"
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <button className="button" type="submit">Add Item</button>
        </form>
      </div>

      {/* Search Section */}
      <div className="section">
        <h2>Search Items</h2>
        <input
          className="input"
          type="text"
          placeholder="Search by Name or SKU"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button className="button" onClick={fetchItems}>Search</button>
      </div>

      {/* Item List Section */}
      <div className="section">
        <h2>Item List</h2>
        <ul className="item-list">
          {items.length === 0 ? (
            <p>No items found</p>
          ) : (
            items.map((item) => (
              <li className="item" key={item._id}>
                <div>
                  {item.name} - SKU: {item.sku} - ${item.price}
                </div>
                <button className="button" onClick={() => handleAddToCart(item)}>Add to Cart</button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Cart Section */}
      <div className="section">
        <h2>Shopping Cart</h2>
        <ul className="cart-list">
          {cart.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            cart.map((item) => (
              <li className="item" key={item._id}>
                <div>
                  {item.name} - ${item.price}
                </div>
                <button className="button remove" onClick={() => handleRemoveFromCart(item)}>Remove</button>
              </li>
            ))
          )}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="section chat-section">
        <h2>Chat Interface</h2>
        <div className="chat-box">
          {chatMessages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.sender === 'user' ? 'user-message' : 'system-message'}`}
            >
              <strong>{msg.sender === 'user' ? 'You' : 'System'}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <form className="chat-form" onSubmit={handleChatSubmit}>
          <input
            className="input chat-input"
            type="text"
            placeholder="Ask a question..."
            value={chatInput}
            onChange={handleChatInput}
            required
          />
          <button className="button chat-button" type="submit">Send</button>
        </form>
      </div>

      {/* Message Section */}
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
