// import { Link } from 'react-router-dom';
// import { useCart } from '../context/CartContext';
// import { FaShoppingCart, FaHistory, FaUserCog } from 'react-icons/fa';
// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import LastViewed from '../pages/last-viewed';
// export default function Navbar() {
//   const { cart } = useCart();
//   const [username, setUsername] = useState('');
//   const [address, setAddress] = useState('');

//   useEffect(() => {
//     const savedUsername = localStorage.getItem('username');
//     const savedAddress = localStorage.getItem('address');

//     if (savedUsername) setUsername(savedUsername);
//     if (savedAddress) setAddress(JSON.parse(savedAddress));
//   }, []);

//   return (
//     <motion.nav initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.5 }} className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-xl sticky top-0 z-50">
//       <div className="container mx-auto px-4">
//         <div className="flex items-center justify-between h-20">
//           <div className="flex items-center space-x-4">
//             <motion.img src="https://img.atom.com/story_images/visual_images/1631159128-UniGames1_SHDomain.jpg" alt="Logo" className="h-12 w-12 rounded-full shadow-lg" whileHover={{ scale: 1.1 }} />
//             <Link to="/" className="text-3xl font-extrabold tracking-wide hover:text-yellow-300 transition duration-300">UniGames</Link>
//             <div className="flex flex-col ml-6">
//               <span className="text-sm text-yellow-200">Deliver To:</span>
//               {username && <span className="font-semibold text-lg">{username}</span>}
//               {address && (
//                 <span className="text-sm text-gray-100">
//                   {address.street}, {address.city}, {address.state}, {address.zip}
//                 </span>
//               )}
//             </div>
//           </div>

//           <div className="flex items-center space-x-6 text-lg">
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Link to="/cart" className="flex items-center bg-yellow-300 text-gray-800 px-4 py-2 rounded-full hover:bg-yellow-500 transition shadow-lg">
//                 <FaShoppingCart className="mr-2" />
//                 Cart <span className="ml-1 bg-white text-yellow-600 px-2 py-0.5 rounded-full text-sm">{cart.length}</span>
//               </Link>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Link to="/LastViewed" className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition shadow-lg">
//                 <FaHistory className="mr-2" />
//                 Last Viewed
//               </Link>
//             </motion.div>
//             <motion.div whileHover={{ scale: 1.05 }}>
//               <Link to="/admin" className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition shadow-lg">
//                 <FaUserCog className="mr-2" />
//                 Account
//               </Link>
//             </motion.div>
//           </div>
//         </div>
//       </div>
//     </motion.nav>
//   );
// }

import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { FaShoppingCart, FaHistory, FaUserCog } from "react-icons/fa";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Navbar() {
  const { cart } = useCart();
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    const savedAddress = localStorage.getItem("address");

    if (savedUsername) setUsername(savedUsername);
    if (savedAddress) {
      try {
        setAddress(JSON.parse(savedAddress));
      } catch (error) {
        console.error("Error parsing address:", error);
      }
    }
  }, []);

  return (
    <motion.nav
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-purple-600 to-blue-500 text-white shadow-xl sticky top-0 z-50"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Left Section: Logo & Address */}
          <div className="flex items-center space-x-4">
            <motion.img
              src="https://img.atom.com/story_images/visual_images/1631159128-UniGames1_SHDomain.jpg"
              alt="Logo"
              className="h-12 w-12 rounded-full shadow-lg"
              whileHover={{ scale: 1.1 }}
            />
            <Link
              to="/"
              className="text-3xl font-extrabold tracking-wide hover:text-yellow-300 transition duration-300"
            >
              UniGames
            </Link>
            <div className="flex flex-col ml-6">
              <span className="text-sm text-yellow-200">Deliver To:</span>
              {username && <span className="font-semibold text-lg">{username}</span>}
              {address && (
                <span className="text-sm text-gray-100">
                  {address.street}, {address.city}, {address.state}, {address.zip}
                </span>
              )}
            </div>
          </div>

          {/* Right Section: Cart, Last Viewed, Account */}
          <div className="flex items-center space-x-6 text-lg">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/cart"
                className="flex items-center bg-yellow-300 text-gray-800 px-4 py-2 rounded-full hover:bg-yellow-500 transition shadow-lg"
              >
                <FaShoppingCart className="mr-2" />
                Cart{" "}
                <span className="ml-1 bg-white text-yellow-600 px-2 py-0.5 rounded-full text-sm">
                  {cart?.length ?? 0}
                </span>
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/last-viewed"
                className="flex items-center bg-blue-400 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition shadow-lg"
              >
                <FaHistory className="mr-2" />
                Last Viewed
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                to="/admin"
                className="flex items-center bg-purple-500 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition shadow-lg"
              >
                <FaUserCog className="mr-2" />
                Account
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
