// // import { useState } from 'react';
// // import { loadStripe } from '@stripe/stripe-js';
// // import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// // import { useCart } from '../context/CartContext';
// // import toast from 'react-hot-toast';

// // const stripePromise = loadStripe('your-publishable-key-here');

// // // Card Checkout Form
// // const CardCheckoutForm = ({ total, onPaymentSuccess }) => {
// //     const stripe = useStripe();
// //     const elements = useElements();
// //     const [loading, setLoading] = useState(false);

// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         if (!stripe || !elements) return;

// //         setLoading(true);

// //         const { clientSecret } = await fetch('/api/create-payment-intent', {
// //             method: 'POST',
// //             headers: { 'Content-Type': 'application/json' },
// //             body: JSON.stringify({ amount: total * 100 }) // Total amount in cents
// //         }).then(res => res.json());

// //         const result = await stripe.confirmCardPayment(clientSecret, {
// //             payment_method: {
// //                 card: elements.getElement(CardElement),
// //                 billing_details: {
// //                     name: 'John Doe', // Replace with actual customer info
// //                 },
// //             },
// //         });

// //         setLoading(false);

// //         if (result.error) {
// //             toast.error(`Payment failed: ${result.error.message}`);
// //         } else if (result.paymentIntent.status === 'succeeded') {
// //             toast.success('Payment successful!');
// //             onPaymentSuccess(); // Call to add order and clear cart
// //         }
// //     };

// //     return (
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //             <CardElement className="p-4 border rounded" />
// //             <button
// //                 type="submit"
// //                 disabled={!stripe || loading}
// //                 className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
// //             >
// //                 {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
// //             </button>
// //         </form>
// //     );
// // };

// // // Cart Component
// // export default function Cart() {
// //     const { cart, removeFromCart, clearCart } = useCart();
// //     const [showCheckout, setShowCheckout] = useState(false);
// //     const [paymentMethod, setPaymentMethod] = useState('');
// //     const [showCardForm, setShowCardForm] = useState(false);
// //     const [showOtherMethods, setShowOtherMethods] = useState(false);
// //     const [couponCode, setCouponCode] = useState('');
// //     const [isCouponApplied, setIsCouponApplied] = useState(false);
// //     const [discountedTotal, setDiscountedTotal] = useState(0);
// //     const total = cart.reduce((sum, item) => sum + item.price, 0);
// //     const [address, setAddress] = useState(null);
// //     const [userName, setUserName] = useState('');
// //     const [upiId, setUpiId] = useState(''); // For UPI or phone number

// //     const handleRemove = (item) => {
// //         removeFromCart(item.id);
// //         toast.success(`${item.title} removed from cart`);
// //     };

// //     const handleCheckout = () => {
// //         const savedAddress = JSON.parse(localStorage.getItem('address'));
// //         const savedUserName = localStorage.getItem('username');
// //         if (savedAddress) setAddress(savedAddress);
// //         if (savedUserName) setUserName(savedUserName);
// //         setShowCheckout(true);
// //     };
// // // const orders=localStorage.getItem("orders");
// // // console.log("88:",orders)
// //     const handlePaymentMethodChange = (method) => {
// //         setPaymentMethod(method);
// //         setShowCardForm(method === 'card');
// //         setShowOtherMethods(method === 'other');
// //         if (method === 'other') setUpiId(''); // Clear UPI when switching methods
// //     };

// //     const handleApplyCoupon = () => {
// //         const savedCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
// //         let discount = 0;

// //         if (savedCoupons.includes(couponCode)) {
// //             discount = total * 0.1; // Apply 10% discount
// //             setIsCouponApplied(true);
// //             setDiscountedTotal(total - discount);
// //             toast.success('10% discount applied successfully!');
// //         } else {
// //             toast.error('Invalid coupon code');
// //         }
// //     };

// //     // Add Order and Save to Local Storage
// //     const addOrder = async () => {
// //         const orderDetails = {
// //             items: cart,
// //             total: isCouponApplied ? discountedTotal : total,
// //             userName,
// //             address,
// //             upiId,
// //             date: new Date().toLocaleString(), // Include order date
// //         };

// //         const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
// //         existingOrders.push(orderDetails);
// //         localStorage.setItem('orders', JSON.stringify(existingOrders));

// //         toast.success('Order added successfully!');
// //         clearCart(); // Clear cart after placing order
// //     };

