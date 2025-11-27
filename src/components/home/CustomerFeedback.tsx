/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  feedback: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Tayyab Sohail',
    role: 'UX/UI Designer',
    feedback:
      'Fresh, flavorful, and just the right amount of heat. The tuna was buttery, the rice well-seasoned, and the chili mayo added a great kick. A must-try for sushi lovers.',
    avatar:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Food Blogger',
    feedback:
      'Absolutely amazing! The presentation was beautiful and the taste was even better. Every bite was a perfect blend of flavors. Highly recommend to everyone!',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    id: 3,
    name: 'Mike Chen',
    role: 'Restaurant Critic',
    feedback:
      'One of the best dining experiences I have had in years. The attention to detail in every dish is remarkable. The chef truly understands the art of cooking.',
    avatar:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
  },
];

const CustomerFeedback: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="relative bg-white py-16 md:py-20 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* LEFT SIDE */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="space-y-6 md:space-y-8 text-center lg:text-left"
          >
            {/* Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900"
            >
              Customer <span className="text-red-700">Feedback</span>
            </motion.h2>

            {/* Feedback Text */}
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.4 }}
                className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto lg:mx-0"
              >
                {testimonials[currentIndex].feedback}
              </motion.p>
            </AnimatePresence>

            {/* Author */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`author-${currentIndex}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.4 }}
                className="flex items-center justify-center lg:justify-start gap-4"
              >
                <img
                  src={testimonials[currentIndex].avatar}
                  alt={testimonials[currentIndex].name}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-2 border-gray-200"
                />
                <div>
                  <h4 className="text-lg sm:text-xl font-bold text-red-700">
                    {testimonials[currentIndex].name}
                  </h4>
                  <p className="text-gray-600 text-sm">{testimonials[currentIndex].role}</p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Dots Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex justify-center lg:justify-start gap-2 pt-4"
            >
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-red-700 w-7 h-3 rounded-full'
                      : 'bg-gray-300 hover:bg-gray-400 w-3 h-3 rounded-full'
                  }`}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="relative flex justify-center"
          >
            {/* Red Circle */}
            <div className="absolute w-60 h-60 sm:w-72 sm:h-72 md:w-80 md:h-80 lg:w-96 lg:h-96 bg-red-700 rounded-full -z-10 top-1/2 -translate-y-1/2"></div>

            {/* Triangle */}
            <div className="absolute top-0 right-4 w-0 h-0 border-l-60 sm:border-l-80 md:border-l-100 border-l-transparent border-t-60 sm:border-t-80 md:border-t-100 border-t-red-700 -z-10"></div>

            {/* Main Chef Image */}
            <motion.img
              src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&h=700&fit=crop"
              alt="Chef"
              className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg object-cover rounded-lg"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;
