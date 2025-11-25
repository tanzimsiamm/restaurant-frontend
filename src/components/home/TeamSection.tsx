'use client';

import { motion } from 'framer-motion';
import Container from '../ui/Container';
import { fadeInUp, staggerContainer } from '@/src/animations/variants';
import Image from 'next/image';

interface TeamMember {
  id: number;
  name: string;
  position: string;
  image: string;
}

const TeamSection: React.FC = () => {
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Head Chef',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400',
    },
    {
      id: 2,
      name: 'Jane Smith',
      position: 'Sous Chef',
      image: 'https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      position: 'Pastry Chef',
      image: 'https://images.unsplash.com/photo-1607631568010-a87245c0daf8?w=400',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      position: 'Restaurant Manager',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    },
  ];

  return (
    <section className="py-16 bg-white">
      <Container>
        <motion.div
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          {/* Section Header */}
          <motion.div variants={fadeInUp} className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Team Member
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Varius sed 
              pharetra dictum neque massa congue.
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                variants={fadeInUp}
                custom={index}
                className="group"
              >
                <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300">
                  
                  {/* Member Image */}
                  <div className="relative h-64 overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      priority={index === 0}
                    />
                  </div>

                  {/* Member Info */}
                  <div className="p-6 text-center">
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary-600 font-medium">
                      {member.position}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Container>
    </section>
  );
};

export default TeamSection;
