// // import { createContext, useContext, useState } from 'react';

// // const CartContext = createContext();

// // export function CartProvider({ children }) {
// //   const [cart, setCart] = useState([]);
// //   const [lastViewed, setLastViewed] = useState([]);

// //   const addToCart = (product) => {
// //     setCart([...cart, product]);
// //   };

// //   const removeFromCart = (productId) => {
// //     setCart(cart.filter(item => item.id !== productId));
// //   };

// //   const addToLastViewed = (product) => {
// //     setLastViewed(prev => {
// //       const filtered = prev.filter(item => item.id !== product.id);
// //       return [product, ...filtered].slice(0, 10);
// //     });
// //   };

// //   return (
// //     <CartContext.Provider value={{
// //       cart,
// //       lastViewed,
// //       addToCart,
// //       removeFromCart,
// //       addToLastViewed
// //     }}>
// //       {children}
// //     </CartContext.Provider>
// //   );
// // }

// // export function useCart() {
// //   return useContext(CartContext);
// // }

// import { createContext, useContext, useEffect, useState } from 'react';
// import toast from 'react-hot-toast';

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   // ✅ Load Cart and Last Viewed from LocalStorage (even after refresh)
//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem('cart');
//     return savedCart ? JSON.parse(savedCart) : [];
//   });

//   const [lastViewed, setLastViewed] = useState(() => {
//     const savedLastViewed = localStorage.getItem('lastViewed');
//     return savedLastViewed ? JSON.parse(savedLastViewed) : [];
//   });

//   // ✅ Update LocalStorage whenever Cart or LastViewed changes
//   useEffect(() => {
//     localStorage.setItem('cart', JSON.stringify(cart));
//     localStorage.setItem('lastViewed', JSON.stringify(lastViewed));
//   }, [cart, lastViewed]);

//   // ✅ 1. Add to Cart Function (No Duplicate Items Allowed)
//   const addToCart = (product) => {
//     const existingItem = cart.find(item => item.id === product.id);

//     if (existingItem) {
//       // ✅ Increase Quantity if Item Already Exists
//       setCart(cart.map(item => 
//         item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
//       ));
//       toast.success(`Increased quantity of ${product.title}`);
//     } else {
//       // ✅ Add Item as New Product
//       setCart([...cart, { ...product, quantity: 1 }]);
//       toast.success(`${product.title} added to cart`);
//     }
//   };

//   // ✅ 2. Remove Item from Cart
//   const removeFromCart = (productId) => {
//     setCart(cart.filter(item => item.id !== productId));
//     toast.success(`Item removed from cart`);
//   };

//   // ✅ 3. Increment Quantity
//   const increaseQuantity = (productId) => {
//     setCart(cart.map(item =>
//       item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
//     ));
//     toast.success(`Quantity increased`);
//   };

//   // ✅ 4. Decrement Quantity
//   const decreaseQuantity = (productId) => {
//     setCart(cart.map(item =>
//       item.id === productId && item.quantity > 1
//         ? { ...item, quantity: item.quantity - 1 }
//         : item
//     ));
//     toast.success(`Quantity decreased`);
//   };

//   // ✅ 5. Clear Entire Cart
//   const clearCart = () => {
//     setCart([]);
//     toast.success(`Cart cleared successfully`);
//   };

//   // ✅ 6. Add to Last Viewed (Limit 10)
//   const addToLastViewed = (product) => {
//     const alreadyViewed = lastViewed.find(item => item.id === product.id);
//     if (alreadyViewed) return;

//     setLastViewed((prev) => {
//       const updated = [product, ...prev];
//       if (updated.length > 10) {
//         updated.pop();
//       }
//       return updated;
//     });
//   };

//   return (
//     <CartContext.Provider value={{
//       cart,
//       lastViewed,
//       addToCart,
//       removeFromCart,
//       addToLastViewed,
//       increaseQuantity,
//       decreaseQuantity,
//       clearCart
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export function useCart() {
//   return useContext(CartContext);
// }

import { createContext, useContext, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // ✅ Fix: Prevent Double Toast
  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);

    if (existingItem) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
      toast.dismiss(); // Prevent double toast
      toast.success(`Increased quantity of ${product.title}`);
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.dismiss(); // Prevent double toast
      toast.success(`${product.title} added to cart`);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
    toast.dismiss(); // Prevent double toast
    toast.success(`Item removed from cart`);
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
