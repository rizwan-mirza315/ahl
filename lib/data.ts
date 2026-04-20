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
  position: "F" | "F/D" | "C" | "LW" | "RW" | "D" | "G";
  goals: number;
  assists: number;
  gamesPlayed: number;
  gaa?: number;
  svPct?: number;
  photo?: string;
  ovrOverride?: number;
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
  { id: "p1",  teamId: "aazib", name: "Aazib Virk",      number: 29, position: "F",   goals: 15, assists: 2,  gamesPlayed: 12, photo: "/aazib-profile-pic.jpeg" },
  { id: "p12", teamId: "aazib", name: "Ali Syed",         number: 71, position: "D",   goals: 6,  assists: 8,  gamesPlayed: 12, photo: "/ali-profile-pic.jpeg" },
  { id: "p8",  teamId: "aazib", name: "Faheem Issa",      number: 59, position: "D",   goals: 1,  assists: 2,  gamesPlayed: 7,  photo: "/faheem-profile-pic.jpeg" },
  { id: "p9",  teamId: "aazib", name: "Anas Zafar",       number: 19, position: "D",   goals: 0,  assists: 1,  gamesPlayed: 7 },
  { id: "p2",  teamId: "aazib", name: "Labib Ahmed",      number: 66, position: "F",   goals: 2,  assists: 3,  gamesPlayed: 7,  photo: "/labib-profile-pic.jpeg" },

  // Mohud's Team
  { id: "p11", teamId: "mohud", name: "Mohud Ullah",      number: 12, position: "F",   goals: 4,  assists: 4,  gamesPlayed: 6 },
  { id: "p7",  teamId: "mohud", name: "Ahmad Wala",       number: 13, position: "F/D", goals: 2,  assists: 1,  gamesPlayed: 6 },
  { id: "p13", teamId: "mohud", name: "Hassan Chaudhary", number: 13, position: "F/D", goals: 6,  assists: 7,  gamesPlayed: 12 },
  { id: "p3",  teamId: "mohud", name: "Mutaal Ahmad",     number: 5,  position: "F",   goals: 4,  assists: 1,  gamesPlayed: 7 },

  // DC's Team
  { id: "p5",  teamId: "dc",    name: "Daanish Chaudhary",  number: 91, position: "F/D", goals: 9,  assists: 8,  gamesPlayed: 12, photo: "/dc-profile-pic.jpeg" },
  { id: "p10", teamId: "dc",    name: "Priyam Ahmed",        number: 11, position: "F",   goals: 9,  assists: 0,  gamesPlayed: 12 },
  { id: "p14", teamId: "dc",    name: "Abdullah Chaudhary",  number: 9,  position: "F",   goals: 4,  assists: 2,  gamesPlayed: 12, photo: "/ac-profile-pic.jpeg" },
  { id: "p6",  teamId: "dc",    name: "Talha Zafar",         number: 34, position: "F",   goals: 5,  assists: 5,  gamesPlayed: 12 },
  { id: "p4",  teamId: "dc",    name: "Arib Virk",           number: 99, position: "F",   goals: 0,  assists: 2,  gamesPlayed: 12, photo: "/arib-profile-pic .jpeg" },
  { id: "p15", teamId: "dc",    name: "Aarish Bhatti",       number: 0,  position: "F",   goals: 0,  assists: 0,  gamesPlayed: 2 },
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
  const dc    = teams.find(t => t.id === "dc")!;
  const aazib = teams.find(t => t.id === "aazib")!;
  const mohud = teams.find(t => t.id === "mohud")!;

  // W-L-OTL format. OTL = overtime loss (1 pt). Win = 2 pts.
  return [
    { team: aazib, gp: 7, w: 4, l: 2, ot: 1, gf: 0, ga: 0, pts: 9 },  // 4*2 + 1 = 9
    { team: mohud, gp: 6, w: 4, l: 2, ot: 0, gf: 0, ga: 0, pts: 8 },  // 4*2 = 8
    { team: dc,    gp: 7, w: 3, l: 4, ot: 0, gf: 0, ga: 0, pts: 6 },  // 3*2 = 6
  ];
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
  if (player.ovrOverride !== undefined) return player.ovrOverride;
  const skaters = players.filter((p) => p.position !== "G" && p.gamesPlayed > 0);

  const ppg = (p: Player) => (p.goals + p.assists) / p.gamesPlayed;
  const gpg = (p: Player) => p.goals / p.gamesPlayed;
  const apg = (p: Player) => p.assists / p.gamesPlayed;

  const maxPpg = Math.max(...skaters.map(ppg));
  const maxGpg = Math.max(...skaters.map(gpg));
  const maxApg = Math.max(...skaters.map(apg));
  const maxGp  = Math.max(...skaters.map((p) => p.gamesPlayed));

  // availability factor: 0.75–1.0 based on games played vs league max
  const availability = 0.75 + 0.25 * (player.gamesPlayed / maxGp);

  const score =
    (ppg(player) / maxPpg) * 0.45 +
    (gpg(player) / maxGpg) * 0.225 +
    (maxApg > 0 ? (apg(player) / maxApg) * 0.225 : 0) +
    availability * 0.10;

  return Math.min(99, Math.round(50 + score * 49));
}
