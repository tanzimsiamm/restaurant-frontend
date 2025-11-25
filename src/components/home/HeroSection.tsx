'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // <- import next/image
import Container from "../ui/Container";
import { fadeInUp } from "@/src/animations/variants";

const HeroSection: React.FC = () => {
  const images = [
    "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800",
    "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?w=800",
    "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800",
    "https://images.unsplash.com/photo-1482049016688-2d3e1b311543?w=800",
  ];

  const [selectedImage, setSelectedImage] = useState(images[0]);

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Text Content */}
          <motion.div initial="initial" animate="animate" variants={fadeInUp}>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Breakfast
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              Breakfast, often referred to as the &apos;most important meal of
              the day&apos;, provides essential nutrients to kick start our day.
              It includes a variety of foods, like fruits, cereals, dairy
              products, and proteins, that contribute to a balanced diet.
            </p>

            {/* Image Thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`cursor-pointer rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === image
                      ? "border-primary-600 shadow-lg"
                      : "border-transparent hover:border-gray-300"
                  }`}
                  onClick={() => setSelectedImage(image)}
                >
                  <Image
                    src={image}
                    alt={`Breakfast ${index + 1}`}
                    width={100} // adjust based on your layout
                    height={80} // adjust based on your layout
                    className="object-cover w-full h-20"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Side - Large Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src={selectedImage}
                alt="Selected breakfast"
                width={800} // adjust as needed
                height={500} // adjust as needed
                className="object-cover w-full h-[500px]"
              />
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
