// import { useCart } from '../context/CartContext';

// export default function LastViewed() {
//   const { lastViewed, addToCart } = useCart();

//   return (
//     <div>
//       <h2 className="text-2xl font-bold mb-6">Last Viewed Games</h2>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {lastViewed.map(game => (
//           <div key={game.id} className="border rounded-lg overflow-hidden shadow-lg">
//             <img
//               src={game.image}
//               alt={game.title}
//               className="w-full h-48 object-cover"
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
//               <p className="text-gray-600 mb-4">${game.price}</p>
//               <button
//                 onClick={() => addToCart(game)}
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
        
//         {lastViewed.length === 0 && (
//           <p className="text-gray-600">No recently viewed games</p>
//         )}
//       </div>
//     </div>
//   );
// }

// // import { useCart } from '../context/CartContext';

// // export default function LastViewed() {
// //   const { lastViewed, addToCart } = useCart();

// //   return (
// //     <div>
// //       <h2 className="text-2xl font-bold mb-6">Last Viewed Games</h2>
      
// //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
// //         {lastViewed.map(game => (
// //           <div 
// //             key={game.id} 
// //             className="border rounded-lg overflow-hidden shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
// //           >
// //             <img
// //               src={game.image}
// //               alt={game.title}
// //               className="w-full h-48 object-cover"
// //             />
// //             <div className="p-4">
// //               <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
// //               <p className="text-gray-600 mb-4">${game.price}</p>
// //               <button
// //                 onClick={() => addToCart(game)}
// //                 className="w-full bg-blue-600 text-white py-2 rounded transition-all duration-300 ease-in-out hover:bg-blue-700"
// //               >
// //                 Add to Cart
// //               </button>
// //             </div>
// //           </div>
// //         ))}
        
// //         {lastViewed.length === 0 && (
// //           <p className="text-gray-600">No recently viewed games</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // }

import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaArrowLeft, FaShoppingCart, FaEye } from 'react-icons/fa';

export default function LastViewed() {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [lastViewed, setLastViewed] = useState([]);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('lastViewed')) || [];
    setLastViewed(saved);
  }, []);
  // ✅ Handle Add to Cart Functionality
  const handleAddToCart = (game) => {
    addToCart(game);
    toast.success(`${game.title} added to cart!`, {
      icon: '🎮',
      style: {
        borderRadius: '10px',
        background: '#333',
        color: '#fff',
      },
    });
  };

  // ✅ Handle Image Error (Fallback Image)
  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300';
  };

  // ✅ Handle Navigate to Home
  const handleNavigateHome = () => {
    navigate('/');
  };

  return (
    <motion.div 
      className="p-6 bg-gradient-to-br from-gray-50 to-blue-50 min-h-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* ✅ Header */}
      <motion.div 
        className="flex justify-between items-center mb-8"
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center">
          <FaEye className="text-indigo-600 mr-3 text-2xl" />
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Recently Viewed Games
          </h2>
        </div>
        <motion.button 
          whileHover={{ scale: 1.05, x: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNavigateHome}
          className="flex items-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Back to Home
        </motion.button>
      </motion.div>

      {/* ✅ Last Viewed Games Grid */}
      <AnimatePresence>
        {lastViewed?.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, staggerChildren: 0.1 }}
          >
            {lastViewed.map((game, index) => (
              <motion.div
                key={game.id}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
            {/* ✅ Game Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={game.image}
                    alt={game.title}
                    className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <motion.div
                    className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                  >
                    <span className="text-sm font-semibold text-gray-700">Recently Viewed</span>
                  </motion.div>
                </div>
            
            {/* ✅ Game Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                    {game.title}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-green-600">
                      ${game.price}
                    </span>
                    {game.rating && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm font-semibold">
                        ⭐ {game.rating}
                      </span>
                    )}
                  </div>
              
              {/* ✅ Add to Cart Button */}
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                onClick={() => handleAddToCart(game)}
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                    <FaShoppingCart className="mr-2" />
                    Add to Cart
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (

        {/* ✅ No Recent Games Found */}
          <motion.div 
            className="text-center py-20"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-8xl mb-6"
            >
              👀
            </motion.div>
            <h3 className="text-3xl font-bold text-gray-700 mb-4">No Recently Viewed Games</h3>
            <p className="text-gray-500 text-lg mb-8">Start browsing to see your recently viewed games here!</p>
            <motion.button 
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleNavigateHome}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              🎮 Browse Games
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

              src="https://cdn.dribbble.com/users/1787323/screenshots/6823813/media/87c4ad3a7a41652c1b13f947d3c6a2c4.png"
              alt="No Recent Games"
              className="mx-auto w-64 mb-4"
            />
            <p className="text-gray-600 text-lg">You haven't viewed any games yet.</p>
            <button 
              onClick={handleNavigateHome}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300"
            >
              🎮 Browse Games
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
