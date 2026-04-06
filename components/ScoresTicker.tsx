"use client";
import { games, teams } from "@/lib/data";
import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";

function teamById(id: string) {
  return teams.find((t) => t.id === id)!;
}

function formatTickerDate(dateStr: string) {
  return new Date(dateStr + "T12:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  }).toUpperCase();
}

// Group games by date
function groupByDate(gameList: typeof games) {
  const map: Record<string, typeof games> = {};
  for (const g of gameList) {
    if (!map[g.date]) map[g.date] = [];
    map[g.date].push(g);
  }
  return Object.entries(map).sort(([a], [b]) => a.localeCompare(b));
}

export default function ScoresTicker() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const grouped = groupByDate(games);

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    scrollRef.current.scrollBy({ left: dir === "right" ? 320 : -320, behavior: "smooth" });
  }

  return (
    <div className="bg-[#f2f2f2] border-b border-[#ddd] flex items-stretch">
      {/* Left arrow */}
      <button
        onClick={() => scroll("left")}
        className="flex-shrink-0 w-10 flex items-center justify-center text-[#555] hover:text-black hover:bg-[#e5e5e5] transition-colors border-r border-[#ddd]"
        aria-label="Scroll left"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      {/* Scrollable cards */}
      <div ref={scrollRef} className="flex-1 overflow-x-auto scores-ticker flex items-stretch">
        <div className="flex items-stretch min-w-max">
          {grouped.map(([date, dayGames]) => (
            <div key={date} className="flex items-stretch">
              {/* Date label */}
              <div className="flex flex-col items-center justify-center px-4 border-r border-[#ddd] min-w-[56px]">
                <span className="text-[10px] font-bold text-[#555] tracking-wide leading-tight">
                  {formatTickerDate(date).split(" ")[0]}
                </span>
                <span className="text-[18px] font-black text-black leading-tight">
                  {formatTickerDate(date).split(" ")[1]}
                </span>
              </div>

              {/* Game cards for this date */}
              {dayGames.map((game) => {
                const home = teamById(game.homeTeamId);
                const away = teamById(game.awayTeamId);
                const isUpcoming = game.status === "Upcoming";
                const homeWon = !isUpcoming && game.homeScore! > game.awayScore!;
                const awayWon = !isUpcoming && game.awayScore! > game.homeScore!;

                return (
                  <Link
                    key={game.id}
                    href="/schedule"
                    className="flex flex-col justify-center px-4 py-2 border-r border-[#ddd] hover:bg-[#e8e8e8] transition-colors min-w-[148px] gap-0.5"
                  >
                    {/* Status */}
                    <div className="text-[10px] font-bold tracking-wider mb-1">
                      {isUpcoming ? (
                        <span className="text-[#555]">UPCOMING</span>
                      ) : game.status === "OT" ? (
                        <span className="text-[#d97706]">FINAL/OT</span>
                      ) : (
                        <span className="text-[#16a34a]">FINAL</span>
                      )}
                    </div>

                    {/* Away */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {away.logo ? (
                          <div className="w-6 h-6 flex-shrink-0 relative">
                            <Image src={away.logo} alt={away.abbreviation} fill className="object-contain" unoptimized />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-sm flex-shrink-0" style={{ backgroundColor: away.color }} />
                        )}
                        <span className={`text-[13px] font-bold ${awayWon ? "text-black" : "text-[#888]"}`}>
                          {away.abbreviation}
                        </span>
                      </div>
                      {!isUpcoming && (
                        <span className={`text-[15px] font-black ${awayWon ? "text-black" : "text-[#aaa]"}`}>
                          {game.awayScore}
                        </span>
                      )}
                    </div>

                    {/* Home */}
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        {home.logo ? (
                          <div className="w-6 h-6 flex-shrink-0 relative">
                            <Image src={home.logo} alt={home.abbreviation} fill className="object-contain" unoptimized />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-sm flex-shrink-0" style={{ backgroundColor: home.color }} />
                        )}
                        <span className={`text-[13px] font-bold ${homeWon ? "text-black" : "text-[#888]"}`}>
                          {home.abbreviation}
                        </span>
                      </div>
                      {!isUpcoming && (
                        <span className={`text-[15px] font-black ${homeWon ? "text-black" : "text-[#aaa]"}`}>
                          {game.homeScore}
                        </span>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Right arrow */}
      <button
        onClick={() => scroll("right")}
        className="flex-shrink-0 w-10 flex items-center justify-center text-[#555] hover:text-black hover:bg-[#e5e5e5] transition-colors border-l border-[#ddd]"
        aria-label="Scroll right"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      {/* Calendar icon */}
      <button className="flex-shrink-0 w-12 flex items-center justify-center text-[#555] hover:text-black hover:bg-[#e5e5e5] transition-colors border-l border-[#ddd]">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      </button>
    </div>
  );
}
