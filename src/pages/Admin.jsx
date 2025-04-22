// import { useState, useEffect } from 'react';
// import toast from 'react-hot-toast';

// export default function Admin() {
//   const [activeSection, setActiveSection] = useState('viewProfile'); // 'viewProfile' or 'updateProfile'
//   const [activeTab, setActiveTab] = useState('coupons'); // 'coupons' or 'orders'
//   const [username, setUsername] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');
//   const [photo, setPhoto] = useState(null); // Holds the uploaded photo
//   const [address, setAddress] = useState({
//     street: '',
//     city: '',
//     state: '',
//     zip: '',
//   });
//   const [coupons, setCoupons] = useState([]);
//   const [newCoupon, setNewCoupon] = useState('');
//   const [orders, setOrders] = useState([]);

//   // Load data from localStorage
//   useEffect(() => {
//     try {
//       const savedUsername = localStorage.getItem('username');
//       const savedPhoneNumber = localStorage.getItem('phoneNumber');
//       const savedPhoto = localStorage.getItem('photo');
//       const savedAddress = localStorage.getItem('address');
//       const savedCoupons = JSON.parse(localStorage.getItem('coupons')) || [];
//       const savedOrders = JSON.parse(localStorage.getItem('orders')) || [];

//       if (savedUsername) setUsername(savedUsername);
//       if (savedPhoneNumber) setPhoneNumber(savedPhoneNumber);
//       if (savedPhoto) setPhoto(savedPhoto);
//       if (savedAddress) setAddress(JSON.parse(savedAddress));
//       setCoupons(savedCoupons);
//       setOrders(savedOrders);
//     } catch (error) {
//       console.error('Error loading data from localStorage', error);
//     }
//   }, []);

//   // Handle input and submit changes
//   const handleAddressChange = (e) => {
//     const { name, value } = e.target;
//     setAddress((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handlePhoneNumberChange = (e) => {
//     const newPhoneNumber = e.target.value;
//     setPhoneNumber(newPhoneNumber);
//     localStorage.setItem('phoneNumber', newPhoneNumber);
//   };

//   const handlePhotoChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onload = () => {
//         const base64String = reader.result;
//         setPhoto(base64String);
//         localStorage.setItem('photo', base64String);
//       };
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleUsernameSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem('username', username);
//     toast.success('Username updated successfully!');
//   };

//   const handleAddressSubmit = (e) => {
//     e.preventDefault();
//     localStorage.setItem('address', JSON.stringify(address));
//     toast.success('Address updated successfully!');
//   };

//   const handleAddCoupon = (e) => {
//     e.preventDefault();
//     if (newCoupon) {
//       const updatedCoupons = [...coupons, newCoupon];
//       setCoupons(updatedCoupons);
//       localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
//       setNewCoupon('');
//       toast.success('Coupon added successfully!');
//     } else {
//       toast.error('Please enter a coupon code.');
//     }
//   };

//   const handleRemoveCoupon = (couponToRemove) => {
//     const updatedCoupons = coupons.filter(coupon => coupon !== couponToRemove);
//     setCoupons(updatedCoupons);
//     localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
//     toast.success('Coupon removed successfully!');
//   };

//   const updateOrders = (newOrder) => {
//     const updatedOrders = [...orders, newOrder];
//     setOrders(updatedOrders);
//     localStorage.setItem('orders', JSON.stringify(updatedOrders));
//     toast.success('Order details updated successfully!');
//   };

//   return (
//     <div className="max-w-4xl mx-auto">
//       <h2 className="text-2xl font-bold mb-6">User Account Management</h2>

//       {/* Buttons to toggle between View and Update Profile */}
//       <div className="mb-6">
//         <button
//           className={`px-4 py-2 mr-4 ${activeSection === 'viewProfile' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//           onClick={() => setActiveSection('viewProfile')}
//         >
//           View Profile
//         </button>
//         <button
//           className={`px-4 py-2 ${activeSection === 'updateProfile' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//           onClick={() => setActiveSection('updateProfile')}
//         >
//           Update Profile
//         </button>
//       </div>

//       {/* Conditionally render View and Update Profile sections */}
//       {activeSection === 'viewProfile' && (
//         <>
//           <ProfileDetailsSection username={username} phoneNumber={phoneNumber} photo={photo} />
//         </>
//       )}
//       {activeSection === 'updateProfile' && (
//         <>
//           <UsernameUpdateSection 
//             username={username} 
//             setUsername={setUsername} 
//             onSubmit={handleUsernameSubmit} 
//           />
//           <AddressUpdateSection 
//             address={address} 
//             onAddressChange={handleAddressChange} 
//             onSubmit={handleAddressSubmit} 
//           />
//         </>
//       )}

