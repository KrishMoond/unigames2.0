// import { useState } from 'react';
// import { useCart } from '../context/CartContext';
// import toast from 'react-hot-toast';


// const GAMES = [
//   { id: 1, title: 'MINECRAFT', price: 59.99, image: 'https://m.media-amazon.com/images/I/71Wz+sDS-AL.AC_UF894,1000_QL80.jpg' },
//   { id: 2, title: 'GTA V', price: 49.99, image: 'https://rukminim2.flixcart.com/image/850/1000/kz4gh3k0/poster/g/9/s/medium-gta-v-video-game-matte-finish-poster-posterpoint6139-original-imagb785ygpv6sbb.jpeg?q=90&crop=false' },
//   { id: 3, title: 'SPIDER MAN', price: 39.99, image: 'https://rukminim2.flixcart.com/image/750/900/kb89ea80/physical-game/6/3/z/spider-man-game-spider-man-shatterd-dimensions-action-adventure-original-imafsmsyrvnjadku.jpeg?q=20&crop=false' },
//   { id: 4, title: 'THE LAST OF US', price: 44.99, image: 'https://rockvillerampage.com/wp-content/uploads/2023/03/The-Last-of-Us-Graphic_Picture.jpg' },
//   { id: 5, title: 'GOD OF WAR', price: 44.99, image: 'https://m.media-amazon.com/images/I/71rONQfsVnL.AC_UF1000,1000_QL80.jpg' },
//   { id: 6, title: 'HORIZON', price: 44.99, image: 'https://m.media-amazon.com/images/I/71NCZD+7EHL.AC_UF894,1000_QL80.jpg' },
//   { id: 7, title: 'THE PATHLESS', price: 44.99, image: 'https://i.ytimg.com/vi/p8roBoKS98M/sddefault.jpg' },
//   { id: 8, title: 'UNCHARTED', price: 44.99, image: 'https://images.gog-statics.com/294b4e04dc1be317d3f7ad22712097340e25a4ab6fc69c93b267b8676c3f72d6.jpg' },
//   { id: 9, title: 'FC25', price: 44.99, image: 'https://assets.goal.com/images/v3/blt9cfd4b53d0d66186/GOAL%20-%20Multiple%20Images%20-%203%20Stacked%20-%20Facebook%20(92).jpg?auto=webp&format=pjpg&width=3840&quality=60' },
//   { id: 10, title: 'ALAN WAKE II', price: 44.99, image: 'https://i.ytimg.com/vi/Zv4g044SP7s/maxresdefault.jpg' },
//   { id: 11, title: 'ASSASSINS OF SHADOW', price: 44.99, image: 'https://i.ytimg.com/vi/hB6obB-aZzY/maxresdefault.jpg' },
//   { id: 12, title: 'SPACE MARINE', price: 44.99, image: 'https://i.ytimg.com/vi/buHTy_FAxIo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDnlbNNQDGqBATatxXBPr7CD2Naqw' },
//   { id: 13, title: '2K25', price: 44.99, image: 'https://149367133.v2.pressablecdn.com/wp-content/uploads/2024/08/nba-2k25-gameplay-improvements-courtside-report-defense-system-proplay-20240802-gadgetmatch.jpg' },
//   { id: 14, title: 'BANISHERS', price: 44.99, image: 'https://i.ytimg.com/vi/IaB0MyubRg0/maxresdefault.jpg' },
//   { id: 15, title: 'DARGON QUEST III', price: 44.99, image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/06/new-dragon-quest-remakes-announced-4-1-2.jpg' },
//   { id: 16, title: 'PERSONA 5 TACTICA', price: 44.99, image: 'https://target.scene7.com/is/image/Target/GUEST_ef381e93-80a9-4a87-9fd9-6e22fdca4923?wid=488&hei=488&fmt=pjpeg' },
//     { id: 17, title: 'Red Dead Redemption 2', price: 59.99, image: 'https://c4.wallpaperflare.com/wallpaper/740/918/401/digital-art-artwork-red-dead-redemption-red-dead-redemption-2-arthur-morgan-hd-wallpaper-preview.jpg'
//   },
//   { id: 18, title: 'Cyber Punk 2077', price: 59.99, image: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Cyberpunk_2077_logo.svg'
//   },
   
//   { id: 19, title: 'Valorant', price: 39.99, image: 'https://4kwallpapers.com/images/wallpapers/valorant-pc-games-2020-games-3840x1080-1267.jpg' },
//   { id: 20, title: 'Froza Horizon 5', price: 44.99, image:  'https://s1.cdn.autoevolution.com/images/news/forza-horizon-5-hot-wheels-review-pc-one-of-the-best-slices-of-forza-horizon-194339_1.jpg'}
// ];

// export default function Home() {
//   const { addToCart, addToLastViewed } = useCart();
//   const [searchTerm, setSearchTerm] = useState('');

//   const filteredGames = GAMES.filter(game =>
//     game.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   const handleGameClick = (game) => {
//     addToLastViewed(game);
//   };

//   const handleAddToCart = (game) => {
//     addToCart(game);
//     toast.success(`${game.title} added to cart!`);
//   };

