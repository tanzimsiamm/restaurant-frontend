'use client';

import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { fadeInUp } from '@/src/animations/variants';
import Image from 'next/image';

const PartnersSection: React.FC = () => {
  const partners = [
    { id: 1, name: 'Partner 1', logo: 'https://via.placeholder.com/150x80?text=Partner+1' },
    { id: 2, name: 'Partner 2', logo: 'https://via.placeholder.com/150x80?text=Partner+2' },
    { id: 3, name: 'Partner 3', logo: 'https://via.placeholder.com/150x80?text=Partner+3' },
    { id: 4, name: 'Partner 4', logo: 'https://via.placeholder.com/150x80?text=Partner+4' },
    { id: 5, name: 'Partner 5', logo: 'https://via.placeholder.com/150x80?text=Partner+5' },
    { id: 6, name: 'Partner 6', logo: 'https://via.placeholder.com/150x80?text=Partner+6' },
  ];

  return (
    <section className="py-16 bg-gray-50">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              We Work With The Best People
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {partners.map((partner, index) => (
              <motion.div
                key={partner.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-center"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    width={150}
                    height={80}
                    className="grayscale hover:grayscale-0 transition-all opacity-60 hover:opacity-100"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default PartnersSection;
