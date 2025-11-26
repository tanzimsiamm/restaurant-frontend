import Link from "next/link";
import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  Youtube,
} from "lucide-react";
import Container from "../ui/Container";
import Image from "next/image";

const Footer: React.FC = () => {
  const instagramImages = [
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=200&h=200&fit=crop",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=200&h=200&fit=crop",
  ];

  return (
    <footer className="bg-red-800 text-white">
      <Container>
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Restaurant Section */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-6 uppercase">Restaurant</h3>
            <p className="text-white/90 text-sm leading-relaxed mb-6">
              Subscribe our newsletter and get discount 25%off
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <div className="flex">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="flex-1 px-4 py-2.5 bg-white text-gray-900 text-sm focus:outline-none"
                />
                <button className="bg-red-900 hover:bg-red-950 px-4 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3">
              <a
                href="#"
                aria-label="Pinterest"
                className="w-8 h-8 bg-red-900 flex items-center justify-center text-white hover:bg-red-950 transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
                </svg>
              </a>

              <a
                href="#"
                aria-label="Twitter"
                className="w-8 h-8 bg-red-900 flex items-center justify-center text-white hover:bg-red-950 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>

              <a
                href="#"
                aria-label="Facebook"
                className="w-8 h-8 bg-red-900 flex items-center justify-center text-white hover:bg-red-950 transition-all"
              >
                <Facebook className="w-4 h-4" />
              </a>

              <a
                href="#"
                aria-label="Instagram"
                className="w-8 h-8 bg-red-900 flex items-center justify-center text-white hover:bg-red-950 transition-all"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="#"
                aria-label="YouTube"
                className="w-8 h-8 bg-red-900 flex items-center justify-center text-white hover:bg-red-950 transition-all"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Contact us</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-white shrink-0 mt-0.5" />
                <span className="text-sm text-white/90">
                  3517 W. Gray St. Utica, Pennsylvania 57867
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white shrink-0" />
                <span className="text-sm text-white/90">(480) 555-0103</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white shrink-0" />
                <span className="text-sm text-white/90">M.Alyaqout@4house.Co</span>
              </li>
              <li className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-white shrink-0" />
                <span className="text-sm text-white/90">Sun - Sat / 10:00 AM - 8:00 PM</span>
              </li>
            </ul>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about"
                  className="hover:text-white/70 transition-colors text-sm text-white/90"
                >
                  About us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-white/70 transition-colors text-sm text-white/90"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/menu"
                  className="hover:text-white/70 transition-colors text-sm text-white/90"
                >
                  Our Menu
                </Link>
              </li>
              <li>
                <Link
                  href="/team"
                  className="hover:text-white/70 transition-colors text-sm text-white/90"
                >
                  Team
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="hover:text-white/70 transition-colors text-sm text-white/90"
                >
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          {/* Instagram Gallery */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Instagram Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {instagramImages.map((image, index) => (
                <a
                  key={index}
                  href="#"
                  className="relative aspect-square overflow-hidden hover:opacity-80 transition-opacity"
                >
                  <Image
                    src={image}
                    alt={`Instagram post ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="100px"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-red-900 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/80">
              Copyright © 2025. All rights reserved
            </p>
            <div className="flex gap-6">
              <Link
                href="#"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Term of Use
              </Link>
              <Link
                href="#"
                className="text-sm text-white/80 hover:text-white transition-colors"
              >
                Partner
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;