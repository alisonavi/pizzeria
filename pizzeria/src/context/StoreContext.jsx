import { createContext, useEffect, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
  const [cartItems, setCartItems] = useState({});
  const [foodList, setFoodList] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3003/menu')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.text(); // Read the response as plain text
      })
      .then(text => {
        try {
          return JSON.parse(text); // Try to parse the text as JSON
        } catch (error) {
          throw new Error('Failed to parse JSON: ' + error.message);
        }
      })
      .then(data => setFoodList(data))
      .catch(error => console.error('Error fetching menu:', error));
  }, []);

  const addToCart = (itemId) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }))
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }))
    }
  }

  const removeFromCart = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }))
  }

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo = foodList.find((product) => product._id === item);
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  }

  const contextValue = {
    food_list: foodList,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider;
