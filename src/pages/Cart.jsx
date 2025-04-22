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
        <form onSubmit={handleSubmit} className="space-y-4">
            <CardElement className="p-4 border rounded bg-white" />
            <button
                type="submit"
                disabled={!stripe || loading}
                className="bg-indigo-300 text-white py-2 px-4 rounded hover:bg-indigo-400"
            >
                {loading ? 'Processing...' : `Pay Rs${total.toFixed(2)}`}
            </button>
        </form>
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
        toast.success(`${item.title} removed from cart`);
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
            toast.success('10% discount applied successfully!');
        } else {
            toast.error('Invalid coupon code');
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

        toast.success('Order added successfully!');
        clearCart(); // Clear cart after placing order
    };

    const handleCashOnDelivery = () => {
        addOrder(); // Add order for cash on delivery
        toast.success('Order placed successfully with Cash on Delivery!');
    };

    const handleOtherPayments = () => {
        addOrder(); // Add order for UPI/other payment methods
        toast.success('Order placed successfully via UPI!');
    };

    return (
        <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">Your Cart</h2>

            {!showCheckout ? (
                <>
                    {cart.length === 0 ? (
                        <p className="text-gray-500">Your cart is empty</p>
                    ) : (
                        <>
                            {cart.map(item => (
                                <div key={item.id} className="flex items-center justify-between border-b py-4">
                                    <div className="flex items-center">
                                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded" />
                                        <div className="ml-4">
                                            <h3 className="font-semibold text-gray-700">{item.title}</h3>
                                            <p className="text-gray-600">${item.price}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => handleRemove(item)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ))}

                            <div className="mt-6">
                                <div className="text-xl font-semibold text-gray-700 mb-4">
                                    Total: ${isCouponApplied ? discountedTotal.toFixed(2) : total.toFixed(2)}
                                </div>
                                <div className="flex items-center mb-4">
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => setCouponCode(e.target.value)}
                                        placeholder="Enter coupon code"
                                        className="border p-2 rounded-md text-gray-700"
                                    />
                                    <button
                                        onClick={handleApplyCoupon}
                                        className="bg-pink-300 text-white py-2 px-4 rounded hover:bg-pink-400"
                                    >
                                        Apply Coupon
                                    </button>
                                </div>
                                <button
                                    onClick={handleCheckout}
                                    className="w-full bg-indigo-200 text-gray-800 py-2 rounded-md hover:bg-indigo-300"
                                >
                                    Proceed to Checkout
                                </button>
                            </div>
                        </>
                    )}
                </>
            ) : (
                <div className="mt-6">
                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Delivering To:</h3>
                    {userName && <p className="text-gray-600">{userName}</p>}
                    {address ? (
                        <div className="mb-4">
                            <p className="text-gray-600">{`${address.street}, ${address.city}, ${address.state}, ${address.zip}`}</p>
                        </div>
                    ) : (
                        <p className="text-red-500">No address found. Please add your address in the admin section.</p>
                    )}

                    <h3 className="text-xl font-semibold text-gray-700 mb-4">Select Payment Method</h3>
                    <div className="space-y-4 mb-4">
                        <button
                            onClick={() => handlePaymentMethodChange('card')}
                            className="w-full bg-blue-300 text-white py-2 rounded-md hover:bg-blue-400"
                        >
                            Credit/Debit Card
                        </button>
                        <button
                            onClick={() => handlePaymentMethodChange('other')}
                            className="w-full bg-teal-300 text-white py-2 rounded-md hover:bg-teal-400"
                        >
                            Google Pay / Paytm / Other
                        </button>
                        <button
                            onClick={handleCashOnDelivery}
                            className="w-full bg-yellow-300 text-white py-2 rounded-md hover:bg-yellow-400"
                        >
                            Cash on Delivery
                        </button>
                    </div>

                    {showCardForm && (
                        <Elements stripe={stripePromise}>
                            <CardCheckoutForm total={isCouponApplied ? discountedTotal : total} onPaymentSuccess={addOrder} />
                        </Elements>
                    )}

                    {showOtherMethods && (
                        <div>
                            <input
                                type="text"
                                value={upiId}
                                onChange={(e) => setUpiId(e.target.value)}
                                placeholder="Enter UPI ID or Phone Number"
                                className="border p-2 rounded-md mb-4 w-full"
                            />
                            <button
                                onClick={handleOtherPayments}
                                className="w-full bg-lime-300 text-white py-2 rounded-md hover:bg-lime-400"
                            >
                                Pay Now
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
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
