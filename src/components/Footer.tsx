'use client';
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Footer = () => {
  // State to check if it's client-side
  const [isClient, setIsClient] = useState(false);

  // Set state to true after component mounts to ensure client-side rendering
  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <footer className="bg-gray-900 text-gray-300 py-10 w-full">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between space-y-8 lg:space-y-0 lg:items-start">
          {/* Company Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-white">Purohit</h2>
            <p className="mt-2 max-w-sm text-gray-400">
              Delivering excellence in service and innovation. Empowering your
              business with modern solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="#" className="hover:text-white">Home</Link></li>
              <li><Link href="#" className="hover:text-white">About</Link></li>
              <li><Link href="#" className="hover:text-white">Services</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
            <p className="text-gray-400">Balkumari, Lalitpur</p>
            <p className="text-gray-400">Email: purohit@gmail.com</p>
            <p className="text-gray-400">Phone: +977 9866396831</p>
          </div>

          {/* Social Media (client-side only) */}
          {isClient && (
            <div className="flex space-x-4 mt-4 lg:mt-0">
              <Link href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook-f"></i>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter"></i>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram"></i>
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </div>
          )}
        </div>

        {/* Divider and Copyright */}
        <div className="mt-8 border-t border-gray-700 pt-6 text-center">
          <p className="text-sm text-gray-400">
            &copy; 2024 Purohit. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