// //     const handleCashOnDelivery = () => {
// //         addOrder(); // Add order for cash on delivery
// //         toast.success('Order placed successfully with Cash on Delivery!');
// //     };

// //     const handleOtherPayments = () => {
// //         addOrder(); // Add order for UPI/other payment methods
// //         toast.success('Order placed successfully via UPI!');
// //     };

// //     return (
// //         <div className="max-w-2xl mx-auto">
// //             <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

// //             {!showCheckout ? (
// //                 <>
// //                     {cart.length === 0 ? (
// //                         <p className="text-gray-600">Your cart is empty</p>
// //                     ) : (
// //                         <>
// //                             {cart.map(item => (
// //                                 <div key={item.id} className="flex items-center justify-between border-b py-4">
// //                                     <div className="flex items-center">
// //                                         <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
// //                                         <div className="ml-4">
// //                                             <h3 className="font-semibold">{item.title}</h3>
// //                                             <p className="text-gray-600">${item.price}</p>
// //                                         </div>
// //                                     </div>
// //                                     <button
// //                                         onClick={() => handleRemove(item)}
// //                                         className="text-red-600 hover:text-red-800"
// //                                     >
// //                                         Remove
// //                                     </button>
// //                                 </div>
// //                             ))}

// //                             <div className="mt-6">
// //                                 <div className="text-xl font-bold mb-4">
// //                                     Total: ${isCouponApplied ? discountedTotal.toFixed(2) : total.toFixed(2)}
// //                                 </div>
// //                                 <div className="flex items-center mb-4">
// //                                     <input
// //                                         type="text"
// //                                         value={couponCode}
// //                                         onChange={(e) => setCouponCode(e.target.value)}
// //                                         placeholder="Enter coupon code"
// //                                         className="border rounded p-2 mr-2"
// //                                     />
// //                                     <button
// //                                         onClick={handleApplyCoupon}
// //                                         className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
// //                                     >
// //                                         Apply Coupon
// //                                     </button>
// //                                 </div>
// //                                 <button
// //                                     onClick={handleCheckout}
// //                                     className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
// //                                 >
// //                                     Proceed to Checkout
// //                                 </button>
// //                             </div>
// //                         </>
// //                     )}
// //                 </>
// //             ) : (
// //                 <div className="mt-6">
// //                     <h3 className="text-xl font-bold mb-4">Delivering To:</h3>
// //                     {userName && <p className="text-gray-700">{userName}</p>}
// //                     {address ? (
// //                         <div className="mb-4">
// //                             <p className="text-gray-700">{`${address.street}, ${address.city}, ${address.state}, ${address.zip}`}</p>
// //                         </div>
// //                     ) : (
// //                         <p className="text-red-600">No address found. Please add your address in the admin section.</p>
// //                     )}
                    
// //                     <h3 className="text-xl font-bold mb-4">Select Payment Method</h3>
// //                     <div className="space-y-4 mb-4">
// //                         <button
// //                             onClick={() => handlePaymentMethodChange('card')}
// //                             className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
// //                         >
// //                             Credit/Debit Card
// //                         </button>
// //                         <button
// //                             onClick={() => handlePaymentMethodChange('other')}
// //                             className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
// //                         >
// //                             Google Pay / Paytm / Other
// //                         </button>
// //                         <button
// //                             onClick={handleCashOnDelivery}
// //                             className="w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300"
// //                         >
// //                             Cash on Delivery
// //                         </button>
// //                     </div>

// //                     {showCardForm && (
// //                         <Elements stripe={stripePromise}>
// //                             <CardCheckoutForm total={isCouponApplied ? discountedTotal : total} onPaymentSuccess={addOrder} />
// //                         </Elements>
// //                     )}

// //                     {showOtherMethods && (
// //                         <div>
// //                             <input
// //                                 type="text"
// //                                 value={upiId}
// //                                 onChange={(e) => setUpiId(e.target.value)}
// //                                 placeholder="Enter UPI ID or Phone Number"
// //                                 className="border rounded p-2 mb-4 w-full"
// //                             />
// //                             <button
// //                                 onClick={handleOtherPayments}
// //                                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
// //                             >
// //                                 Pay Now
// //                             </button>
// //                         </div>
// //                     )}
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }

 

import { useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTrash, FaCreditCard, FaMobile, FaMoneyBillWave, FaCheckCircle } from 'react-icons/fa';

const stripePromise = loadStripe('your-publishable-key-here');

