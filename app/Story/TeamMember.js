// components/TeamMember.jsx
"use client";

import Image from "next/image";

const TeamMember = ({ member, borderColor }) => {
  const imagePath = member.image
    ? `/images/${member.image}`
    : `/images/${member.name.toLowerCase().replace(/\s+/g, '-')}.jpg`;
  console.log(`Attempting to load image for ${member.name}: ${imagePath}`);

  return (
    <div className="text-center transform transition-all hover:scale-105 duration-300">
      <div
        className={`w-24 h-24 mx-auto mb-3 rounded-full overflow-hidden border-4 border-[hsl(var(--${borderColor}))]`}
      >
        <div className="relative group">
          <Image
            src={imagePath}
            alt={member.name}
            width={96}
            height={96}
            className="object-cover w-full h-full group-hover:opacity-80 transition-opacity duration-200"
            onError={(e) => {
              console.error(`Failed to load image for ${member.name}: ${imagePath}`);
              e.target.src = '/images/fallback.png';
            }}
            placeholder="blur"
            blurDataURL="/images/placeholder.jpg"
          />
        </div>
      </div>
      <h3 className="font-bold text-[hsl(var(--primary))] font-canela text-sm sm:text-base">
        {member.name}
      </h3>
    </div>
  );
};

export default TeamMember;