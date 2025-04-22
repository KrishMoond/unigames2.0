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

export default function LastViewed() {
  const { lastViewed, addToCart } = useCart();
  const navigate = useNavigate();

  // ✅ Handle Add to Cart Functionality
  const handleAddToCart = (game) => {
    addToCart(game);
    toast.success(`${game.title} added to cart!`);
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
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* ✅ Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-indigo-600">Last Viewed Games</h2>
        <button 
          onClick={handleNavigateHome}
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-indigo-700"
        >
          ⬅ Back to Home
        </button>
      </div>

      {/* ✅ Last Viewed Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lastViewed?.map(game => (
          <div 
            key={game.id} 
            className="border rounded-lg overflow-hidden shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            {/* ✅ Game Image */}
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              onError={handleImageError}
            />
            
            {/* ✅ Game Info */}
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              <p className="text-gray-600 mb-2">Price: ₹{game.price}</p>
              
              {/* ✅ Add to Cart Button */}
              <button
                onClick={() => handleAddToCart(game)}
                className="w-full bg-indigo-600 text-white py-2 rounded-lg transition-all duration-300 ease-in-out hover:bg-indigo-700 hover:scale-105"
              >
                🛒 Add to Cart
              </button>
            </div>
          </div>
        ))}

        {/* ✅ No Recent Games Found */}
        {lastViewed?.length === 0 && (
          <div className="text-center mt-10">
            <img 
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
