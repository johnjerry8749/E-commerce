import { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // ==========================================
  // CART STATE
  // ==========================================
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cartItems");

      if (!savedCart) {
        return [];
      }

      const parsedCart = JSON.parse(savedCart);

      return Array.isArray(parsedCart) ? parsedCart : [];
    } catch (error) {
      console.error("Error loading cart:", error);
      return [];
    }
  });

  // ==========================================
  // SAVE CART TO LOCAL STORAGE
  // ==========================================
  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.error("Error saving cart:", error);
    }
  }, [cartItems]);

  // ==========================================
  // ADD TO CART
  // ==========================================
  const addToCart = (product) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find(
        (item) =>
          Number(item.id) === Number(product.id) &&
          (item.size || "") === (product.size || "")
      );

      if (existingItem) {
        return currentItems.map((item) =>
          Number(item.id) === Number(product.id) &&
          (item.size || "") === (product.size || "")
            ? {
                ...item,
                quantity: Number(item.quantity || 0) + 1,
              }
            : item
        );
      }

      return [
        ...currentItems,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  // ==========================================
  // REMOVE FROM CART
  // ==========================================
  const removeFromCart = (id, size = "") => {
    setCartItems((currentItems) =>
      currentItems.filter(
        (item) =>
          !(
            Number(item.id) === Number(id) &&
            (item.size || "") === size
          )
      )
    );
  };

  // ==========================================
  // INCREASE QUANTITY
  // ==========================================
  const increaseQuantity = (id, size = "") => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        Number(item.id) === Number(id) &&
        (item.size || "") === size
          ? {
              ...item,
              quantity: Number(item.quantity || 0) + 1,
            }
          : item
      )
    );
  };

  // ==========================================
  // DECREASE QUANTITY
  // ==========================================
  const decreaseQuantity = (id, size = "") => {
    setCartItems((currentItems) =>
      currentItems
        .map((item) =>
          Number(item.id) === Number(id) &&
          (item.size || "") === size
            ? {
                ...item,
                quantity: Number(item.quantity || 0) - 1,
              }
            : item
        )
        .filter((item) => Number(item.quantity) > 0)
    );
  };

  // ==========================================
  // CLEAR CART
  // ==========================================
  const clearCart = () => {
    setCartItems([]);
    localStorage.removeItem("cartItems");
  };

  // ==========================================
  // CART COUNT
  // ==========================================
  const cartCount = cartItems.reduce(
    (total, item) => total + Number(item.quantity || 0),
    0
  );

  // ==========================================
  // TOTAL PRICE
  // ==========================================
  const totalPrice = cartItems.reduce(
    (total, item) =>
      total +
      Number(item.price || 0) * Number(item.quantity || 0),
    0
  );

  // ==========================================
  // PROVIDER
  // ==========================================
  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        cartCount,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ==========================================
// USE CART
// ==========================================
export const useCart = () => {
  return useContext(CartContext);
};

