import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { FaShoppingCart, FaHistory, FaUserCog } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const { cart } = useCart();
  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedAddress = localStorage.getItem('address');

    if (savedUsername) {
      setUsername(savedUsername);
    }
    
    if (savedAddress) {
      setAddress(JSON.parse(savedAddress));
    }
  }, []);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <img src="https://img.atom.com/story_images/visual_images/1631159128-UniGames1_SHDomain.jpg" alt="Logo" className="h-8 mr-2" />
            <Link to="/" className="text-xl font-bold">UniGames</Link>
          </div>
          
          {/* Align Deliver To, Username, and Address near UniGames */}
          <div className="flex flex-col items-start ml-4"> {/* Adjust margin for spacing */}
            <span>Deliver To:</span>
            {username && <span className="font-semibold">{username}</span>}
            {address && (
              <span>
                {address.street}, {address.city}, {address.state}, {address.zip}
              </span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="flex items-center">
              <FaShoppingCart className="mr-1" />
              Cart ({cart.length})
            </Link>
            <Link to="/last-viewed" className="flex items-center">
              <FaHistory className="mr-1" />
              Last Viewed
            </Link>
            <Link to="/admin" className="flex items-center">
              <FaUserCog className="mr-1" />
              Account
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
