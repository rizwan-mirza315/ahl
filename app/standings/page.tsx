import Link from "next/link";
import { getStandings } from "@/lib/data";
import TeamBadge from "@/components/TeamBadge";

export default function StandingsPage() {
  const rows = getStandings();

  return (
    <div className="space-y-6">
      <div className="border-b border-[#e5e5e5] pb-5">
        <p className="text-[#c8102e] text-xs font-bold tracking-[0.2em] uppercase mb-1">2025–26 Regular Season</p>
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Standings</h1>
      </div>

      <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#999] text-[10px] tracking-[0.15em] uppercase">
                <th className="px-4 py-3 text-left w-8 font-bold">#</th>
                <th className="px-4 py-3 text-left font-bold">Team</th>
                <th className="px-3 py-3 text-center font-bold">GP</th>
                <th className="px-3 py-3 text-center font-bold">W</th>
                <th className="px-3 py-3 text-center font-bold">L</th>
                <th className="px-3 py-3 text-center font-bold">OT</th>
                <th className="px-3 py-3 text-center font-bold hidden sm:table-cell">GF</th>
                <th className="px-3 py-3 text-center font-bold hidden sm:table-cell">GA</th>
                <th className="px-3 py-3 text-center font-black text-[#555]">PTS</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.team.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                  <td className="px-4 py-4 text-[#bbb] font-bold">{i + 1}</td>
                  <td className="px-4 py-4">
                    <Link href={`/teams/${row.team.id}`} className="flex items-center gap-2 sm:gap-3 group">
                      <TeamBadge team={row.team} size={40} />
                      <span className="font-bold text-black group-hover:text-[#c8102e] transition-colors leading-tight">
                        <span className="hidden sm:inline">{row.team.name}</span>
                        <span className="sm:hidden">{row.team.abbreviation}</span>
                      </span>
                    </Link>
                  </td>
                  <td className="px-3 py-4 text-center text-[#666]">{row.gp}</td>
                  <td className="px-3 py-4 text-center text-[#666]">{row.w}</td>
                  <td className="px-3 py-4 text-center text-[#666]">{row.l}</td>
                  <td className="px-3 py-4 text-center text-[#666]">{row.ot}</td>
                  <td className="px-3 py-4 text-center text-[#666] hidden sm:table-cell">{row.gf}</td>
                  <td className="px-3 py-4 text-center text-[#666] hidden sm:table-cell">{row.ga}</td>
                  <td className="px-3 py-4 text-center font-black text-black text-base">{row.pts}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-[#bbb] text-xs">OT = Overtime loss (1 point) · Teams sorted by points, then wins</p>
    </div>
  );
}
