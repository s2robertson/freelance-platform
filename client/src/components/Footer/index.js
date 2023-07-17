// import React from "react";

// export default function Footer() {
//   return (
//     <>

//     </>
//   )
// }

import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="container mx-auto flex justify-between">
        <div className="text-sm">
          <h3 className="font-bold">Freelance Platform</h3>
          <p className="mt-2">
            Connect with freelancers and get your projects done.
          </p>
        </div>
        <div className="text-sm">
          <h3 className="font-bold">Contact Us</h3>
          <p className="mt-2">123 Street, City</p>
          <p>Phone: 123-456-7890</p>
          <p>Email: info@freelanceplatform.com</p>
        </div>
        <div className="text-sm">
          <h3 className="font-bold">Follow Us</h3>
          <ul className="mt-2">
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                Github
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-300 hover:text-white">
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="text-sm text-center mt-6">
        &copy; {new Date().getFullYear()} Freelance Platform. All rights
        reserved.
      </div>
    </footer>
  );
};

export default Footer;