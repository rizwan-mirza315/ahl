import Image from "next/image";
import Link from "next/link";
import { getStandings, players, teams } from "@/lib/data";
import TeamBadge from "@/components/TeamBadge";
import ScoresTicker from "@/components/ScoresTicker";

const scorers = [...players].sort((a, b) => (b.goals + b.assists) - (a.goals + a.assists));

export default function HomePage() {
  const standings = getStandings();

  return (
    <div className="space-y-8">
      <div className="-mx-4 -mt-8">
        <ScoresTicker />
      </div>
      {/* Hero photo */}
      <section className="relative rounded-xl overflow-hidden bg-black w-full" style={{ aspectRatio: "4/3" }}>
        <Image src="/pray-up.jpeg" alt="Team prayer" fill className="object-cover object-center" priority />
        <div className="absolute inset-0 bg-black/55" />
        <div className="relative flex items-center gap-8 px-10 h-full">
          <Image src="/ahl-logo-v2.png" alt="AHL" width={340} height={340} className="flex-shrink-0" />
          <div>
            <p className="text-[#c8102e] text-sm font-bold tracking-[0.2em] uppercase mb-2">2025–26 Regular Season</p>
            <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight leading-none mb-3">
              Ahmadiyya<br />Hockey League
            </h1>
            <p className="text-[#ccc] text-base">Official stats, standings &amp; schedule</p>
          </div>
        </div>
      </section>

      {/* Two tables */}
      <div className="grid sm:grid-cols-2 gap-6">

        {/* Standings */}
        <section className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
            <h2 className="text-sm font-black text-black tracking-wide uppercase">League Standings</h2>
            <Link href="/standings" className="text-[#c8102e] text-xs font-bold hover:underline">Full →</Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#999] text-[10px] tracking-[0.15em] uppercase">
                <th className="px-4 py-2.5 text-left w-6">#</th>
                <th className="px-4 py-2.5 text-left">Team</th>
                <th className="px-3 py-2.5 text-center">GP</th>
                <th className="px-3 py-2.5 text-center">W</th>
                <th className="px-3 py-2.5 text-center">L</th>
                <th className="px-3 py-2.5 text-center">OT</th>
                <th className="px-3 py-2.5 text-center font-black text-[#555]">PTS</th>
              </tr>
            </thead>
            <tbody>
              {standings.map((row, i) => (
                <tr key={row.team.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                  <td className="px-4 py-3 text-[#bbb] font-bold">{i + 1}</td>
                  <td className="px-4 py-3">
                    <Link href={`/teams/${row.team.id}`} className="flex items-center gap-2 group">
                      <TeamBadge team={row.team} size={44} />
                      <span className="font-bold text-black text-[13px] group-hover:text-[#c8102e] transition-colors">{row.team.name}</span>
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-center text-[#666]">{row.gp}</td>
                  <td className="px-3 py-3 text-center text-[#666]">{row.w}</td>
                  <td className="px-3 py-3 text-center text-[#666]">{row.l}</td>
                  <td className="px-3 py-3 text-center text-[#666]">{row.ot}</td>
                  <td className="px-3 py-3 text-center font-black text-black">{row.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        {/* Scoring leaders */}
        <section className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-sm">
          <div className="flex items-center justify-between px-5 py-4 border-b border-[#e5e5e5]">
            <h2 className="text-sm font-black text-black tracking-wide uppercase">Scoring Leaders</h2>
            <Link href="/stats" className="text-[#c8102e] text-xs font-bold hover:underline">Full →</Link>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#999] text-[10px] tracking-[0.15em] uppercase">
                <th className="px-4 py-2.5 text-left w-6">#</th>
                <th className="px-4 py-2.5 text-left">Player</th>
                <th className="px-3 py-2.5 text-center">Team</th>
                <th className="px-3 py-2.5 text-center">GP</th>
                <th className="px-3 py-2.5 text-center">G</th>
                <th className="px-3 py-2.5 text-center">A</th>
                <th className="px-3 py-2.5 text-center font-black text-[#555]">PTS</th>
              </tr>
            </thead>
            <tbody>
              {scorers.map((player, i) => {
                const team = teams.find(t => t.id === player.teamId);
                return (
                  <tr key={player.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                    <td className="px-4 py-3 text-[#bbb] font-bold">{i + 1}</td>
                    <td className="px-4 py-3 font-bold text-black">{player.name}</td>
                    <td className="px-3 py-3 text-center">
                      {team && <TeamBadge team={team} size={52} />}
                    </td>
                    <td className="px-3 py-3 text-center text-[#666]">{player.gamesPlayed}</td>
                    <td className="px-3 py-3 text-center text-[#666]">{player.goals}</td>
                    <td className="px-3 py-3 text-center text-[#666]">{player.assists}</td>
                    <td className="px-3 py-3 text-center font-black text-black">{player.goals + player.assists}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>

      </div>
    </div>
  );
}
