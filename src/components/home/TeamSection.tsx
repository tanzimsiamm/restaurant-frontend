"use client";

import Image from "next/image";
import { useTeam } from "@/src/hooks/useTeam";
import Loading from "../ui/Loading";

const TeamSection: React.FC = () => {
  const { teamMembers, loading, error } = useTeam(true);

  if (loading) {
    return (
      <section className="relative bg-white pb-20">
        <div className="flex justify-center items-center py-20">
          <Loading size="lg" />
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative bg-white pb-20">
        <div className="flex justify-center items-center py-20">
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg">
            {error}
          </div>
        </div>
      </section>
    );
  }

  if (!teamMembers || teamMembers.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-white pb-20">
      {/* Red Background with overlay image - only covers header area */}
      <div className="relative bg-red-600 py-20 pb-44">
        {/* Background Pattern/Image */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&h=400&fit=crop)",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>

        {/* Text Content */}
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold text-white mb-4">Team Members</h2>

          <p className="text-white text-lg max-w-2xl mx-auto leading-relaxed">
            Our dedicated chefs and expert team carefully prepare every dish
            using fresh and high-quality ingredients. We prioritize taste,
            hygiene, and customer satisfaction above everything.
          </p>
        </div>
      </div>

      {/* Team Cards - positioned to overlap the red section */}
      <div className="relative -mt-40 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member) => (
            <div
              key={member._id}
              className="bg-white shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Member Image */}
              <div className="relative h-72 overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>

              {/* Member Info */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-gray-600 text-sm">{member.position}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
