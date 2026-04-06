import Image from "next/image";
import type { Team } from "@/lib/data";

export default function TeamBadge({ team, size = 32 }: { team: Team; size?: number }) {
  if (team.logo) {
    return (
      <div
        className="flex-shrink-0 rounded-md bg-white flex items-center justify-center overflow-hidden"
        style={{ width: size, height: size, padding: Math.round(size * 0.06) }}
      >
        <Image
          src={team.logo}
          alt={team.name}
          width={size}
          height={size}
          className="object-contain w-full h-full"
          unoptimized
        />
      </div>
    );
  }
  return (
    <div
      className="flex-shrink-0 rounded flex items-center justify-center"
      style={{ width: size, height: size, backgroundColor: team.color }}
    >
      <span className="text-white font-black" style={{ fontSize: size * 0.28 }}>
        {team.abbreviation}
      </span>
    </div>
  );
}
