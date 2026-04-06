import { getTopScorers, players, teams } from "@/lib/data";
import Link from "next/link";

function teamById(teamId: string) {
  return teams.find((t) => t.id === teamId);
}

const topAssists = [...players]
  .filter((p) => p.position !== "G")
  .sort((a, b) => b.assists - a.assists)
  .slice(0, 15);

export default function StatsPage() {
  const scorers = getTopScorers(15);

  return (
    <div className="space-y-10">
      <div className="border-b border-[#e5e5e5] pb-5">
        <p className="text-[#c8102e] text-xs font-bold tracking-[0.2em] uppercase mb-1">
          2025–26 Regular Season
        </p>
        <h1 className="text-4xl font-black text-black tracking-tight">Player Stats</h1>
      </div>

      {/* Top Scorers */}
      <section className="space-y-4">
        <h2 className="text-[11px] font-bold text-[#999] tracking-[0.18em] uppercase">Scoring Leaders</h2>
        <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#999] text-[10px] tracking-[0.15em] uppercase">
                <th className="px-5 py-3 text-left w-8 font-bold">#</th>
                <th className="px-5 py-3 text-left font-bold">Player</th>
                <th className="px-5 py-3 text-left font-bold">Team</th>
                <th className="px-4 py-3 text-center font-bold">Pos</th>
                <th className="px-4 py-3 text-center font-bold">GP</th>
                <th className="px-4 py-3 text-center font-bold">G</th>
                <th className="px-4 py-3 text-center font-bold">A</th>
                <th className="px-4 py-3 text-center font-black text-[#555]">PTS</th>
              </tr>
            </thead>
            <tbody>
              {scorers.map((player, i) => {
                const team = teamById(player.teamId);
                return (
                  <tr key={player.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-3.5 text-[#bbb] font-bold">{i + 1}</td>
                    <td className="px-5 py-3.5 font-bold text-black">{player.name}</td>
                    <td className="px-5 py-3.5">
                      {team && (
                        <Link href={`/teams/${team.id}`} className="flex items-center gap-2 group w-fit">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: team.color }} />
                          <span className="text-[#999] text-xs group-hover:text-[#c8102e] transition-colors">{team.abbreviation}</span>
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-center text-[#999]">{player.position}</td>
                    <td className="px-4 py-3.5 text-center text-[#666]">{player.gamesPlayed}</td>
                    <td className="px-4 py-3.5 text-center text-[#666]">{player.goals}</td>
                    <td className="px-4 py-3.5 text-center text-[#666]">{player.assists}</td>
                    <td className="px-4 py-3.5 text-center font-black text-black text-base">{player.goals + player.assists}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* Assists Leaders */}
      <section className="space-y-4">
        <h2 className="text-[11px] font-bold text-[#999] tracking-[0.18em] uppercase">Assists Leaders</h2>
        <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#999] text-[10px] tracking-[0.15em] uppercase">
                <th className="px-5 py-3 text-left w-8 font-bold">#</th>
                <th className="px-5 py-3 text-left font-bold">Player</th>
                <th className="px-5 py-3 text-left font-bold">Team</th>
                <th className="px-4 py-3 text-center font-bold">Pos</th>
                <th className="px-4 py-3 text-center font-bold">GP</th>
                <th className="px-4 py-3 text-center font-bold">G</th>
                <th className="px-4 py-3 text-center font-black text-[#555]">A</th>
              </tr>
            </thead>
            <tbody>
              {topAssists.map((player, i) => {
                const team = teamById(player.teamId);
                return (
                  <tr key={player.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                    <td className="px-5 py-3.5 text-[#bbb] font-bold">{i + 1}</td>
                    <td className="px-5 py-3.5 font-bold text-black">{player.name}</td>
                    <td className="px-5 py-3.5">
                      {team && (
                        <Link href={`/teams/${team.id}`} className="flex items-center gap-2 group w-fit">
                          <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: team.color }} />
                          <span className="text-[#999] text-xs group-hover:text-[#c8102e] transition-colors">{team.abbreviation}</span>
                        </Link>
                      )}
                    </td>
                    <td className="px-4 py-3.5 text-center text-[#999]">{player.position}</td>
                    <td className="px-4 py-3.5 text-center text-[#666]">{player.gamesPlayed}</td>
                    <td className="px-4 py-3.5 text-center text-[#666]">{player.goals}</td>
                    <td className="px-4 py-3.5 text-center font-black text-black text-base">{player.assists}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
