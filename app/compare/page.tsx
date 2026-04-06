"use client";
import { players, teams, getTeamById } from "@/lib/data";
import TeamBadge from "@/components/TeamBadge";
import Image from "next/image";
import { useState } from "react";

type Player = (typeof players)[number];

function PlayerSelector({
  label,
  selected,
  onSelect,
}: {
  label: string;
  selected: Player | null;
  onSelect: (p: Player | null) => void;
}) {
  const [teamFilter, setTeamFilter] = useState("");

  const filtered = teamFilter
    ? players.filter((p) => p.teamId === teamFilter && p.position !== "G")
    : players.filter((p) => p.position !== "G");

  return (
    <div className="bg-white border border-[#e5e5e5] rounded-xl p-5 space-y-4 flex-1">
      <p className="text-[10px] font-bold text-[#999] tracking-[0.18em] uppercase">{label}</p>

      {/* Team filter */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => { setTeamFilter(""); onSelect(null); }}
          className={`text-xs px-3 py-1.5 rounded-full border font-bold transition-all ${
            !teamFilter ? "border-[#c8102e] text-[#c8102e] bg-red-50" : "border-[#e5e5e5] text-[#666] hover:border-[#aaa]"
          }`}
        >
          All
        </button>
        {teams.map((t) => (
          <button
            key={t.id}
            onClick={() => { setTeamFilter(t.id); onSelect(null); }}
            className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full border font-bold transition-all ${
              teamFilter === t.id ? "border-[#c8102e] text-[#c8102e] bg-red-50" : "border-[#e5e5e5] text-[#666] hover:border-[#aaa]"
            }`}
          >
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: t.color }} />
            {t.abbreviation}
          </button>
        ))}
      </div>

      {/* Player list */}
      <div className="space-y-1">
        {filtered.map((p) => {
          const team = getTeamById(p.teamId);
          const isSelected = selected?.id === p.id;
          return (
            <button
              key={p.id}
              onClick={() => onSelect(isSelected ? null : p)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                isSelected
                  ? "bg-black text-white"
                  : "hover:bg-[#f5f5f5] text-black"
              }`}
            >
              {p.photo ? (
                <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-[#e5e5e5]">
                  <Image src={p.photo} alt={p.name} width={32} height={32} className="object-cover object-top w-full h-full" unoptimized />
                </div>
              ) : (
                <div
                  className="w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-black"
                  style={{ backgroundColor: team?.color ?? "#555" }}
                >
                  {p.name[0]}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className={`font-bold text-sm truncate ${isSelected ? "text-white" : "text-black"}`}>{p.name}</p>
                <p className={`text-xs ${isSelected ? "text-white/60" : "text-[#999]"}`}>{team?.abbreviation} · {p.position}</p>
              </div>
              <span className={`text-xs font-black ${isSelected ? "text-white" : "text-[#bbb]"}`}>
                #{p.number}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

const STATS = [
  { key: "gamesPlayed", label: "GP" },
  { key: "goals",       label: "G" },
  { key: "assists",     label: "A" },
  { key: "pts",         label: "PTS" },
] as const;

function statValue(p: Player, key: typeof STATS[number]["key"]) {
  if (key === "pts") return p.goals + p.assists;
  return p[key];
}

export default function ComparePage() {
  const [playerA, setPlayerA] = useState<Player | null>(null);
  const [playerB, setPlayerB] = useState<Player | null>(null);

  const teamA = playerA ? getTeamById(playerA.teamId) : null;
  const teamB = playerB ? getTeamById(playerB.teamId) : null;

  return (
    <div className="space-y-8">
      <div className="border-b border-[#e5e5e5] pb-5">
        <p className="text-[#c8102e] text-xs font-bold tracking-[0.2em] uppercase mb-1">2025–26 Season</p>
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Head to Head</h1>
      </div>

      {/* Selectors */}
      <div className="flex flex-col sm:flex-row gap-4">
        <PlayerSelector label="Player 1" selected={playerA} onSelect={setPlayerA} />
        <div className="hidden sm:flex items-center justify-center text-2xl font-black text-[#ddd]">VS</div>
        <PlayerSelector label="Player 2" selected={playerB} onSelect={setPlayerB} />
      </div>

      {/* Comparison */}
      {playerA && playerB && (
        <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-sm">
          {/* Header */}
          <div className="grid grid-cols-3 border-b border-[#e5e5e5]">
            <div className="flex flex-col items-center py-5 px-4 gap-2">
              {playerA.photo ? (
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#e5e5e5]">
                  <Image src={playerA.photo} alt={playerA.name} width={64} height={64} className="object-cover object-top w-full h-full" unoptimized />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-black" style={{ backgroundColor: teamA?.color ?? "#555" }}>
                  {playerA.name[0]}
                </div>
              )}
              <div className="text-center">
                <p className="font-black text-black text-sm leading-tight">{playerA.name}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {teamA && <TeamBadge team={teamA} size={16} />}
                  <span className="text-[#999] text-xs">{teamA?.abbreviation}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-center">
              <span className="text-xl font-black text-[#ddd]">VS</span>
            </div>

            <div className="flex flex-col items-center py-5 px-4 gap-2">
              {playerB.photo ? (
                <div className="w-16 h-16 rounded-xl overflow-hidden border border-[#e5e5e5]">
                  <Image src={playerB.photo} alt={playerB.name} width={64} height={64} className="object-cover object-top w-full h-full" unoptimized />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-2xl font-black" style={{ backgroundColor: teamB?.color ?? "#555" }}>
                  {playerB.name[0]}
                </div>
              )}
              <div className="text-center">
                <p className="font-black text-black text-sm leading-tight">{playerB.name}</p>
                <div className="flex items-center justify-center gap-1 mt-1">
                  {teamB && <TeamBadge team={teamB} size={16} />}
                  <span className="text-[#999] text-xs">{teamB?.abbreviation}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Stat rows */}
          {STATS.map(({ key, label }) => {
            const a = statValue(playerA, key);
            const b = statValue(playerB, key);
            const aWins = a > b;
            const bWins = b > a;

            return (
              <div key={key} className="grid grid-cols-3 border-b border-[#f0f0f0] last:border-0">
                <div className={`flex items-center justify-center py-4 ${aWins ? "bg-black/[0.03]" : ""}`}>
                  <span className={`text-3xl font-black ${aWins ? "text-black" : "text-[#bbb]"}`}>{a}</span>
                </div>
                <div className="flex items-center justify-center py-4 border-x border-[#f0f0f0]">
                  <span className="text-[10px] font-bold text-[#999] tracking-[0.15em] uppercase">{label}</span>
                </div>
                <div className={`flex items-center justify-center py-4 ${bWins ? "bg-black/[0.03]" : ""}`}>
                  <span className={`text-3xl font-black ${bWins ? "text-black" : "text-[#bbb]"}`}>{b}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {(!playerA || !playerB) && (
        <div className="text-center py-12 text-[#bbb] text-sm font-semibold">
          Select two players to compare
        </div>
      )}
    </div>
  );
}
