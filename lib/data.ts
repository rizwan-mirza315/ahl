export type Team = {
  id: string;
  name: string;
  abbreviation: string;
  color: string;
  secondaryColor: string;
  logo?: string;
};

export type Player = {
  id: string;
  teamId: string;
  name: string;
  number: number;
  position: "C" | "LW" | "RW" | "D" | "G";
  goals: number;
  assists: number;
  gamesPlayed: number;
  gaa?: number;
  svPct?: number;
  photo?: string;
};

export type Game = {
  id: string;
  date: string;
  homeTeamId: string;
  awayTeamId: string;
  homeScore: number | null;
  awayScore: number | null;
  status: "Final" | "OT" | "Upcoming";
};

export const teams: Team[] = [
  { id: "dc",    name: "Daanish's Team", abbreviation: "DC",  color: "#C8102E", secondaryColor: "#F4B942", logo: "/dc-team.jpeg"    },
  { id: "aazib", name: "Aazib's Team", abbreviation: "AAZ", color: "#1A6B3C", secondaryColor: "#4CAF76", logo: "/aazib-team.jfif" },
  { id: "mohud", name: "Mohud's Team", abbreviation: "MOU", color: "#041E42", secondaryColor: "#FF4C00", logo: "/team-mo.png"      },
];

export const players: Player[] = [
  // Aazib's Team
  { id: "p1",  teamId: "aazib", name: "Aazib",     number: 10, position: "C", goals: 9, assists: 1, gamesPlayed: 7, photo: "/aazib-profile-pic.jpeg" },
  { id: "p12", teamId: "aazib", name: "Ali",        number: 4,  position: "D", goals: 4, assists: 4, gamesPlayed: 7, photo: "/ali-profile-pic.jpeg" },
  { id: "p8",  teamId: "aazib", name: "Faheem",     number: 14, position: "D", goals: 1, assists: 2, gamesPlayed: 7 },
  { id: "p9",  teamId: "aazib", name: "Anas",       number: 19, position: "D", goals: 0, assists: 1, gamesPlayed: 7 },
  { id: "p2",  teamId: "aazib", name: "Labib",      number: 17, position: "C", goals: 2, assists: 3, gamesPlayed: 7 },

  // Mohud's Team
  { id: "p11", teamId: "mohud", name: "Mohud",      number: 7,  position: "C", goals: 4, assists: 4, gamesPlayed: 6 },
  { id: "p7",  teamId: "mohud", name: "Ahmad",      number: 8,  position: "D", goals: 2, assists: 1, gamesPlayed: 6 },
  { id: "p13", teamId: "mohud", name: "Hassan",     number: 13, position: "D", goals: 3, assists: 4, gamesPlayed: 7 },
  { id: "p3",  teamId: "mohud", name: "Mutaal",     number: 5,  position: "C", goals: 4, assists: 1, gamesPlayed: 7 },

  // DC's Team
  { id: "p5",  teamId: "dc",    name: "Daanish Chaudhary", number: 2,  position: "D", goals: 5, assists: 3, gamesPlayed: 7, photo: "/dc-profile-pic.jpeg" },
  { id: "p10", teamId: "dc",    name: "Dc Friend", number: 11, position: "C", goals: 3, assists: 0, gamesPlayed: 7 },
  { id: "p14", teamId: "dc",    name: "Ac",         number: 9,  position: "C", goals: 3, assists: 1, gamesPlayed: 7, photo: "/ac-profile-pic.jpeg" },
  { id: "p6",  teamId: "dc",    name: "Talha",      number: 22, position: "C", goals: 2, assists: 2, gamesPlayed: 7 },
  { id: "p4",  teamId: "dc",    name: "Arib",       number: 21, position: "C", goals: 0, assists: 1, gamesPlayed: 7 },
];

