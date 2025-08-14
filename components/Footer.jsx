import React from "react";

const Footer = () => {
  return (
    <footer>
      <div className="flex flex-col md:flex-row items-start justify-center px-6 md:px-16 lg:px-32 gap-10 py-14 border-b border-gray-500/30 text-gray-500">
        <div className="w-4/5">
          <div className="logo text-2xl font-bold text-gray-900">
            <span className="text-yellow-800">G</span>EO GADGETS
          </div>
          <p className="mt-6 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Est et,
            exercitationem esse tempora quam nisi dicta temporibus id quos
            sapiente error, velit adipisci suscipit vel accusamus eligendi odit
            hic? Enim?
          </p>
        </div>

        <div className="w-1/2 flex items-center justify-start md:justify-center">
          <div>
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
              <li>
                <a className="hover:text-gray-800 transition" href="#">
                  Contact us
                </a>
              </li>
              <li>
                <a className="hover:text-gray-800 transition" href="#">
                  Privacy policy
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="w-1/2 flex items-start justify-start md:justify-center">
          <div>
            <h2 className="font-medium text-gray-900 mb-5">Get in touch</h2>
            <div className="text-sm space-y-2">
              <p>+234-8101-567-8990</p>
              <p>geogadget@gmail.com</p>
            </div>
          </div>
        </div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm">
        Copyright 2025 © presh.dev All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