// Card Checkout Form
const CardCheckoutForm = ({ total, onPaymentSuccess }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);

        const { clientSecret } = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ amount: total * 100 }) // Total amount in cents
        }).then(res => res.json());

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'John Doe', // Replace with actual customer info
                },
            },
        });

        setLoading(false);

        if (result.error) {
            toast.error(`Payment failed: ${result.error.message}`);
        } else if (result.paymentIntent.status === 'succeeded') {
            toast.success('Payment successful!');
            onPaymentSuccess(); // Call to add order and clear cart
        }
    };

    return (
        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="p-4 border-2 border-gray-200 rounded-lg bg-white shadow-lg"
            >
              <CardElement className="text-gray-700" />
            </motion.div>
            <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                disabled={!stripe || loading}
                className="w-full bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50"
            >
                {loading ? (
                  <span className="flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Processing...
                  </span>
                ) : (
                  `💳 Pay $${total.toFixed(2)}`
                )}
            </motion.button>
        </motion.form>
    );
};

// Cart Component
export default function Cart() {
    const { cart, removeFromCart, clearCart } = useCart();
    const [showCheckout, setShowCheckout] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('');
    const [showCardForm, setShowCardForm] = useState(false);
    const [showOtherMethods, setShowOtherMethods] = useState(false);
    const [couponCode, setCouponCode] = useState('');
    const [isCouponApplied, setIsCouponApplied] = useState(false);
    const [discountedTotal, setDiscountedTotal] = useState(0);
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    const [address, setAddress] = useState(null);
    const [userName, setUserName] = useState('');
    const [upiId, setUpiId] = useState(''); // For UPI or phone number

    const handleRemove = (item) => {
        removeFromCart(item.id);
        toast.success(`${item.title} removed from cart`, {
          icon: '🗑️',
          style: {
            borderRadius: '10px',
            background: '#333',
            color: '#fff',
          },
        });
    };

    const handleCheckout = () => {
        const savedAddress = JSON.parse(localStorage.getItem('address'));
        const savedUserName = localStorage.getItem('username');
        if (savedAddress) setAddress(savedAddress);
        if (savedUserName) setUserName(savedUserName);
        setShowCheckout(true);
    };

    const handlePaymentMethodChange = (method) => {
        setPaymentMethod(method);
        setShowCardForm(method === 'card');
        setShowOtherMethods(method === 'other');
        if (method === 'other') setUpiId(''); // Clear UPI when switching methods
    };

    const handleApplyCoupon = () => {
        const savedCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
        let discount = 0;

        if (savedCoupons.includes(couponCode)) {
            discount = total * 0.1; // Apply 10% discount
            setIsCouponApplied(true);
            setDiscountedTotal(total - discount);
            toast.success('🎉 10% discount applied successfully!', {
              style: {
                borderRadius: '10px',
                background: '#10B981',
                color: '#fff',
              },
            });
        } else {
            toast.error('❌ Invalid coupon code', {
              style: {
                borderRadius: '10px',
                background: '#EF4444',
                color: '#fff',
              },
            });
        }
    };

    // Add Order and Save to Local Storage
    const addOrder = async () => {
        const orderDetails = {
            items: cart,
            total: isCouponApplied ? discountedTotal : total,
            userName,
            address,
            upiId,
            date: new Date().toLocaleString(), // Include order date
        };

        const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
        existingOrders.push(orderDetails);
        localStorage.setItem('orders', JSON.stringify(existingOrders));

        toast.success('🎉 Order placed successfully!', {
          icon: '✅',
          style: {
            borderRadius: '10px',
            background: '#10B981',
            color: '#fff',
          },
        });
        clearCart(); // Clear cart after placing order
        setShowCheckout(false);
    };

    const handleCashOnDelivery = () => {
        addOrder(); // Add order for cash on delivery
        toast.success('💰 Order placed with Cash on Delivery!');
    };

    const handleOtherPayments = () => {
        addOrder(); // Add order for UPI/other payment methods
        toast.success('📱 Order placed via UPI!');
    };

    return (
        <motion.div 
          className="max-w-4xl mx-auto p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
            <motion.h2 
              className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              🛒 Your Shopping Cart
            </motion.h2>

            <AnimatePresence mode="wait">
              {!showCheckout ? (
                <>
                    {cart.length === 0 ? (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="text-center py-16"
                        >
                          <div className="text-6xl mb-4">🛒</div>
                          <h3 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h3>
                          <p className="text-gray-500 mb-6">Add some games to get started!</p>
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => window.location.href = '/'}
                            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            🎮 Browse Games
                          </motion.button>
                        </motion.div>
                    ) : (
                        <>
                            <motion.div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
                              <AnimatePresence>
                                {cart.map((item, index) => (
                                  <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 50 }}
                                    transition={{ duration: 0.3, delay: index * 0.1 }}
                                    className="flex items-center justify-between border-b border-gray-200 py-6 last:border-b-0"
                                  >
                                    <div className="flex items-center">
                                        <motion.img 
                                          src={item.image} 
                                          alt={item.title} 
                                          className="w-24 h-24 object-cover rounded-xl shadow-md"
                                          whileHover={{ scale: 1.1 }}
                                        />
                                        <div className="ml-4">
                                            <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                                            <p className="text-2xl font-bold text-green-600">${item.price}</p>
                                            <p className="text-sm text-gray-500">Quantity: {item.quantity || 1}</p>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.1, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => handleRemove(item)}
                                        className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                                    >
                                        <FaTrash />
                                    </motion.button>
                                  </motion.div>
                                ))}
                              </AnimatePresence>
                            </motion.div>

                            <motion.div 
                              className="bg-white rounded-2xl shadow-lg p-6"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ duration: 0.5, delay: 0.3 }}
                            >
                                <div className="text-3xl font-bold text-gray-800 mb-6 text-center">
                                    Total: ${isCouponApplied ? discountedTotal.toFixed(2) : total.toFixed(2)}
                                    {isCouponApplied && (
                                      <motion.span
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="ml-2 text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full"
                                      >
                                        10% OFF Applied!
                                      </motion.span>
                                    )}
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    <motion.input
                                        whileFocus={{ scale: 1.02 }}
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter coupon code"
                                        className="flex-1 border-2 border-gray-300 p-3 rounded-lg text-gray-700 focus:border-purple-500 focus:outline-none transition-all duration-300"
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleApplyCoupon}
                                        className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                                    >
                                        🎫 Apply
                                    </motion.button>
                                </div>
                                <motion.button
                                    whileHover={{ scale: 1.02, y: -2 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={handleCheckout}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                                >
                                    🚀 Proceed to Checkout
                                </motion.button>
                            </motion.div>
                        </>
                    )}
                </>
              ) : (
                <motion.div 
                  className="bg-white rounded-2xl shadow-lg p-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                    <motion.h3 
                      className="text-2xl font-bold text-gray-800 mb-6 flex items-center"
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                    >
                      🚚 Delivering To:
                    </motion.h3>
                    {userName && (
                      <motion.p 
                        className="text-lg font-semibold text-gray-700 mb-2"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                      >
                        👤 {userName}
                      </motion.p>
                    )}
                    {address ? (
                        <motion.div 
                          className="mb-6 p-4 bg-gray-50 rounded-lg"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                        >
                            <p className="text-gray-700">📍 {`${address.street}, ${address.city}, ${address.state}, ${address.zip}`}</p>
                        </motion.div>
                    ) : (
                        <motion.p 
                          className="text-red-500 bg-red-50 p-4 rounded-lg mb-6"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                        >
                          ⚠️ No address found. Please add your address in the admin section.
                        </motion.p>
                    )}

                    <motion.h3 
                      className="text-2xl font-bold text-gray-800 mb-6"
                      initial={{ x: -20 }}
                      animate={{ x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      💳 Select Payment Method
                    </motion.h3>
                    <div className="grid gap-4 mb-8">
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.5 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePaymentMethodChange('card')}
                            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg ${
                              paymentMethod === 'card' 
                                ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <FaCreditCard className="mr-3 text-xl" />
                            Credit/Debit Card
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => handlePaymentMethodChange('other')}
                            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg ${
                              paymentMethod === 'other' 
                                ? 'bg-gradient-to-r from-teal-500 to-green-500 text-white shadow-xl' 
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            <FaMobile className="mr-3 text-xl" />
                            Google Pay / Paytm / UPI
                        </motion.button>
                        <motion.button
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.7 }}
                            whileHover={{ scale: 1.02, y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={handleCashOnDelivery}
                            className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center shadow-lg hover:shadow-xl"
                        >
                            <FaMoneyBillWave className="mr-3 text-xl" />
                            Cash on Delivery
                        </motion.button>
                    </div>

                    <AnimatePresence>
                      {showCardForm && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gray-50 p-6 rounded-xl"
                        >
                          <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <FaCreditCard className="mr-2 text-blue-600" />
                            Card Payment
                          </h4>
                        <Elements stripe={stripePromise}>
                            <CardCheckoutForm total={isCouponApplied ? discountedTotal : total} onPaymentSuccess={addOrder} />
                        </Elements>
                        </motion.div>
                      )}

                      {showOtherMethods && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-gray-50 p-6 rounded-xl"
                        >
                          <h4 className="text-lg font-semibold mb-4 flex items-center">
                            <FaMobile className="mr-2 text-green-600" />
                            UPI Payment
                          </h4>
                            <motion.input
                                whileFocus={{ scale: 1.02 }}
                                type="text"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                placeholder="Enter UPI ID or Phone Number"
                                className="border-2 border-gray-300 p-4 rounded-lg mb-4 w-full focus:border-green-500 focus:outline-none transition-all duration-300"
                            />
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={handleOtherPayments}
                                className="w-full bg-gradient-to-r from-green-500 to-teal-500 text-white py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                💰 Pay Now
                            </motion.button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </motion.div>
              )}
            </AnimatePresence>
        </motion.div>
    );
}