//       {/* Independent Coupons and Orders sections */}
//       <div className="mb-6">
//         <button
//           className={`px-4 py-2 mr-4 ${activeTab === 'coupons' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//           onClick={() => setActiveTab('coupons')}
//         >
//           Manage Coupons
//         </button>
//         <button
//           className={`px-4 py-2 ${activeTab === 'orders' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
//           onClick={() => setActiveTab('orders')}
//         >
//           Your Orders
//         </button>
//       </div>

//       {/* Conditionally render Coupons and Orders sections */}
//       {activeTab === 'coupons' && (
//         <CouponsTab coupons={coupons} newCoupon={newCoupon} onAddCoupon={handleAddCoupon} onRemoveCoupon={handleRemoveCoupon} setNewCoupon={setNewCoupon} />
//       )}
//       {activeTab === 'orders' && (
//         <OrdersTab orders={orders} />
//       )}
//     </div>
//   );
// }

// // Profile Details Section
// const ProfileDetailsSection = ({ username, phoneNumber, photo }) => (
//   <div className="mb-6">
//     <h3 className="text-xl font-bold mb-4">Profile Details</h3>
//     <div className="mb-4">
//       <strong>Username:</strong> {username}
//     </div>
//     <div className="mb-4">
//       {/* <strong>Address:</strong> {address} */}
//     </div>
//     {/* <div className="mb-4">
//       <strong>Profile Photo:</strong> {photo ? <img src={photo} alt="Profile" className="mt-4 w-32 h-32 object-cover rounded-full" /> : 'No photo available'}
//     </div> */}
//   </div>
// );

// // Update Username Section
// const UsernameUpdateSection = ({ username, setUsername, onSubmit }) => (
//   <div>
//     <h3 className="text-xl font-bold mb-4">Update Username</h3>
//     <form onSubmit={onSubmit}>
//       <div className="mb-4">
//         <label className="block text-sm font-medium mb-1">New Username</label>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           className="w-full p-2 border rounded"
//         />
//       </div>
//       <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
//         Update Username
//       </button>
//     </form>
//   </div>
// );

// // Update Address Section
// const AddressUpdateSection = ({ address, onAddressChange, onSubmit }) => (
//   <div>
//     <h3 className="text-xl font-bold mb-4">Update Address</h3>
//     <form onSubmit={onSubmit}>
//       {['street', 'city', 'state', 'zip'].map((field) => (
//         <div className="mb-4" key={field}>
//           <label className="block text-sm font-medium mb-1 capitalize">{field}</label>
//           <input
//             type="text"
//             name={field}
//             value={address[field]}
//             onChange={onAddressChange}
//             className="w-full p-2 border rounded"
//             required
//           />
//         </div>
//       ))}
//       <button type="submit" className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
//         Save Address
//       </button>
//     </form>
//   </div>
// );

// const CouponsTab = ({ coupons, newCoupon, onAddCoupon, onRemoveCoupon, setNewCoupon }) => (
//   <div>
//     <h3 className="text-xl font-bold mb-4">Coupons</h3>
//     <form onSubmit={onAddCoupon} className="mb-6">
//       <input
//         type="text"
//         value={newCoupon}
//         onChange={(e) => setNewCoupon(e.target.value)}
//         className="w-full p-2 border rounded mb-2"
//         placeholder="Enter coupon code"
//       />
//       <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
//         Add Coupon
//       </button>
//     </form>
//     <ul>
//       {coupons.map((coupon, index) => (
//         <li key={index} className="flex justify-between mb-2">
//           <span>{coupon}</span>
//           <button
//             onClick={() => onRemoveCoupon(coupon)}
//             className="text-red-600 hover:text-red-800"
//           >
//             Remove
//           </button>
//         </li>
//       ))}
//     </ul>
//     <p>Apply these festive offers to save on your next purchase!</p>
//   </div>
// );

// const OrdersTab = ({ orders }) => (
//   <div>
//     <h3 className="text-xl font-bold mb-4">Your Orders</h3>
//     {orders.length > 0 ? (
//       <ul>
//         {orders.map((order, index) => (
//           <li key={index} className="mb-4 p-4 border rounded">
//             <h4 className="font-semibold">Order #{index + 1}</h4>
//             <p><strong>Items:</strong> {order.items.map(item => item.title).join(', ')}</p>
//             <p><strong>Total:</strong> ${order.total.toFixed(2)}</p>
//             <p><strong>Ordered on:</strong> {order.date}</p>
//             {order.address && (
//               <p><strong>Delivery Address:</strong> {`${order.address.street}, ${order.address.city}, ${order.address.state}, ${order.address.zip}`}</p>
//             )}
//           </li>
//         ))}
//       </ul>
//     ) : (
//       <p>You have no orders yet.</p>
//     )}
//   </div>
// );


import { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

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

  // ✅ Load data from localStorage
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

  // ✅ Handle Profile Photo Upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result);
        localStorage.setItem('photo', reader.result);
        toast.success('Profile photo updated!');
      };
      reader.readAsDataURL(file);
    }
  };

  // ✅ Handle Username Update
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('username', username);
    toast.success('Username updated successfully!');
  };

  // ✅ Handle Address Update
  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('address', JSON.stringify(address));
    toast.success('Address updated successfully!');
  };

  // ✅ Handle Add Coupon
  const handleAddCoupon = (e) => {
    e.preventDefault();
    if (newCoupon.trim() === '') {
      toast.error('Please enter a valid coupon code');
      return;
    }

    const updatedCoupons = [...coupons, newCoupon];
    setCoupons(updatedCoupons);
    localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
    setNewCoupon('');
    toast.success('Coupon added successfully!');
  };

  // ✅ Handle Remove Coupon
  const handleRemoveCoupon = (coupon) => {
    const updatedCoupons = coupons.filter(c => c !== coupon);
    setCoupons(updatedCoupons);
    localStorage.setItem('coupons', JSON.stringify(updatedCoupons));
    toast.success('Coupon removed!');
  };

  return (
    <div className="max-w-4xl mx-auto my-10 bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">🛠 Admin Panel</h2>

      {/* ✅ Tabs for Profile, Coupons, and Orders */}
      <div className="flex justify-center space-x-4 mb-6">
        {['viewProfile', 'updateProfile', 'coupons', 'orders'].map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab === 'viewProfile' && '👤 View Profile'}
            {tab === 'updateProfile' && '✍️ Update Profile'}
            {tab === 'coupons' && '🎉 Manage Coupons'}
            {tab === 'orders' && '📦 View Orders'}
          </button>
        ))}
      </div>

      {/* ✅ View Profile Section */}
      {activeTab === 'viewProfile' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">👤 Profile Details</h3>
          {photo ? (
            <img
              src={photo}
              alt="Profile"
              className="w-32 h-32 rounded-full mb-4 border border-gray-300 shadow-lg"
            />
          ) : (
            <p className="text-gray-500 mb-4">No profile photo uploaded</p>
          )}
          <p><strong>Username:</strong> {username || 'N/A'}</p>
          <p><strong>Address:</strong> {address.street}, {address.city}</p>
        </div>
      )}

      {/* ✅ Update Profile Section */}
      {activeTab === 'updateProfile' && (
        <form onSubmit={handleUsernameSubmit}>
          <h3 className="text-xl font-semibold mb-4">✍️ Update Profile</h3>
          <input
            type="text"
            className="border p-2 rounded w-full mb-4"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Update username"
          />
          <input
            type="file"
            className="border p-2 rounded w-full mb-4"
            onChange={handlePhotoChange}
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Save Changes
          </button>
        </form>
      )}

      {/* ✅ Manage Coupons Section */}
      {activeTab === 'coupons' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">🎉 Manage Coupons</h3>
          <form onSubmit={handleAddCoupon} className="flex gap-2 mb-4">
            <input
              type="text"
              className="border p-2 rounded flex-grow"
              value={newCoupon}
              onChange={(e) => setNewCoupon(e.target.value)}
              placeholder="Enter coupon code"
            />
            <button className="bg-green-600 text-white px-4 py-2 rounded">
              Add
            </button>
          </form>
          {coupons.map((coupon, index) => (
            <div key={index} className="flex justify-between mb-2 border-b pb-2">
              <span>{coupon}</span>
              <button
                className="text-red-500"
                onClick={() => handleRemoveCoupon(coupon)}
              >
                ❌ Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {/* ✅ View Orders Section */}
      {activeTab === 'orders' && (
        <div>
          <h3 className="text-xl font-semibold mb-4">📦 Your Orders</h3>
          {orders.length === 0 ? (
            <p>No orders found</p>
          ) : (
            orders.map((order, index) => (
              <div key={index} className="border p-3 mb-2">
                <p><strong>Order #{index + 1}</strong></p>
                <p>Items: {order.items.map(item => item.title).join(', ')}</p>
                <p>Total: ${order.total}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
