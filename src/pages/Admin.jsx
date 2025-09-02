import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import toast from 'react-hot-toast';
import { 
  FaUser, 
  FaEdit, 
  FaTicketAlt, 
  FaShoppingBag, 
  FaCamera, 
  FaMapMarkerAlt,
  FaTrash,
  FaPlus,
  FaSave,
  FaEye
} from 'react-icons/fa';

export default function Admin() {
  const [activeTab, setActiveTab] = useState('viewProfile');
  const [username, setUsername] = useState('');
  const [photo, setPhoto] = useState(null);
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const [coupons, setCoupons] = useState([]);
  const [newCoupon, setNewCoupon] = useState('');
  const [orders, setOrders] = useState([]);

  // Load data from localStorage
  useEffect(() => {
    const savedUsername = localStorage.getItem('username');
    const savedPhoto = localStorage.getItem('photo');
    const savedAddress = localStorage.getItem('address');
    const savedCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
    const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];

    if (savedUsername) setUsername(savedUsername);
    if (savedPhoto) setPhoto(savedPhoto);
    if (savedAddress) setAddress(JSON.parse(savedAddress));
    setCoupons(savedCoupons);
    setOrders(savedOrders);
  }, []);

  // Handle Profile Photo Upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
        localStorage.setItem('photo', reader.result);
        toast.success('📸 Profile photo updated!', {
          style: {
            borderRadius: '10px',
            background: '#10B981',
            color: '#fff',
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle Username Update
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Please enter a valid username');
      return;
    }
    localStorage.setItem('username', username);
    toast.success('✅ Username updated successfully!');
  };

  // Handle Address Update
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    const requiredFields = ['street', 'city', 'state', 'zip'];
    const missingFields = requiredFields.filter(field => !address[field].trim());
    
    if (missingFields.length > 0) {
      toast.error(`Please fill in: ${missingFields.join(', ')}`);
      return;
    }
    
    localStorage.setItem('address', JSON.stringify(address));
    toast.success('🏠 Address updated successfully!');
  };

  // Handle Add Coupon
  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (newCoupon.trim() === '') {
      toast.error('Please enter a valid coupon code');
      return;
    }

    if (coupons.includes(newCoupon)) {
      toast.error('This coupon already exists');
      return;
    }

    const updatedCoupons = [...coupons, newCoupon];
    setCoupons(updatedCoupons);
    localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
    setNewCoupon('');
    toast.success('🎫 Coupon added successfully!');
  };

  // Handle Remove Coupon
  const handleRemoveCoupon = (coupon) => {
    const updatedCoupons = coupons.filter(c => c !== coupon);
    setCoupons(updatedCoupons);
    localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
    toast.success('🗑️ Coupon removed!');
  };

  const tabs = [
    { id: 'viewProfile', label: 'View Profile', icon: FaEye },
    { id: 'updateProfile', label: 'Update Profile', icon: FaEdit },
    { id: 'coupons', label: 'Manage Coupons', icon: FaTicketAlt },
    { id: 'orders', label: 'Your Orders', icon: FaShoppingBag }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12"
    >
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            🛠️ Admin Dashboard
          </h2>
          <p className="text-gray-600 text-lg">
            Manage your profile, coupons, and view your order history
          </p>
        </motion.div>

        {/* Tab Navigation */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-8"
        >
          {tabs.map((tab) => {
            const IconComponent = tab.icon;
            return (
              <motion.button
                key={tab.id}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl'
                    : 'bg-white text-gray-700 hover:bg-gray-100'
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent className="mr-2" />
                {tab.label}
              </motion.button>
            );
          })}
        </motion.div>

        {/* Tab Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="bg-white rounded-2xl shadow-xl p-8"
          >
            {/* View Profile */}
            {activeTab === 'viewProfile' && (
              <div>
                <div className="flex items-center mb-6">
                  <FaUser className="text-purple-600 text-2xl mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Profile Overview</h3>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    className="text-center"
                  >
                    {photo ? (
                      <motion.img
                        whileHover={{ scale: 1.1 }}
                        src={photo}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-purple-200 shadow-lg object-cover"
                      />
                    ) : (
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-gray-200 shadow-lg bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center"
                      >
                        <FaUser className="text-4xl text-gray-400" />
                      </motion.div>
                    )}
                    <p className="text-gray-500">Profile Photo</p>
                  </motion.div>
                  
                  <div className="space-y-4">
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <p className="text-sm text-gray-500 mb-1">Username</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {username || 'Not set'}
                      </p>
                    </motion.div>
                    
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="p-4 bg-gray-50 rounded-lg"
                    >
                      <p className="text-sm text-gray-500 mb-1">Address</p>
                      <p className="text-lg font-semibold text-gray-800">
                        {address.street ? 
                          `${address.street}, ${address.city}, ${address.state} ${address.zip}` : 
                          'Not set'
                        }
                      </p>
                    </motion.div>
                  </div>
                </div>
              </div>
            )}

            {/* Update Profile */}
            {activeTab === 'updateProfile' && (
              <div className="space-y-8">
                <div className="flex items-center mb-6">
                  <FaEdit className="text-purple-600 text-2xl mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Update Profile</h3>
                </div>

                {/* Photo Upload */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="text-center p-6 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-400 transition-colors duration-300"
                >
                  <div className="relative inline-block">
                    {photo ? (
                      <img
                        src={photo}
                        alt="Profile"
                        className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                      />
                    ) : (
                      <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
                        <FaCamera className="text-2xl text-gray-400" />
                      </div>
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    />
                  </div>
                  <p className="text-gray-600">Click to upload profile photo</p>
                </motion.div>

                {/* Username Form */}
                <motion.form
                  onSubmit={handleUsernameSubmit}
                  className="space-y-4"
                  whileHover={{ scale: 1.01 }}
                >
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <FaUser className="inline mr-2" />
                      Username
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-all duration-300"
                      placeholder="Enter your username"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                  >
                    <FaSave className="mr-2" />
                    Save Username
                  </motion.button>
                </motion.form>

                {/* Address Form */}
                <motion.form
                  onSubmit={handleAddressSubmit}
                  className="space-y-4"
                  whileHover={{ scale: 1.01 }}
                >
                  <div className="flex items-center mb-4">
                    <FaMapMarkerAlt className="text-purple-600 text-xl mr-2" />
                    <h4 className="text-xl font-semibold text-gray-800">Address Information</h4>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    {[
                      { field: 'street', label: 'Street Address', placeholder: 'Enter street address' },
                      { field: 'city', label: 'City', placeholder: 'Enter city' },
                      { field: 'state', label: 'State', placeholder: 'Enter state' },
                      { field: 'zip', label: 'ZIP Code', placeholder: 'Enter ZIP code' }
                    ].map(({ field, label, placeholder }) => (
                      <div key={field}>
                        <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                          {label}
                        </label>
                        <motion.input
                          whileFocus={{ scale: 1.02 }}
                          type="text"
                          name={field}
                          value={address[field]}
                          onChange={handleAddressChange}
                          className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-all duration-300"
                          placeholder={placeholder}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                  >
                    <FaSave className="mr-2" />
                    Save Address
                  </motion.button>
                </motion.form>
              </div>
            )}

            {/* Manage Coupons */}
            {activeTab === 'coupons' && (
              <div>
                <div className="flex items-center mb-6">
                  <FaTicketAlt className="text-purple-600 text-2xl mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Manage Coupons</h3>
                </div>

                {/* Add Coupon Form */}
                <motion.form
                  onSubmit={handleAddCoupon}
                  className="flex gap-4 mb-8"
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    value={newCoupon}
                    onChange={(e) => setNewCoupon(e.target.value)}
                    className="flex-1 p-4 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none transition-all duration-300"
                    placeholder="Enter new coupon code (e.g., SAVE10)"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-6 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center"
                  >
                    <FaPlus className="mr-2" />
                    Add Coupon
                  </motion.button>
                </motion.form>

                {/* Coupons List */}
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">
                    Active Coupons ({coupons.length})
                  </h4>
                  
                  <AnimatePresence>
                    {coupons.length === 0 ? (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12"
                      >
                        <div className="text-6xl mb-4">🎫</div>
                        <h4 className="text-xl font-bold text-gray-700 mb-2">No coupons yet</h4>
                        <p className="text-gray-500">Add your first coupon to get started!</p>
                      </motion.div>
                    ) : (
                      coupons.map((coupon, index) => (
                        <motion.div
                          key={coupon}
                          initial={{ opacity: 0, x: -50 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 50 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, x: 5 }}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg shadow-md"
                        >
                          <div className="flex items-center">
                            <div className="w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center mr-4">
                              <FaTicketAlt className="text-white" />
                            </div>
                            <div>
                              <p className="font-bold text-gray-800 text-lg">{coupon}</p>
                              <p className="text-sm text-gray-600">10% discount coupon</p>
                            </div>
                          </div>
                          <motion.button
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRemoveCoupon(coupon)}
                            className="bg-red-500 text-white p-3 rounded-full hover:bg-red-600 transition-all duration-300 shadow-lg"
                          >
                            <FaTrash />
                          </motion.button>
                        </motion.div>
                      ))
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            {/* View Orders */}
            {activeTab === 'orders' && (
              <div>
                <div className="flex items-center mb-6">
                  <FaShoppingBag className="text-purple-600 text-2xl mr-3" />
                  <h3 className="text-2xl font-bold text-gray-800">Order History</h3>
                </div>

                <AnimatePresence>
                  {orders.length === 0 ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <div className="text-6xl mb-4">📦</div>
                      <h4 className="text-2xl font-bold text-gray-700 mb-2">No orders yet</h4>
                      <p className="text-gray-500 mb-6">Start shopping to see your orders here!</p>
                      <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => window.location.href = '/'}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                      >
                        🛒 Start Shopping
                      </motion.button>
                    </motion.div>
                  ) : (
                    <div className="space-y-6">
                      <p className="text-gray-600 mb-4">
                        You have {orders.length} order{orders.length !== 1 ? 's' : ''}
                      </p>
                      
                      {orders.map((order, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="p-6 border border-gray-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-r from-blue-50 to-purple-50"
                        >
                          <div className="flex items-center justify-between mb-4">
                            <h4 className="text-xl font-bold text-gray-800">
                              Order #{index + 1}
                            </h4>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                              Completed
                            </span>
                          </div>
                          
                          <div className="grid md:grid-cols-2 gap-6">
                            <div>
                              <p className="text-sm text-gray-500 mb-2">Items Ordered</p>
                              <div className="space-y-2">
                                {order.items.map((item, itemIndex) => (
                                  <motion.div
                                    key={itemIndex}
                                    whileHover={{ x: 5 }}
                                    className="flex items-center p-2 bg-white rounded-lg"
                                  >
                                    <img 
                                      src={item.image} 
                                      alt={item.title}
                                      className="w-12 h-12 object-cover rounded mr-3"
                                    />
                                    <div>
                                      <p className="font-medium text-gray-800">{item.title}</p>
                                      <p className="text-sm text-gray-600">${item.price}</p>
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </div>
                            
                            <div className="space-y-3">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Total Amount:</span>
                                <span className="font-bold text-green-600 text-lg">
                                  ${order.total.toFixed(2)}
                                </span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Order Date:</span>
                                <span className="font-medium text-gray-800">{order.date}</span>
                              </div>
                              {order.address && (
                                <div>
                                  <p className="text-gray-600 mb-1">Delivery Address:</p>
                                  <p className="text-sm text-gray-800 bg-white p-2 rounded">
                                    {`${order.address.street}, ${order.address.city}, ${order.address.state} ${order.address.zip}`}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}