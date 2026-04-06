import { getTeamById, getPlayersByTeam, teams } from "@/lib/data";
import TeamBadge from "@/components/TeamBadge";
import Link from "next/link";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return teams.map((t) => ({ id: t.id }));
}

export default async function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
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

      {/* Skaters */}
      <section className="space-y-3">
        <h2 className="text-[11px] font-bold text-[#999] tracking-[0.18em] uppercase">Roster</h2>
        <div className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#fafafa] border-b border-[#e5e5e5] text-[#999] text-[10px] tracking-[0.15em] uppercase">
                <th className="px-5 py-3 text-left w-12 font-bold">#</th>
                <th className="px-5 py-3 text-left font-bold">Name</th>
                <th className="px-4 py-3 text-center font-bold">Pos</th>
                <th className="px-4 py-3 text-center font-bold">GP</th>
                <th className="px-4 py-3 text-center font-bold">G</th>
                <th className="px-4 py-3 text-center font-bold">A</th>
                <th className="px-4 py-3 text-center font-black text-[#555]">PTS</th>
              </tr>
            </thead>
            <tbody>
              {skaters.map((player) => (
                <tr key={player.id} className="border-b border-[#f0f0f0] last:border-0 hover:bg-[#fafafa] transition-colors">
                  <td className="px-5 py-3.5 text-[#bbb] font-bold">{player.number}</td>
                  <td className="px-5 py-3.5 font-bold text-black">{player.name}</td>
                  <td className="px-4 py-3.5 text-center text-[#999]">{player.position}</td>
                  <td className="px-4 py-3.5 text-center text-[#666]">{player.gamesPlayed}</td>
                  <td className="px-4 py-3.5 text-center text-[#666]">{player.goals}</td>
                  <td className="px-4 py-3.5 text-center text-[#666]">{player.assists}</td>
                  <td className="px-4 py-3.5 text-center font-black text-black text-base">{player.goals + player.assists}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