// import { useState } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
// import { useCart } from '../context/CartContext';
// import toast from 'react-hot-toast';

// const stripePromise = loadStripe('your-publishable-key-here');

// const CardCheckoutForm = ({ total, onPaymentSuccess }) => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const [loading, setLoading] = useState(false);

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         if (!stripe || !elements) return;

//         setLoading(true);

//         const { clientSecret } = await fetch('/api/create-payment-intent', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ amount: total * 100 })
//         }).then(res => res.json());

//         const result = await stripe.confirmCardPayment(clientSecret, {
//             payment_method: {
//                 card: elements.getElement(CardElement),
//                 billing_details: { name: 'John Doe' }
//             }
//         });

//         setLoading(false);

//         if (result.error) {
//             toast.error(`Payment failed: ${result.error.message}`);
//         } else if (result.paymentIntent.status === 'succeeded') {
//             toast.success('Payment successful!');
//             onPaymentSuccess();
//         }
//     };

//     return (
//         <form onSubmit={handleSubmit} className="space-y-4">
//             <CardElement className="p-4 border rounded bg-white" />
//             <button
//                 type="submit"
//                 disabled={!stripe || loading}
//                 className="bg-indigo-300 text-white py-2 px-4 rounded hover:bg-indigo-400"
//             >
//                 {loading ? 'Processing...' : `Pay $${total.toFixed(2)}`}
//             </button>
//         </form>
//     );
// };

