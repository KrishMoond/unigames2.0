import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import Lottie from 'lottie-react';
import loaderAnimation from '../assets/loader.json';

const games = [
  {
    id: 1,
    title: 'Red Dead Redemption 2',
    price: 59.99,
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Action',
    rating: 4.8,
    description: 'An epic tale of life in America\'s unforgiving heartland.'
  },
  {
    id: 2,
    title: 'Cyberpunk 2077',
    price: 49.99,
    image: 'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'RPG',
    rating: 4.2,
    description: 'An open-world, action-adventure story set in Night City.'
  },
  {
    id: 3,
    title: 'The Witcher 3',
    price: 39.99,
    image: 'https://images.pexels.com/photos/1174746/pexels-photo-1174746.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'RPG',
    rating: 4.9,
    description: 'A story-driven open world RPG set in a visually stunning fantasy universe.'
  },
  {
    id: 4,
    title: 'Call of Duty: Modern Warfare',
    price: 69.99,
    image: 'https://images.pexels.com/photos/3945313/pexels-photo-3945313.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'FPS',
    rating: 4.5,
    description: 'The stakes have never been higher as players take on the role of lethal Tier One operators.'
  },
  {
    id: 5,
    title: 'Minecraft',
    price: 26.95,
    image: 'https://images.pexels.com/photos/1174732/pexels-photo-1174732.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Sandbox',
    rating: 4.7,
    description: 'A game about placing blocks and going on adventures.'
  },
  {
    id: 6,
    title: 'FIFA 24',
    price: 59.99,
    image: 'https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=500',
    category: 'Sports',
    rating: 4.3,
    description: 'The world\'s game with HyperMotionV technology.'
  }
];

export default function Home() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredGame, setHoveredGame] = useState(null);

  const categories = ['All', 'Action', 'RPG', 'FPS', 'Sandbox', 'Sports'];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const filteredGames = games.filter(game => {
    const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-600 to-blue-500">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Lottie animationData={loaderAnimation} className="w-32 h-32 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white">Loading UniGames...</h2>
        </motion.div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50"
    >
      {/* Hero Section */}
      <motion.div
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="bg-gradient-to-r from-purple-600 via-blue-600 to-indigo-700 text-white py-20 px-4"
      >
        <div className="container mx-auto text-center">
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-5xl font-extrabold mb-4 bg-gradient-to-r from-yellow-300 to-pink-300 bg-clip-text text-transparent"
          >
            Welcome to UniGames
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-xl mb-8 text-gray-200"
          >
            Discover the best games at unbeatable prices
          </motion.p>
          
          {/* Search Bar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="max-w-md mx-auto"
          >
            <input
              type="text"
              placeholder="Search for games..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-6 py-3 rounded-full text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300"
            />
          </motion.div>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12">
        {/* Category Filter */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-8"
        >
          <h3 className="text-2xl font-bold mb-4 text-gray-800">Browse by Category</h3>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-gray-100 shadow-md'
                }`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Games Grid */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {selectedCategory === 'All' ? 'All Games' : `${selectedCategory} Games`}
            <span className="text-sm font-normal text-gray-500 ml-2">
              ({filteredGames.length} games)
            </span>
          </h3>
          
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + searchTerm}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filteredGames.map((game, index) => (
                <motion.div
                  key={game.id}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onHoverStart={() => setHoveredGame(game.id)}
                  onHoverEnd={() => setHoveredGame(null)}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
                >
                  <div className="relative overflow-hidden">
                    <motion.img
                      src={game.image}
                      alt={game.title}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                      whileHover={{ scale: 1.1 }}
                    />
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredGame === game.id ? 1 : 0 }}
                      className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                    >
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => handleAddToCart(game)}
                        className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-6 py-3 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        🛒 Quick Add
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
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2 text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
                      {game.title}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                      {game.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-green-600">
                        ${game.price}
                      </span>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleAddToCart(game)}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-300"
                      >
                        Add to Cart
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredGames.length === 0 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🎮</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-2">No games found</h3>
              <p className="text-gray-500">Try adjusting your search or category filter</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}