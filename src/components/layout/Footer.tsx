"use client";

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
      <Container className="max-w-6xl">
        {/* Grid Section */}
        <div className="py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">

          {/* Restaurant Section */}
          <div>
            <h3 className="text-white text-2xl font-bold mb-6 uppercase">
              Restaurant
            </h3>
            <p className="text-white/90 text-sm leading-relaxed mb-6">
              Subscribe to our newsletter and get 25% discount.
            </p>

            {/* Newsletter */}
            <div className="mb-6">
              <div className="flex flex-col sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter Your Email"
                  className="w-full px-4 py-2.5 bg-white text-gray-900 text-sm focus:outline-none"
                />
                <button className="bg-red-900 hover:bg-red-950 px-4 py-2.5 mt-3 sm:mt-0 transition-colors">
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Social Icons */}
            <div className="flex flex-wrap gap-3">
              <IconBox><Twitter className="w-4 h-4" /></IconBox>
              <IconBox><Facebook className="w-4 h-4" /></IconBox>
              <IconBox><Instagram className="w-4 h-4" /></IconBox>
              <IconBox><Youtube className="w-4 h-4" /></IconBox>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Contact Us</h3>
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
                <span className="text-sm text-white/90">
                  Sun - Sat / 10:00 AM - 8:00 PM
                </span>
              </li>
            </ul>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Links</h3>
            <ul className="space-y-3">
              {["About us", "Contact Us", "Our Menu", "Team", "FAQ"].map(
                (text, i) => (
                  <li key={i}>
                    <Link
                      href="/"
                      className="hover:text-white/70 transition-colors text-sm text-white/90"
                    >
                      {text}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Instagram Gallery */}
          <div>
            <h3 className="text-white text-xl font-bold mb-6">Instagram Gallery</h3>
            <div className="grid grid-cols-3 gap-2">
              {instagramImages.map((img, i) => (
                <div key={i} className="relative aspect-square overflow-hidden">
                  <Image
                    src={img}
                    alt="insta"
                    fill
                    className="object-cover hover:opacity-80 transition-opacity"
                    sizes="100px"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Bottom Bar */}
      <div className="bg-red-600 py-4">
        <Container className="max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-white/90">
              © 2025. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-6">
              <FooterLink text="Privacy Policy" />
              <FooterLink text="Terms of Use" />
              <FooterLink text="Partner" />
            </div>
          </div>
        </Container>
      </div>
    </footer>
  );
};

export default Footer;

// Reusable Components
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const IconBox = ({ children }: any) => (
  <span className="w-8 h-8 bg-red-900 flex items-center justify-center text-white hover:bg-red-950 transition-all rounded">
    {children}
  </span>
);

const FooterLink = ({ text }: { text: string }) => (
  <Link
    href="#"
    className="text-sm text-white/90 hover:text-white transition-colors"
  >
    {text}
  </Link>
);
