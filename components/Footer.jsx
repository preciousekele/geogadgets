import React from "react";

const Footer = () => {
  return (
    <footer id="contact">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5 text-center md:text-left">
          <div className="logo text-2xl font-bold text-gray-900">
            <span className="text-yellow-800">G</span>EO GADGETS
          </div>
          <p className="mt-6 text-sm">
            11/Computer Village Oshitelu Street, Ikeja, Lagos State.
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-center">
          <div className="text-center md:text-left">
            <h2 className="font-medium text-gray-900 mb-5">Company</h2>
            <ul className="text-sm space-y-2">
              <li>
                <a className="hover:text-gray-800 transition" href="#">
                  Home
                </a>
              </li>
              <li>
                <a className="hover:text-gray-800 transition" href="#">
                  About us
                </a>
              </li>
              {/* <li>
                <a className="hover:text-gray-800 transition" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:text-gray-800 transition" href="#">
                  Privacy policy
                </a>
              </li> */}
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-center">
          <div className="text-center md:text-left">
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+234-8101-567-8990</p>
              <p>gideonekele08@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-gray-300 text-xs md:text-sm">
        Copyright 2025 © preciousekele All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;