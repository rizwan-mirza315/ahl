"use client";
import { players, teams, getTeamById, getOverall } from "@/lib/data";
import TeamBadge from "@/components/TeamBadge";
import Image from "next/image";
import Link from "next/link";
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
  const [teamId, setTeamId] = useState("");

  const teamPlayers = teamId
    ? players.filter((p) => p.teamId === teamId && p.position !== "G")
    : [];

  function handleTeamChange(id: string) {
    setTeamId(id);
    onSelect(null);
  }

  const team = teamId ? getTeamById(teamId) : null;

  return (
    <div className="flex-1 space-y-3">
      <p className="text-[10px] font-bold text-[#999] tracking-[0.18em] uppercase">{label}</p>

      {/* Team dropdown */}
      <div className="relative">
        <select
          value={teamId}
          onChange={(e) => handleTeamChange(e.target.value)}
          className="w-full appearance-none bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 pr-10 text-sm font-bold text-black focus:outline-none focus:border-[#aaa] cursor-pointer"
        >
          <option value="">Select a team...</option>
          {teams.map((t) => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#999]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Player dropdown */}
      <div className="relative">
        <select
          value={selected?.id ?? ""}
          onChange={(e) => {
            const p = players.find((pl) => pl.id === e.target.value) ?? null;
            onSelect(p);
          }}
          disabled={!teamId}
          className="w-full appearance-none bg-white border border-[#e5e5e5] rounded-xl px-4 py-3 pr-10 text-sm font-bold text-black focus:outline-none focus:border-[#aaa] cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <option value="">Select a player...</option>
          {teamPlayers.map((p) => (
            <option key={p.id} value={p.id}>{p.name} (#{p.number})</option>
          ))}
        </select>
        <svg className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#999]" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>

      {/* Selected player preview */}
      {selected && team && (
        <div className="flex items-center gap-3 bg-white border border-[#e5e5e5] rounded-xl px-4 py-3">
          {selected.photo ? (
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-[#e5e5e5]">
              <Image src={selected.photo} alt={selected.name} width={40} height={40} className="object-cover object-top w-full h-full" unoptimized />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-black" style={{ backgroundColor: team.color }}>
              {selected.name[0]}
            </div>
          )}
          <div className="flex-1 min-w-0">
            <p className="font-black text-black text-sm">{selected.name}</p>
            <div className="flex items-center gap-1.5 mt-0.5">
              <TeamBadge team={team} size={14} />
              <span className="text-[#999] text-xs">{team.abbreviation} · #{selected.number} · {selected.position}</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const STATS = [
  { key: "ovr",         label: "OVR" },
  { key: "gamesPlayed", label: "GP" },
  { key: "goals",       label: "G" },
  { key: "assists",     label: "A" },
  { key: "pts",         label: "PTS" },
] as const;

function statValue(p: Player, key: typeof STATS[number]["key"]) {
  if (key === "ovr") return getOverall(p);
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
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Teams</h1>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-[#e5e5e5]">
        <Link href="/teams/dc" className="px-4 py-2.5 text-sm font-bold border-b-2 border-transparent text-[#999] hover:text-black transition-colors -mb-px">
          Roster
        </Link>
        <Link href="/compare" className="px-4 py-2.5 text-sm font-bold border-b-2 border-black text-black -mb-px">
          Head to Head
        </Link>
      </div>

      {/* Selectors */}
      <div className="flex flex-col sm:flex-row gap-6 items-start">
        <PlayerSelector label="Player 1" selected={playerA} onSelect={setPlayerA} />
        <div className="hidden sm:flex items-center pt-8 text-2xl font-black text-[#ddd]">VS</div>
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
                <div className="mt-2 inline-block bg-black text-white text-xs font-black px-2 py-0.5 rounded">
                  {getOverall(playerA)} OVR
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
                <div className="mt-2 inline-block bg-black text-white text-xs font-black px-2 py-0.5 rounded">
                  {getOverall(playerB)} OVR
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
          Select two players above to compare
        </div>
      )}
    </div>
  );
}
