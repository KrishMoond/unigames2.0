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
          alert('Thanks for subscribing! A welcome email has been sent to your address.');
          form.current.reset(); // Clear the form inputs
        },
        (error) => {
          console.error('Failed to send email:', error); // Log the error
          alert('There was a problem with your subscription. Please try again.');
        }
      );
  };

  return (
    <footer className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Newsletter Section */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-100">Subscribe to Our Newsletter</h3>
            <form ref={form} onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input
                type="email"
                name="user_email"
                placeholder="Enter your email"
                className="px-6 py-3 rounded-lg text-gray-800 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <button
                type="submit"
                className="bg-blue-800 px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-100">Quick Links</h3>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">About Us</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Terms of Service</a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Contact Us</a></li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h3 className="text-2xl font-semibold mb-4 text-gray-100">Follow Us</h3>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Twitter</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Facebook</a>
              <a href="https://www.instagram.com/uni__games/" className="text-gray-300 hover:text-blue-400 transition duration-200">Instagram</a>
              <a href="#" className="text-gray-300 hover:text-blue-400 transition duration-200">Discord</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-gray-200 text-sm">© {new Date().getFullYear()} UniGames. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
