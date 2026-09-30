import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white border-t mt-10 py-6">

      <div className="container mx-auto text-center">

        <p className="text-gray-600 mb-4">
          © {new Date().getFullYear()} Crop Disease Detection System
        </p>

        <h3 className="text-gray-700 font-semibold mb-3">
          Connect With Us
        </h3>

        <div className="flex justify-center gap-6 text-2xl">

          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:scale-110 transition"
          >
            <FaFacebook />
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-pink-500 hover:scale-110 transition"
          >
            <FaInstagram />
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 hover:scale-110 transition"
          >
            <FaTwitter />
          </a>

          <a
            href="https://wa.me/919999999999"
            target="_blank"
            rel="noopener noreferrer"
            className="text-green-500 hover:scale-110 transition"
          >
            <FaWhatsapp />
          </a>

        </div>

      </div>

    </footer>
  );
};

export default Footer;