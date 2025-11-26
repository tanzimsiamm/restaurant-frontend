'use client';

import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { fadeInUp } from '@/src/animations/variants';
import Image from 'next/image';

const PartnersSection: React.FC = () => {
  const partners = [
    { id: 1, name: 'Restaurant', logo: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=150&h=80&fit=crop' },
    { id: 2, name: 'Bakery', logo: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=150&h=80&fit=crop' },
    { id: 3, name: 'Fork & Spoon', logo: 'https://images.unsplash.com/photo-1600565193348-f74bd3c7ccdf?w=150&h=80&fit=crop' },
    { id: 4, name: 'Wolf Coffee', logo: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=150&h=80&fit=crop' },
    { id: 5, name: 'Bistro', logo: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=150&h=80&fit=crop' },
    { id: 6, name: 'Bake', logo: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=150&h=80&fit=crop' },
  ];

  // Duplicate the partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-16 bg-white">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="text-center mb-12">
            <p className="text-red-600 text-sm font-semibold uppercase tracking-wide mb-2">
              Partners & Clients
            </p>
            <h2 className="text-4xl font-bold text-gray-900">
              We work with the best people
            </h2>
          </div>

          <div className="overflow-hidden relative">
            <motion.div
              className="flex gap-12"
              animate={{
                x: [-1200, 0],
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 20,
                  ease: "linear",
                },
              }}
            >
              {duplicatedPartners.map((partner, index) => (
                <div
                  key={`${partner.id}-${index}`}
                  className="flex-shrink-0 flex items-center justify-center"
                >
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={150}
                    height={80}
                    className="grayscale opacity-40 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                  />
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default PartnersSection;