export const games: Game[] = [
  { id: "g1",  date: "2025-10-05", homeTeamId: "dc",    awayTeamId: "aazib", homeScore: 4, awayScore: 2, status: "Final" },
  { id: "g2",  date: "2025-10-05", homeTeamId: "mohud", awayTeamId: "dc",    homeScore: 3, awayScore: 5, status: "Final" },
  { id: "g3",  date: "2025-10-12", homeTeamId: "aazib", awayTeamId: "mohud", homeScore: 2, awayScore: 4, status: "Final" },
  { id: "g4",  date: "2025-10-12", homeTeamId: "dc",    awayTeamId: "mohud", homeScore: 3, awayScore: 3, status: "OT"    },
  { id: "g5",  date: "2025-10-19", homeTeamId: "mohud", awayTeamId: "aazib", homeScore: 5, awayScore: 2, status: "Final" },
  { id: "g6",  date: "2025-10-19", homeTeamId: "aazib", awayTeamId: "dc",    homeScore: 1, awayScore: 3, status: "Final" },
  { id: "g7",  date: "2025-10-26", homeTeamId: "dc",    awayTeamId: "aazib", homeScore: 2, awayScore: 4, status: "Final" },
  { id: "g8",  date: "2025-10-26", homeTeamId: "mohud", awayTeamId: "dc",    homeScore: 2, awayScore: 2, status: "OT"    },
  { id: "g9",  date: "2025-11-02", homeTeamId: "aazib", awayTeamId: "mohud", homeScore: 3, awayScore: 1, status: "Final" },
  { id: "g10", date: "2025-11-02", homeTeamId: "dc",    awayTeamId: "mohud", homeScore: 4, awayScore: 3, status: "Final" },
  { id: "g11", date: "2025-11-09", homeTeamId: "mohud", awayTeamId: "aazib", homeScore: 3, awayScore: 2, status: "Final" },
  { id: "g12", date: "2025-11-09", homeTeamId: "aazib", awayTeamId: "dc",    homeScore: 4, awayScore: 1, status: "Final" },
  { id: "g13", date: "2025-11-16", homeTeamId: "dc",    awayTeamId: "aazib", homeScore: 5, awayScore: 3, status: "Final" },
  { id: "g14", date: "2025-11-16", homeTeamId: "mohud", awayTeamId: "dc",    homeScore: 4, awayScore: 2, status: "Final" },
  { id: "g15", date: "2026-04-06", homeTeamId: "aazib", awayTeamId: "mohud", homeScore: null, awayScore: null, status: "Upcoming" },
  { id: "g16", date: "2026-04-06", homeTeamId: "dc",    awayTeamId: "mohud", homeScore: null, awayScore: null, status: "Upcoming" },
  { id: "g17", date: "2026-04-13", homeTeamId: "mohud", awayTeamId: "aazib", homeScore: null, awayScore: null, status: "Upcoming" },
  { id: "g18", date: "2026-04-13", homeTeamId: "aazib", awayTeamId: "dc",    homeScore: null, awayScore: null, status: "Upcoming" },
];

export type StandingsRow = {
  team: Team;
  gp: number; w: number; l: number; ot: number; gf: number; ga: number; pts: number;
};

export function getStandings(): StandingsRow[] {
  const map: Record<string, StandingsRow> = {};
  for (const team of teams) {
    map[team.id] = { team, gp: 0, w: 0, l: 0, ot: 0, gf: 0, ga: 0, pts: 0 };
  }
  for (const game of games) {
    if (game.status === "Upcoming") continue;
    const home = map[game.homeTeamId];
    const away = map[game.awayTeamId];
    home.gp++; away.gp++;
    home.gf += game.homeScore!; home.ga += game.awayScore!;
    away.gf += game.awayScore!; away.ga += game.homeScore!;
    if (game.status === "OT") {
      if (game.homeScore! > game.awayScore!) {
        home.w++; home.pts += 2; away.ot++; away.pts += 1;
      } else {
        away.w++; away.pts += 2; home.ot++; home.pts += 1;
      }
    } else {
      if (game.homeScore! > game.awayScore!) {
        home.w++; home.pts += 2; away.l++;
      } else {
        away.w++; away.pts += 2; home.l++;
      }
    }
  }
  return Object.values(map).sort((a, b) => b.pts - a.pts || b.w - a.w);
}

export function getTeamById(id: string): Team | undefined {
  return teams.find((t) => t.id === id);
}

export function getPlayersByTeam(teamId: string): Player[] {
  return players
    .filter((p) => p.teamId === teamId)
    .sort((a, b) => (b.goals + b.assists) - (a.goals + a.assists));
}

export function getPlayerById(id: string): Player | undefined {
  return players.find((p) => p.id === id);
}

export function getTopScorers(limit = 10): Player[] {
  return players
    .filter((p) => p.position !== "G")
    .sort((a, b) => (b.goals + b.assists) - (a.goals + a.assists))
    .slice(0, limit);
}

export function getOverall(player: Player): number {
  const skaters = players.filter((p) => p.position !== "G" && p.gamesPlayed > 0);

  const ppg = (p: Player) => (p.goals + p.assists) / p.gamesPlayed;
  const gpg = (p: Player) => p.goals / p.gamesPlayed;
  const apg = (p: Player) => p.assists / p.gamesPlayed;

  const maxPpg = Math.max(...skaters.map(ppg));
  const maxGpg = Math.max(...skaters.map(gpg));
  const maxApg = Math.max(...skaters.map(apg));

  const score =
    (ppg(player) / maxPpg) * 0.50 +
    (gpg(player) / maxGpg) * 0.25 +
    (maxApg > 0 ? (apg(player) / maxApg) * 0.25 : 0);

  return Math.min(99, Math.round(50 + score * 49));
}