//   return (
//     <div>
//       <div className="mb-8">
//         <input
//           type="text"
//           placeholder="Search games..."
//           className="w-full p-2 border rounded"
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredGames.map(game => (
//           <div key={game.id} className="border rounded-lg overflow-hidden shadow-lg">
//             <img
//               src={game.image}
//               alt={game.title}
//               className="w-full h-48 object-cover cursor-pointer"
//               onClick={() => handleGameClick(game)}
//             />
//             <div className="p-4">
//               <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
//               <p className="text-gray-600 mb-4">${game.price}</p>
//               <button
//                 onClick={() => handleAddToCart(game)}
//                 className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
//               >
//                 Add to Cart
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

import { useState } from 'react';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';

const GAMES = [
  { id: 1, title: 'MINECRAFT', price: 59.99, image: 'https://m.media-amazon.com/images/I/71Wz+sDS-AL.AC_UF894,1000_QL80.jpg' },
  { id: 2, title: 'GTA V', price: 49.99, image: 'https://rukminim2.flixcart.com/image/850/1000/kz4gh3k0/poster/g/9/s/medium-gta-v-video-game-matte-finish-poster-posterpoint6139-original-imagb785ygpv6sbb.jpeg?q=90&crop=false' },
  { id: 3, title: 'SPIDER MAN', price: 39.99, image: 'https://rukminim2.flixcart.com/image/750/900/kb89ea80/physical-game/6/3/z/spider-man-game-spider-man-shatterd-dimensions-action-adventure-original-imafsmsyrvnjadku.jpeg?q=20&crop=false' },
  { id: 4, title: 'THE LAST OF US', price: 44.99, image: 'https://rockvillerampage.com/wp-content/uploads/2023/03/The-Last-of-Us-Graphic_Picture.jpg' },
  { id: 5, title: 'GOD OF WAR', price: 44.99, image: 'https://m.media-amazon.com/images/I/71rONQfsVnL.AC_UF1000,1000_QL80.jpg' },
  { id: 6, title: 'HORIZON', price: 44.99, image: 'https://m.media-amazon.com/images/I/71NCZD+7EHL.AC_UF894,1000_QL80.jpg' },
  { id: 7, title: 'THE PATHLESS', price: 44.99, image: 'https://i.ytimg.com/vi/p8roBoKS98M/sddefault.jpg' },
  { id: 8, title: 'UNCHARTED', price: 44.99, image: 'https://images.gog-statics.com/294b4e04dc1be317d3f7ad22712097340e25a4ab6fc69c93b267b8676c3f72d6.jpg' },
  { id: 9, title: 'FC25', price: 44.99, image: 'https://assets.goal.com/images/v3/blt9cfd4b53d0d66186/GOAL%20-%20Multiple%20Images%20-%203%20Stacked%20-%20Facebook%20(92).jpg?auto=webp&format=pjpg&width=3840&quality=60' },
  { id: 10, title: 'ALAN WAKE II', price: 44.99, image: 'https://i.ytimg.com/vi/Zv4g044SP7s/maxresdefault.jpg' },
  { id: 11, title: 'ASSASSINS OF SHADOW', price: 44.99, image: 'https://i.ytimg.com/vi/hB6obB-aZzY/maxresdefault.jpg' },
  { id: 12, title: 'SPACE MARINE', price: 44.99, image: 'https://i.ytimg.com/vi/buHTy_FAxIo/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDnlbNNQDGqBATatxXBPr7CD2Naqw' },
  { id: 13, title: '2K25', price: 44.99, image: 'https://149367133.v2.pressablecdn.com/wp-content/uploads/2024/08/nba-2k25-gameplay-improvements-courtside-report-defense-system-proplay-20240802-gadgetmatch.jpg' },
  { id: 14, title: 'BANISHERS', price: 44.99, image: 'https://i.ytimg.com/vi/IaB0MyubRg0/maxresdefault.jpg' },
  { id: 15, title: 'DARGON QUEST III', price: 44.99, image: 'https://static0.gamerantimages.com/wordpress/wp-content/uploads/2024/06/new-dragon-quest-remakes-announced-4-1-2.jpg' },
  { id: 16, title: 'PERSONA 5 TACTICA', price: 44.99, image: 'https://target.scene7.com/is/image/Target/GUEST_ef381e93-80a9-4a87-9fd9-6e22fdca4923?wid=488&hei=488&fmt=pjpeg' },
    { id: 17, title: 'Red Dead Redemption 2', price: 59.99, image: 'https://c4.wallpaperflare.com/wallpaper/740/918/401/digital-art-artwork-red-dead-redemption-red-dead-redemption-2-arthur-morgan-hd-wallpaper-preview.jpg'
  },
  { id: 18, title: 'Cyber Punk 2077', price: 59.99, image: 'https://upload.wikimedia.org/wikipedia/commons/e/e6/Cyberpunk_2077_logo.svg'
  },
   
  { id: 19, title: 'Valorant', price: 39.99, image: 'https://4kwallpapers.com/images/wallpapers/valorant-pc-games-2020-games-3840x1080-1267.jpg' },
  { id: 20, title: 'Froza Horizon 5', price: 44.99, image:  'https://s1.cdn.autoevolution.com/images/news/forza-horizon-5-hot-wheels-review-pc-one-of-the-best-slices-of-forza-horizon-194339_1.jpg'}

];

export default function Home() {
  const { addToCart, addToLastViewed } = useCart();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredGames = GAMES.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleGameClick = (game) => {
    addToLastViewed(game);
  };

  const handleAddToCart = (game) => {
    addToCart(game);
    toast.success(`${game.title} added to cart!`);
  };

  return (
    <div>
      <div className="mb-8">
        <input
          type="text"
          placeholder="Search games..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGames.map(game => (
          <div
            key={game.id}
            className="border rounded-lg overflow-hidden shadow-lg transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-2xl cursor-pointer"
          >
            <img
              src={game.image}
              alt={game.title}
              className="w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110"
              onClick={() => handleGameClick(game)}
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{game.title}</h3>
              <p className="text-gray-600 mb-4">Rs.{game.price}</p>
              <button
                onClick={() => handleAddToCart(game)}
                className="w-full bg-blue-600 text-white py-2 rounded transition-transform duration-300 ease-in-out hover:bg-blue-700 hover:scale-105"
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
