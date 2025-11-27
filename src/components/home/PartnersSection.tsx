"use client";

import { motion } from "framer-motion";
import Container from "../ui/Container";

import {
  GiCakeSlice,
  GiHamburger,
  GiFullPizza,
  GiSushis,
} from "react-icons/gi";
import { PiCoffeeFill, PiBowlFoodFill } from "react-icons/pi";
import React from "react";

const PartnersSection = () => {
  const iconSize = {
    small: 55,
    medium: 70,
    large: 90,
  };

  const partners = [
    { id: 1, name: "Burger Hub", icon: <GiHamburger size={iconSize.large} /> },
    { id: 2, name: "Pizza Point", icon: <GiFullPizza size={iconSize.large} /> },
    { id: 3, name: "Wolf Coffee", icon: <PiCoffeeFill size={iconSize.large} /> },
    {
      id: 4,
      name: "Chicken House",
      icon: <PiBowlFoodFill size={iconSize.large} />,
    },
    { id: 5, name: "Sushi World", icon: <GiSushis size={iconSize.large} /> },
    { id: 6, name: "Bakery", icon: <GiCakeSlice size={iconSize.large} /> },
  ];

  const duplicated = [...partners, ...partners];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white">
      <Container className="max-w-6xl">
        {/* Heading */}
        <div className="text-center mb-10 md:mb-14">
          <p className="text-red-600 text-xs md:text-sm font-semibold uppercase tracking-wide mb-2">
            Partners & Clients
          </p>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
            We work with the best people
          </h2>
        </div>

        {/* Infinite Scrolling Slider */}
        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-12 md:gap-20 lg:gap-24"
            animate={{ x: ["-100%", "0%"] }}
            transition={{
              repeat: Infinity,
              duration: 22,
              ease: "linear",
            }}
          >
            {duplicated.map((item, index) => (
              <div
                key={index}
                title={item.name}
                className="shrink-0 flex flex-col items-center justify-center text-gray-400
                opacity-40 grayscale hover:opacity-100 hover:text-gray-900 hover:grayscale-0
                transition-all duration-300"
              >
                {/* Responsive icon size */}
                <div className="hidden md:block">{item.icon}</div>
                <div className="block md:hidden">
                  {React.cloneElement(item.icon, { size: iconSize.small })}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default PartnersSection;