// export default function Cart() {
//     const { cart, removeFromCart, clearCart } = useCart();
//     const [showCheckout, setShowCheckout] = useState(false);
//     const [paymentMethod, setPaymentMethod] = useState('');
//     const [showCardForm, setShowCardForm] = useState(false);
//     const [showOtherMethods, setShowOtherMethods] = useState(false);
//     const [couponCode, setCouponCode] = useState('');
//     const [isCouponApplied, setIsCouponApplied] = useState(false);
//     const [discountedTotal, setDiscountedTotal] = useState(0);
//     const total = cart.reduce((sum, item) => sum + item.price, 0);
//     const [address, setAddress] = useState(null);
//     const [userName, setUserName] = useState('');
//     const [upiId, setUpiId] = useState('');

//     const handleRemove = (item) => {
//         removeFromCart(item.id);
//         toast.success(`${item.title} removed from cart`);
//     };

//     const handleCheckout = () => {
//         const savedAddress = JSON.parse(localStorage.getItem('address'));
//         const savedUserName = localStorage.getItem('username');
//         if (savedAddress) setAddress(savedAddress);
//         if (savedUserName) setUserName(savedUserName);
//         setShowCheckout(true);
//     };

//     const handlePaymentMethodChange = (method) => {
//         setPaymentMethod(method);
//         setShowCardForm(method === 'card');
//         setShowOtherMethods(method === 'other');
//         if (method === 'other') setUpiId('');
//     };

//     const handleApplyCoupon = () => {
//         const savedCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
//         const discount = savedCoupons.includes(couponCode) ? total * 0.1 : 0;

//         if (discount) {
//             setIsCouponApplied(true);
//             setDiscountedTotal(total - discount);
//             toast.success('10% discount applied successfully!');
//         } else {
//             toast.error('Invalid coupon code');
//         }
//     };

