import { games, teams } from "@/lib/data";
import TeamBadge from "@/components/TeamBadge";
import Link from "next/link";

function teamById(id: string) {
  return teams.find((t) => t.id === id)!;
}

function formatGroupDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    weekday: "long", month: "long", day: "numeric", year: "numeric",
  });
}

export default function SchedulePage() {
  const sorted = [...games].sort((a, b) => a.date.localeCompare(b.date));
  const grouped: Record<string, typeof games> = {};
  for (const game of sorted) {
    if (!grouped[game.date]) grouped[game.date] = [];
    grouped[game.date].push(game);
  }

  return (
    <div className="space-y-8">
      <div className="border-b border-[#e5e5e5] pb-5">
        <p className="text-[#c8102e] text-xs font-bold tracking-[0.2em] uppercase mb-1">2025–26 Regular Season</p>
        <h1 className="text-3xl sm:text-4xl font-black text-black tracking-tight">Schedule</h1>
      </div>

      {Object.entries(grouped).map(([date, dayGames]) => (
        <div key={date} className="space-y-3">
          <h2 className="text-[11px] font-bold text-[#999] tracking-[0.18em] uppercase">
            {dayGames.every(g => g.status === "Upcoming") ? "TBD" : formatGroupDate(date)}
          </h2>

          {dayGames.map((game) => {
            const home = teamById(game.homeTeamId);
            const away = teamById(game.awayTeamId);
            const isUpcoming = game.status === "Upcoming";
            const homeWon = !isUpcoming && game.homeScore! > game.awayScore!;
            const awayWon = !isUpcoming && game.awayScore! > game.homeScore!;

            return (
              <div key={game.id} className="bg-white border border-[#e5e5e5] rounded-xl overflow-hidden hover:shadow-md transition-shadow shadow-sm">
                <div className="flex items-center px-3 sm:px-5 py-4 gap-2 sm:gap-4">

                  {/* Away */}
                  <Link href={`/teams/${away.id}`} className="flex items-center gap-2 flex-1 min-w-0 group">
                    <div className="flex-shrink-0">
                      <TeamBadge team={away} size={40} />
                    </div>
                    <span className={`font-bold text-sm sm:text-[15px] truncate group-hover:text-[#c8102e] transition-colors ${awayWon ? "text-black" : "text-[#aaa]"}`}>
                      <span className="hidden sm:inline">{away.name}</span>
                      <span className="sm:hidden">{away.abbreviation}</span>
                    </span>
                  </Link>

                  {/* Score */}
                  <div className="flex-shrink-0 text-center w-16 sm:w-24">
                    {isUpcoming ? (
                      <span className="text-[#aaa] text-xs sm:text-sm font-bold">TBD</span>
                    ) : (
                      <div className="flex items-center justify-center gap-1 sm:gap-2">
                        <span className={`text-xl sm:text-2xl font-black ${awayWon ? "text-black" : "text-[#bbb]"}`}>{game.awayScore}</span>
                        <span className="text-[#ddd] font-bold">–</span>
                        <span className={`text-xl sm:text-2xl font-black ${homeWon ? "text-black" : "text-[#bbb]"}`}>{game.homeScore}</span>
                      </div>
                    )}
                  </div>

                  {/* Home */}
                  <Link href={`/teams/${home.id}`} className="flex items-center gap-2 flex-1 min-w-0 justify-end group">
                    <span className={`font-bold text-sm sm:text-[15px] truncate text-right group-hover:text-[#c8102e] transition-colors ${homeWon ? "text-black" : "text-[#aaa]"}`}>
                      <span className="hidden sm:inline">{home.name}</span>
                      <span className="sm:hidden">{home.abbreviation}</span>
                    </span>
                    <div className="flex-shrink-0">
                      <TeamBadge team={home} size={40} />
                    </div>
                  </Link>

                  {/* Status */}
                  <div className="flex-shrink-0 w-[60px] sm:w-[80px] text-right">
                    {isUpcoming ? (
                      <span className="inline-block text-[9px] sm:text-[11px] font-bold bg-blue-50 text-blue-600 border border-blue-200 rounded px-1.5 sm:px-2.5 py-1 tracking-wide">
                        UPCOMING
                      </span>
                    ) : (
                      <span className={`inline-block text-[9px] sm:text-[11px] font-bold rounded px-1.5 sm:px-2.5 py-1 tracking-wide ${
                        game.status === "OT"
                          ? "bg-amber-50 text-amber-600 border border-amber-200"
                          : "bg-green-50 text-green-600 border border-green-200"
                      }`}>
                        {game.status === "OT" ? "FINAL/OT" : "FINAL"}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
