'use client';

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
      name: 'Mark Henry',
      position: 'Owner',
      image: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?w=400&h=500&fit=crop',
    },
    {
      id: 2,
      name: 'Lucky Helen',
      position: 'Chef',
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?w=400&h=400&fit=crop',
    },
    {
      id: 3,
      name: 'Moon Henry',
      position: 'Founder',
      image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?w=400&h=400&fit=crop',
    },
    {
      id: 4,
      name: 'Tom Monrow',
      position: 'Specialist',
      image: 'https://images.unsplash.com/photo-1600180758890-6b94519a8ba6?w=400&h=400&fit=crop',
    },
  ];

  return (
    <section className="relative bg-white pb-20">
      {/* Red Background with overlay image */}
      <div className="relative bg-red-600 py-20">
        {/* Background Pattern/Image */}
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=400&fit=crop)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>
        
        {/* Content */}
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-4">
            Team Member
          </h2>
          <p className="text-white text-lg max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Varius sed pharetra dictum neque massa congue
          </p>
        </div>
      </div>

      {/* Team Cards - Overlapping the red section */}
      <div className="relative -mt-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                {/* Member Image */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                </div>

                {/* Member Info */}
                <div className="p-6 text-center bg-white">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {member.position}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamSection;