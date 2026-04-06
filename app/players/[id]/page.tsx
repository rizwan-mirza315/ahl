"use client";
import { getPlayerById, getTeamById } from "@/lib/data";
import TeamBadge from "@/components/TeamBadge";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState, use } from "react";

export default function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const player = getPlayerById(id);
  if (!player) notFound();

  const team = getTeamById(player.teamId);

  return <PlayerCard player={player} team={team} />;
}

function PlayerCard({ player, team }: { player: ReturnType<typeof getPlayerById> & object; team: ReturnType<typeof getTeamById> }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="min-h-screen flex flex-col items-center justify-start py-12 px-4">
      <div className="w-full max-w-sm">
        {/* Card */}
        <div className="bg-white rounded-2xl overflow-hidden shadow-lg border border-[#e5e5e5]">
          {/* Photo */}
          <div className="relative w-full" style={{ aspectRatio: "3/4" }}>
            {player!.photo ? (
              <Image
                src={player!.photo}
                alt={player!.name}
                fill
                className="object-cover object-top"
                unoptimized
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{ backgroundColor: team?.color ?? "#111" }}
              >
                <span className="text-white font-black" style={{ fontSize: "6rem" }}>{player!.name[0]}</span>
              </div>
            )}
            {/* Number badge */}
            <div
              className="absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shadow"
              style={{ backgroundColor: team?.color ?? "#111" }}
            >
              {player!.number}
            </div>
          </div>

          {/* Info */}
          <div className="px-6 py-5">
            <h1 className="text-2xl font-black text-black tracking-tight">{player!.name}</h1>
            <div className="flex items-center gap-2 mt-1 mb-4">
              {team && (
                <Link href={`/teams/${team.id}`} className="flex items-center gap-1.5 hover:opacity-75 transition-opacity">
                  <TeamBadge team={team} size={22} />
                  <span className="text-[#666] text-sm font-semibold">{team.name}</span>
                </Link>
              )}
              <span className="text-[#bbb]">·</span>
              <span className="text-[#999] text-sm font-semibold">{player!.position}</span>
            </div>

            {/* Expand button */}
            <button
              onClick={() => setExpanded((e) => !e)}
              className="w-full flex items-center justify-between text-sm font-bold text-[#666] border border-[#e5e5e5] rounded-lg px-4 py-2.5 hover:bg-[#fafafa] transition-colors"
            >
              <span>{expanded ? "Hide Stats" : "View Stats"}</span>
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
                className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>

            {/* Stats */}
            {expanded && (
              <div className="grid grid-cols-4 divide-x divide-[#f0f0f0] mt-4 border border-[#f0f0f0] rounded-xl overflow-hidden">
                {[
                  { label: "GP", value: player!.gamesPlayed },
                  { label: "G",  value: player!.goals },
                  { label: "A",  value: player!.assists },
                  { label: "PTS", value: player!.goals + player!.assists },
                ].map((s) => (
                  <div key={s.label} className="flex flex-col items-center py-4">
                    <span className="text-[9px] font-bold text-[#999] tracking-[0.15em] uppercase mb-0.5">{s.label}</span>
                    <span className="text-2xl font-black text-black">{s.value}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <Link href={`/teams/${player!.teamId}`} className="inline-flex items-center gap-2 text-[#c8102e] text-sm font-bold mt-6 hover:underline">
          ← Back to {team?.name}
        </Link>
      </div>
    </div>
  );
}
