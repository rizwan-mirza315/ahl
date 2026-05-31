import Image from "next/image";
import Link from "next/link";
import { players, teams } from "@/lib/data";
import TeamBadge from "@/components/TeamBadge";
import ScoresTicker from "@/components/ScoresTicker";

const scorers = [...players].sort((a, b) => (b.goals + b.assists) - (a.goals + a.assists));

const captains = [
  { name: "Aazib Virk",        teamId: "aazib", gp: 0, goals: 0, assists: 0 },
  { name: "Mohud Ullah",       teamId: "mohud", gp: 0, goals: 0, assists: 0 },
  { name: "Daanish Chaudhary", teamId: "dc",    gp: 0, goals: 0, assists: 0 },
];

export default function HomePage() {

  return (
    <div className="space-y-8">
      <div className="-mx-4 -mt-8">
        <ScoresTicker />
      </div>

      {/* Hero photo */}
      <section className="relative rounded-xl overflow-hidden bg-black w-full" style={{ aspectRatio: "4/3" }}>
        <Image src="/pray-up.jpeg" alt="Team prayer" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative flex items-center gap-4 sm:gap-8 px-5 sm:px-10 h-full">
          <Image src="/ahl-logo-v2.png" alt="AHL" width={340} height={340} className="flex-shrink-0 w-24 sm:w-[220px] md:w-[340px]" />
          <div>
            <p className="text-[#c8102e] text-[10px] sm:text-sm font-bold tracking-[0.2em] uppercase mb-1 sm:mb-2">2025–26 Regular Season</p>
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-none mb-2 sm:mb-3">
              Ahmadiyya<br />Hockey League
            </h1>
            <p className="text-[#ccc] text-xs sm:text-base hidden sm:block">Official stats, standings &amp; schedule</p>
          </div>
        </div>
      </section>

      {/* Two tables */}
      <div className="grid sm:grid-cols-2 gap-6">

        {/* Top Scorers — Captains */}
        <section className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
            <h2 className="text-sm font-black text-black tracking-wide uppercase">Top Scorers</h2>
            <Link href="/stats" className="text-[#c8102e] text-xs font-bold hover:underline">Full →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#999] text-[10px] tracking-[0.15em] uppercase">
                  <th className="px-3 py-2.5 text-left w-6">#</th>
                  <th className="px-3 py-2.5 text-left">Player</th>
                  <th className="px-2 py-2.5 text-center hidden sm:table-cell">Team</th>
                  <th className="px-2 py-2.5 text-center">GP</th>
                  <th className="px-2 py-2.5 text-center">G</th>
                  <th className="px-2 py-2.5 text-center">A</th>
                  <th className="px-2 py-2.5 text-center font-black text-[#555]">PTS</th>
                </tr>
              </thead>
              <tbody>
                {captains.map((captain, i) => {
                  const team = teams.find(t => t.id === captain.teamId);
                  return (
                    <tr key={captain.name} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                      <td className="px-3 py-3 text-[#bbb] font-bold">{i + 1}</td>
                      <td className="px-3 py-3 font-bold text-black">{captain.name}</td>
                      <td className="px-2 py-3 text-center hidden sm:table-cell">
                        {team && <TeamBadge team={team} size={36} />}
                      </td>
                      <td className="px-2 py-3 text-center text-[#666]">{captain.gp}</td>
                      <td className="px-2 py-3 text-center text-[#666]">{captain.goals}</td>
                      <td className="px-2 py-3 text-center text-[#666]">{captain.assists}</td>
                      <td className="px-2 py-3 text-center font-black text-black">0</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Scoring leaders */}
        <section className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
            <h2 className="text-sm font-black text-black tracking-wide uppercase">Scoring Leaders</h2>
            <Link href="/stats" className="text-[#c8102e] text-xs font-bold hover:underline">Full →</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#999] text-[10px] tracking-[0.15em] uppercase">
                  <th className="px-3 py-2.5 text-left w-6">#</th>
                  <th className="px-3 py-2.5 text-left">Player</th>
                  <th className="px-2 py-2.5 text-center hidden sm:table-cell">Team</th>
                  <th className="px-2 py-2.5 text-center">GP</th>
                  <th className="px-2 py-2.5 text-center">G</th>
                  <th className="px-2 py-2.5 text-center">A</th>
                  <th className="px-2 py-2.5 text-center font-black text-[#555]">PTS</th>
                </tr>
              </thead>
              <tbody>
                {scorers.map((player, i) => {
                  const team = teams.find(t => t.id === player.teamId);
                  return (
                    <tr key={player.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                      <td className="px-3 py-3 text-[#bbb] font-bold">{i + 1}</td>
                      <td className="px-3 py-3 font-bold text-black">{player.name}</td>
                      <td className="px-2 py-3 text-center hidden sm:table-cell">
                        {team && <TeamBadge team={team} size={36} />}
                      </td>
                      <td className="px-2 py-3 text-center text-[#666]">{player.gamesPlayed}</td>
                      <td className="px-2 py-3 text-center text-[#666]">{player.goals}</td>
                      <td className="px-2 py-3 text-center text-[#666]">{player.assists}</td>
                      <td className="px-2 py-3 text-center font-black text-black">{player.goals + player.assists}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

      </div>
    </div>
  );
}
