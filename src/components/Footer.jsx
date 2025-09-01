// import React, { useRef } from 'react';
// import emailjs from '@emailjs/browser';

// export default function Footer() {
//   const form = useRef();

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Log the email address being sent for debugging
//     const userEmail = form.current.user_email.value;
//     console.log('Sending email to:', userEmail);

//     emailjs
//       .sendForm('service_0rzwzh9', 'template_qryp45a', form.current, 'fch85Utvj-AOmQ3PN') // Correctly use your public key
//       .then(
//         () => {
//           alert('Thanks for subscribing! A welcome email has been sent to your address.');
//           form.current.reset(); // Clear the form inputs
//         },
//         (error) => {
//           console.error('Failed to send email:', error); // Log the error
//           alert('There was a problem with your subscription. Please try again.');
//         }
//       );
//   };

//   return (
//     <footer className="bg-gray-800 text-white mt-auto">
//       <div className="container mx-auto px-4 py-8">
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
//           {/* Newsletter Section */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Subscribe to Our Newsletter</h3>
//             <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-2">
//               <input
//                 type="email"
//                 name="user_email" // This must match the name used in your EmailJS template
//                 placeholder="Enter your email"
//                 className="px-4 py-2 rounded flex-1 text-gray-800"
//                 required
//               />
//               <button
//                 type="submit"
//                 className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
//               >
//                 Subscribe
//               </button>
//             </form>
//           </div>

//           {/* Quick Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
//             <ul className="space-y-2">
//               <li><a href="#" className="hover:text-blue-400">About Us</a></li>
//               <li><a href="#" className="hover:text-blue-400">Privacy Policy</a></li>
//               <li><a href="#" className="hover:text-blue-400">Terms of Service</a></li>
//               <li><a href="#" className="hover:text-blue-400">Contact Us</a></li>
//             </ul>
//           </div>

//           {/* Social Links */}
//           <div>
//             <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
//             <div className="flex space-x-4">
//               <a href="#" className="hover:text-blue-400">Twitter</a>
//               <a href="#" className="hover:text-blue-400">Facebook</a>
//               <a href="https://www.instagram.com/uni__games/" className="hover:text-blue-400">Instagram</a>
//               <a href="#" className="hover:text-blue-400">Discord</a>
//             </div>
//           </div>
//         </div>

//         {/* Copyright */}
//         <div className="border-t border-gray-700 mt-8 pt-8 text-center">
//           <p>© {new Date().getFullYear()} UniGames. All rights reserved.</p>
//         </div>
//       </div>
//     </footer>
//   );
// }


import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { FaTwitter, FaFacebook, FaInstagram, FaDiscord, FaEnvelope, FaHeart } from 'react-icons/fa';

export default function Footer() {
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Log the email address being sent for debugging
    const userEmail = form.current.user_email.value;
    console.log('Sending email to:', userEmail);

    emailjs
      .sendForm('service_0rzwzh9', 'template_qryp45a', form.current, 'fch85Utvj-AOmQ3PN') // Correctly use your public key
      .then(
        () => {
          toast.success('Thanks for subscribing! A welcome email has been sent to your address.');
          form.current.reset(); // Clear the form inputs
        },
        (error) => {
          console.error('Failed to send email:', error); // Log the error
          toast.error('There was a problem with your subscription. Please try again.');
        }
      );
  };

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-700 text-white mt-auto relative overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-10 left-10 w-20 h-20 bg-yellow-400 rounded-full opacity-10"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 60, 0],
            rotate: [0, -180, -360]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-10 right-10 w-16 h-16 bg-pink-400 rounded-full opacity-10"
        />
      </div>

      <div className="container mx-auto px-4 py-12">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, staggerChildren: 0.2 }}
        >
          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center mb-4">
              <FaEnvelope className="text-yellow-300 mr-3 text-xl" />
              <h3 className="text-2xl font-semibold text-gray-100">Subscribe to Our Newsletter</h3>
            </div>
            <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <motion.input
                whileFocus={{ scale: 1.02 }}
                type="email"
                name="user_email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg text-gray-800 shadow-lg focus:outline-none focus:ring-4 focus:ring-yellow-300 transition-all duration-300"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-800 px-6 py-3 rounded-lg hover:shadow-xl transition-all duration-300 font-semibold"
              >
                Subscribe
              </motion.button>
            </form>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-3">
              <motion.li whileHover={{ x: 5 }}>
                <a href="#" className="text-gray-300 hover:text-yellow-300 transition duration-300 flex items-center">
                  <span className="mr-2">→</span> About Us
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="#" className="text-gray-300 hover:text-yellow-300 transition duration-300 flex items-center">
                  <span className="mr-2">→</span> Privacy Policy
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="#" className="text-gray-300 hover:text-yellow-300 transition duration-300 flex items-center">
                  <span className="mr-2">→</span> Terms of Service
                </a>
              </motion.li>
              <motion.li whileHover={{ x: 5 }}>
                <a href="#" className="text-gray-300 hover:text-yellow-300 transition duration-300 flex items-center">
                  <span className="mr-2">→</span> Contact Us
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-2xl font-semibold mb-4 text-gray-100">Follow Us</h3>
            <div className="flex space-x-6">
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, y: -3 }}
                className="text-gray-300 hover:text-blue-400 transition duration-300"
              >
                <FaTwitter className="text-2xl" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, y: -3 }}
                className="text-gray-300 hover:text-blue-600 transition duration-300"
              >
                <FaFacebook className="text-2xl" />
              </motion.a>
              <motion.a 
                href="https://www.instagram.com/uni__games/" 
                whileHover={{ scale: 1.2, y: -3 }}
                className="text-gray-300 hover:text-pink-400 transition duration-300"
              >
                <FaInstagram className="text-2xl" />
              </motion.a>
              <motion.a 
                href="#" 
                whileHover={{ scale: 1.2, y: -3 }}
                className="text-gray-300 hover:text-purple-400 transition duration-300"
              >
                <FaDiscord className="text-2xl" />
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Copyright */}
        <motion.div 
          className="border-t border-gray-700 mt-8 pt-6 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className="text-gray-200 text-sm flex items-center justify-center">
            © {new Date().getFullYear()} UniGames. Made with 
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="mx-1"
            >
              <FaHeart className="text-red-400" />
            </motion.span>
            All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  );
}
