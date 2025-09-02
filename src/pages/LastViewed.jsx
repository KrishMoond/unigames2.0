import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { FaEye, FaShoppingCart, FaClock, FaGamepad } from 'react-icons/fa';

export default function LastViewed() {
  const { lastViewed, addToCart } = useCart();

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12"
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <FaClock className="text-4xl text-purple-600 mr-3" />
            <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              Recently Viewed Games
            </h2>
          </div>
          <p className="text-gray-600 text-lg">
            Pick up where you left off and continue exploring
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {lastViewed.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center py-20"
            >
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 5, -5, 0]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="text-8xl mb-6"
              >
                👀
              </motion.div>
              <h3 className="text-3xl font-bold text-gray-700 mb-4">
                No games viewed yet
              </h3>
              <p className="text-gray-500 mb-8 text-lg">
                Start browsing games to see your viewing history here
              </p>
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => window.location.href = '/'}
                className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-full font-semibold text-lg shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <FaGamepad className="inline mr-2" />
                Explore Games
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="mb-6 text-center">
                <span className="bg-gradient-to-r from-purple-100 to-blue-100 text-purple-800 px-4 py-2 rounded-full font-medium">
                  {lastViewed.length} game{lastViewed.length !== 1 ? 's' : ''} viewed recently
                </span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {lastViewed.map((game, index) => (
                  <motion.div
                    key={game.id}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.1,
                      type: "spring",
                      stiffness: 100
                    }}
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={game.image}
                        alt={game.title}
                        className="w-full h-64 object-cover transition-transform duration-500"
                        whileHover={{ scale: 1.1 }}
                      />
                      
                      {/* Overlay on hover */}
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end justify-center p-6"
                      >
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleAddToCart(game)}
                          className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                        >
                          <FaShoppingCart className="mr-2" />
                          Quick Add
                        </motion.button>
                      </motion.div>
                      
                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {game.category}
                        </span>
                      </div>
                      
                      {/* Rating Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-yellow-400 text-gray-800 px-2 py-1 rounded-full text-sm font-bold">
                          ⭐ {game.rating}
                        </span>
                      </div>
                      
                      {/* Recently Viewed Badge */}
                      <div className="absolute bottom-4 left-4">
                        <motion.span
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center"
                        >
                          <FaEye className="mr-1" />
                          Recently Viewed
                        </motion.span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <motion.h3
                        whileHover={{ scale: 1.02 }}
                        className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300"
                      >
                        {game.title}
                      </motion.h3>
                      <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                        {game.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <motion.span
                          whileHover={{ scale: 1.1 }}
                          className="text-2xl font-bold text-green-600"
                        >
                          ${game.price}
                        </motion.span>
                        <motion.button
                          whileHover={{ scale: 1.05, x: 5 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(game)}
                          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300 flex items-center"
                        >
                          <FaShoppingCart className="mr-2" />
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              
              {/* Clear History Button */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-center mt-12"
              >
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    localStorage.removeItem('lastViewed');
                    window.location.reload();
                  }}
                  className="bg-gradient-to-r from-red-500 to-pink-500 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  🗑️ Clear Viewing History
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}