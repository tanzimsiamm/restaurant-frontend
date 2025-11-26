/* eslint-disable @next/next/no-img-element */
'use client';

import { useState } from 'react';

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
    feedback: 'Fresh, flavorful, and just the right amount of heat. The tuna was buttery, the rice well-seasoned, and the chili mayo added a great kick. A must-try for sushi lovers.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    role: 'Food Blogger',
    feedback: 'Absolutely amazing! The presentation was beautiful and the taste was even better. Every bite was a perfect blend of flavors. Highly recommend to everyone!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
  },
  {
    id: 3,
    name: 'Mike Chen',
    role: 'Restaurant Critic',
    feedback: 'One of the best dining experiences I have had in years. The attention to detail in every dish is remarkable. The chef truly understands the art of cooking.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop',
  },
];

const CustomerFeedback: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="relative bg-white py-20 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-8">
            {/* Heading */}
            <div>
              <h2 className="text-5xl font-bold text-gray-900">
                Customer <span className="text-red-700">Feedback</span>
              </h2>
            </div>

            {/* Feedback Text */}
            <p className="text-gray-600 text-lg leading-relaxed">
              {testimonials[currentIndex].feedback}
            </p>

            {/* Author Info */}
            <div className="flex items-center gap-4">
              <img
                src={testimonials[currentIndex].avatar}
                alt={testimonials[currentIndex].name}
                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
              />
              <div>
                <h4 className="text-xl font-bold text-red-700">
                  {testimonials[currentIndex].name}
                </h4>
                <p className="text-gray-600 text-sm">
                  {testimonials[currentIndex].role}
                </p>
              </div>
            </div>

            {/* Dots Navigation */}
            <div className="flex gap-3 pt-4">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentIndex === index
                      ? 'bg-red-700 w-8'
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Right Side - Chef Image */}
          <div className="relative">
            {/* Red Background Shape */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-red-700 rounded-full -z-10"></div>
            
            {/* Triangle Accent */}
           <div className="absolute top-0 right-0 w-0 h-0 border-l-[200px] border-l-transparent border-t-[200px] border-t-red-700 -z-10"></div>


            {/* Chef Image */}
            <div className="relative z-10">
              <img
                src="https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=600&h=700&fit=crop"
                alt="Chef showing OK sign"
                className="w-full max-w-md mx-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;