//     const addOrder = () => {
//         const orderDetails = {
//             items: cart,
//             total: isCouponApplied ? discountedTotal : total,
//             userName,
//             address,
//             upiId,
//             date: new Date().toLocaleString(),
//         };

//         const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
//         existingOrders.push(orderDetails);
//         localStorage.setItem('orders', JSON.stringify(existingOrders));

//         toast.success('Order added successfully!');
//         clearCart();
//     };

//     const handleCashOnDelivery = () => {
//         addOrder();
//         toast.success('Order placed successfully with Cash on Delivery!');
//     };

//     const handleOtherPayments = () => {
//         addOrder();
//         toast.success('Order placed successfully via UPI!');
//     };

//     return (
//         <div className="max-w-2xl mx-auto">
//             <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h2>

//             {!showCheckout ? (
//                 <>
//                     {cart.length === 0 ? (
//                         <p className="text-gray-500">Your cart is empty</p>
//                     ) : (
//                         <>
//                             {cart.map(item => (
//                                 <div key={item.id} className="flex items-center justify-between border-b py-4">
//                                     <div className="flex items-center">
//                                         <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
//                                         <div className="ml-4">
//                                             <h3 className="font-semibold text-gray-700">{item.title}</h3>
//                                             <p className="text-gray-600">${item.price}</p>
//                                         </div>
//                                     </div>
//                                     <button
//                                         onClick={() => handleRemove(item)}
//                                         className="text-red-500 hover:text-red-700"
//                                     >
//                                         Remove
//                                     </button>
//                                 </div>
//                             ))}

//                             <div className="mt-6">
//                                 <div className="text-xl font-semibold text-gray-700 mb-4">
//                                     Total: ${isCouponApplied ? discountedTotal.toFixed(2) : total.toFixed(2)}
//                                 </div>
//                                 <div className="flex items-center mb-4">
//                                     <input
//                                         type="text"
//                                         value={couponCode}
//                                         onChange={(e) => setCouponCode(e.target.value)}
//                                         placeholder="Enter coupon code"
//                                         className="border p-2 rounded-md text-gray-700"
//                                     />
//                                     <button
//                                         onClick={handleApplyCoupon}
//                                         className="bg-pink-300 text-white py-2 px-4 rounded hover:bg-pink-400"
//                                     >
//                                         Apply Coupon
//                                     </button>
//                                 </div>
//                                 <button
//                                     onClick={handleCheckout}
//                                     className="w-full bg-indigo-200 text-gray-800 py-2 rounded-md hover:bg-indigo-300"
//                                 >
//                                     Proceed to Checkout
//                                 </button>
//                             </div>
//                         </>
//                     )}
//                 </>
//             ) : (
//                 <div className="mt-6">
//                     <h3 className="text-xl font-semibold text-gray-700 mb-4">Delivering To:</h3>
//                     {userName && <p className="text-gray-600">{userName}</p>}
//                     {address ? (
//                         <div className="mb-4">
//                             <p className="text-gray-600">{`${address.street}, ${address.city}, ${address.state}, ${address.zip}`}</p>
//                         </div>
//                     ) : (
//                         <p className="text-red-500">No address found. Please add your address in the admin section.</p>
//                     )}

//                     <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Payment Method</h3>
//                     <div className="space-y-4 mb-4">
//                         <button
//                             onClick={() => handlePaymentMethodChange('card')}
//                             className="w-full bg-blue-300 text-white py-2 rounded-md hover:bg-blue-400"
//                         >
//                             Credit/Debit Card
//                         </button>
//                         <button
//                             onClick={() => handlePaymentMethodChange('other')}
//                             className="w-full bg-teal-300 text-white py-2 rounded-md hover:bg-teal-400"
//                         >
//                             Google Pay / Paytm / Other
//                         </button>
//                         <button
//                             onClick={handleCashOnDelivery}
//                             className="w-full bg-yellow-300 text-white py-2 rounded-md hover:bg-yellow-400"
//                         >
//                             Cash on Delivery
//                         </button>
//                     </div>

//                     {showCardForm && (
//                         <Elements stripe={stripePromise}>
//                             <CardCheckoutForm total={isCouponApplied ? discountedTotal : total} onPaymentSuccess={addOrder} />
//                         </Elements>
//                     )}
//                 </div>
//             )}
//         </div>
//     );
// }
