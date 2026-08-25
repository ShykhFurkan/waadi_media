import { LeagueStanding, SportMatch } from '../types';
import { getMatches } from './matches';
import { getRegisteredTeams } from './competitions';

export async function calculateStandings(competitionId: string): Promise<LeagueStanding[]> {
  // Fetch registered teams for the competition
  const teams = await getRegisteredTeams(competitionId);
  const matches = await getMatches();

  // STRICT REQUIREMENT: Only finished matches count toward permanent standings
  const finishedMatches = matches.filter(
    (m) =>
      (m.competition.id === competitionId || !competitionId) &&
      m.status === 'finished'
  );

  const standingsMap: Record<
    string,
    {
      team: (typeof teams)[0];
      played: number;
      won: number;
      drawn: number;
      lost: number;
      goalsFor: number;
      goalsAgainst: number;
      goalDifference: number;
      points: number;
    }
  > = {};

  // Initialize standings table for all registered teams
  teams.forEach((t) => {
    standingsMap[t.id] = {
      team: t,
      played: 0,
      won: 0,
      drawn: 0,
      lost: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,
      points: 0,
    };
  });

  // Calculate from finished matches
  finishedMatches.forEach((m) => {
    const homeId = m.homeTeam.id;
    const awayId = m.awayTeam.id;

    if (!standingsMap[homeId]) {
      standingsMap[homeId] = {
        team: m.homeTeam,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    }
    if (!standingsMap[awayId]) {
      standingsMap[awayId] = {
        team: m.awayTeam,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        goalDifference: 0,
        points: 0,
      };
    }

    const homeGoals = m.homeScore.sport === 'football' ? m.homeScore.goals : 0;
    const awayGoals = m.awayScore.sport === 'football' ? m.awayScore.goals : 0;

    const homeEntry = standingsMap[homeId];
    const awayEntry = standingsMap[awayId];

    homeEntry.played += 1;
    awayEntry.played += 1;

    homeEntry.goalsFor += homeGoals;
    homeEntry.goalsAgainst += awayGoals;
    awayEntry.goalsFor += awayGoals;
    awayEntry.goalsAgainst += homeGoals;

    if (homeGoals > awayGoals) {
      homeEntry.won += 1;
      homeEntry.points += 3;
      awayEntry.lost += 1;
    } else if (awayGoals > homeGoals) {
      awayEntry.won += 1;
      awayEntry.points += 3;
      homeEntry.lost += 1;
    } else {
      homeEntry.drawn += 1;
      homeEntry.points += 1;
      awayEntry.drawn += 1;
      awayEntry.points += 1;
    }
  });

  // Compute goal difference and sort
  const standingsList = Object.values(standingsMap).map((entry) => {
    entry.goalDifference = entry.goalsFor - entry.goalsAgainst;
    return entry;
  });

  standingsList.sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    if (b.goalDifference !== a.goalDifference) return b.goalDifference - a.goalDifference;
    return b.goalsFor - a.goalsFor;
  });

  return standingsList.map((entry, index) => ({
    pos: index + 1,
    team: entry.team,
    played: entry.played,
    won: entry.won,
    drawn: entry.drawn,
    lost: entry.lost,
    goalsFor: entry.goalsFor,
    goalsAgainst: entry.goalsAgainst,
    goalDifference: entry.goalDifference,
    points: entry.points,
  }));
}
