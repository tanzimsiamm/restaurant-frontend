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

const PartnersSection = () => {
  const partners = [
    { id: 1, name: "Burger Hub", icon: <GiHamburger size={90} /> },
    { id: 2, name: "Pizza Point", icon: <GiFullPizza size={90} /> },
    { id: 3, name: "Wolf Coffee", icon: <PiCoffeeFill size={90} /> },
    { id: 4, name: "Chicken House", icon: <PiBowlFoodFill size={90} /> },
    { id: 5, name: "Sushi World", icon: <GiSushis size={90} /> },
    { id: 6, name: "Bakery", icon: <GiCakeSlice size={90} /> },
  ];

  const duplicated = [...partners, ...partners];

  return (
    <section className="py-24 bg-white">
      <Container className="max-w-6xl">
        <div className="text-center mb-14">
          <p className="text-red-600 text-sm font-semibold uppercase tracking-wide mb-2">
            Partners & Clients
          </p>
          <h2 className="text-5xl font-bold text-gray-900">
            We work with the best people
          </h2>
        </div>

        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-24"
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
                {item.icon}
              </div>
            ))}
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default PartnersSection;
