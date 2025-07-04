import { Facebook, Twitter, Instagram, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-10 mt-16">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* About */}
        <div>
          <h2 className="text-xl font-semibold mb-4">Book Library</h2>
          <p className="text-sm">
            Discover thousands of books, track your reading, and explore new genres all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/books" className="hover:underline">Browse Books</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Social */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
          <div className="flex gap-4">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">
              <Facebook className="hover:text-white" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer">
              <Twitter className="hover:text-white" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">
              <Instagram className="hover:text-white" />
            </a>
            <a href="mailto:library@example.com">
              <Mail className="hover:text-white" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center mt-10 text-sm text-gray-400 border-t border-gray-700 pt-4">
        © {new Date().getFullYear()} Book Library. All rights reserved.
      </div>
    </footer>
  );
}
