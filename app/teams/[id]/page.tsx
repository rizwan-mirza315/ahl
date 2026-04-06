"use client";
import { getTeamById, getPlayersByTeam, teams } from "@/lib/data";
import TeamBadge from "@/components/TeamBadge";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { useState, use } from "react";

export default function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const team = getTeamById(id);
  if (!team) notFound();

  const skaters = getPlayersByTeam(id).filter((p) => p.position !== "G");

  return (
    <div className="space-y-8">
      {/* Team header */}
      <div
        className="rounded-xl overflow-hidden border border-[#e5e5e5] shadow-sm"
        style={{ background: `linear-gradient(135deg, ${team.color}18 0%, #fff 60%)` }}
      >
        <div className="flex items-center gap-6 px-8 py-8">
          <TeamBadge team={team} size={80} />
          <div>
            <p className="text-[#999] text-xs font-bold tracking-[0.2em] uppercase mb-1">2025–26 Season</p>
            <h1 className="text-4xl font-black text-black tracking-tight">{team.name}</h1>
          </div>
        </div>
      </div>

      {/* Team switcher */}
      <div className="flex flex-wrap gap-2">
        <span className="text-[#999] text-xs font-bold tracking-widest uppercase self-center mr-1">Teams:</span>
        {teams.map((t) => (
          <Link
            key={t.id}
            href={`/teams/${t.id}`}
            className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-full border font-bold transition-all ${
              t.id === id
                ? "border-[#c8102e] text-[#c8102e] bg-red-50"
                : "border-[#e5e5e5] text-[#666] hover:text-black hover:border-[#aaa]"
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
            {t.abbreviation}
          </Link>
        ))}
      </div>

      {/* Roster label */}
      <h2 className="text-[11px] font-bold text-[#999] tracking-[0.18em] uppercase -mb-5">Roster</h2>

      {/* Player cards grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {skaters.map((player) => (
          <PlayerCard key={player.id} player={player} teamColor={team.color} />
        ))}
      </div>
    </div>
  );
}

function PlayerCard({
  player,
  teamColor,
}: {
  player: ReturnType<typeof getPlayersByTeam>[number];
  teamColor: string;
}) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-2xl overflow-hidden shadow-sm flex flex-col">
      {/* Photo */}
      <div className="relative w-full" style={{ aspectRatio: "1/1" }}>
        {player.photo ? (
          <Link href={`/players/${player.id}`}>
            <Image
              src={player.photo}
              alt={player.name}
              fill
              className="object-cover object-top"
              unoptimized
            />
          </Link>
        ) : (
          <div
            className="w-full h-full flex items-center justify-center"
            style={{ backgroundColor: teamColor + "18" }}
          >
            <span className="font-black text-5xl" style={{ color: teamColor }}>
              {player.name[0]}
            </span>
          </div>
        )}
        {/* Jersey number badge */}
        <div
          className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-xs shadow"
          style={{ backgroundColor: teamColor }}
        >
          {player.number}
        </div>
      </div>

      {/* Info */}
      <div className="px-4 py-4 flex flex-col gap-3 flex-1">
        <div>
          {player.photo ? (
            <Link href={`/players/${player.id}`} className="hover:text-[#c8102e] transition-colors">
              <p className="font-black text-black text-base leading-tight">{player.name}</p>
            </Link>
          ) : (
            <p className="font-black text-black text-base leading-tight">{player.name}</p>
          )}
          <p className="text-[#999] text-sm font-semibold mt-0.5">{player.position}</p>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded((e) => !e)}
          className="flex items-center justify-between text-xs font-bold text-[#666] border border-[#e5e5e5] rounded-lg px-3 py-2 hover:bg-[#fafafa] transition-colors w-full"
        >
          <span>{expanded ? "Hide Stats" : "Stats"}</span>
          <svg
            width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"
            className={`transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </button>

        {/* Stats */}
        {expanded && (
          <div className="grid grid-cols-4 divide-x divide-[#f0f0f0] border border-[#f0f0f0] rounded-xl overflow-hidden">
            {[
              { label: "GP", value: player.gamesPlayed },
              { label: "G",  value: player.goals },
              { label: "A",  value: player.assists },
              { label: "PTS", value: player.goals + player.assists },
            ].map((s) => (
              <div key={s.label} className="flex flex-col items-center py-3">
                <span className="text-[8px] font-bold text-[#999] tracking-[0.12em] uppercase mb-0.5">{s.label}</span>
                <span className="text-xl font-black text-black">{s.value}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
