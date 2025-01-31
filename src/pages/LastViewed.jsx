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

import { useCart } from '../context/CartContext';

export default function LastViewed() {
  const { lastViewed, addToCart } = useCart();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Last Viewed Games</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lastViewed.map(game => (
          <div 
            key={game.id} 
            className="border rounded-lg overflow-hidden shadow-lg transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              <p className="text-gray-600 mb-4">${game.price}</p>
              <button
                onClick={() => addToCart(game)}
                className="w-full bg-blue-600 text-white py-2 rounded transition-all duration-300 ease-in-out hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
        
        {lastViewed.length === 0 && (
          <p className="text-gray-600">No recently viewed games</p>
        )}
      </div>
    </div>
  );
}
