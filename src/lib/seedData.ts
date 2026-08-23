import { supabase } from './supabase';

export async function seedWaadiSportsData() {
  try {
    // 1. Insert Sports
    const { data: cricket } = await supabase
      .from('sports')
      .upsert({ name: 'Cricket', slug: 'cricket', icon: '🏏' }, { onConflict: 'slug' })
      .select()
      .single();

    const { data: football } = await supabase
      .from('sports')
      .upsert({ name: 'Football', slug: 'football', icon: '⚽' }, { onConflict: 'slug' })
      .select()
      .single();

    if (!cricket || !football) return { success: false, message: 'Failed to seed sports' };

    // 2. Insert Tournaments
    const { data: t20Cup } = await supabase
      .from('tournaments')
      .upsert(
        {
          sport_id: cricket.id,
          name: 'Valley T20 Premier Cup',
          slug: 'valley-t20-premier-cup',
          season: '2026',
          description: 'The flagship T20 tournament bringing together the best regional cricket teams.',
        },
        { onConflict: 'slug' }
      )
      .select()
      .single();

    const { data: superLeague } = await supabase
      .from('tournaments')
      .upsert(
        {
          sport_id: football.id,
          name: 'Waadi Super League',
          slug: 'waadi-super-league',
          season: '2026',
          description: 'Top-flight regional football league featuring intense matchday action.',
        },
        { onConflict: 'slug' }
      )
      .select()
      .single();

    if (!t20Cup || !superLeague) return { success: false, message: 'Failed to seed tournaments' };

    // 3. Insert Teams
    const teamsData = [
      // Cricket Teams
      { sport_id: cricket.id, name: 'Srinagar Strikers', short_name: 'SRS', slug: 'srinagar-strikers' },
      { sport_id: cricket.id, name: 'Baramulla Blazers', short_name: 'BRB', slug: 'baramulla-blazers' },
      { sport_id: cricket.id, name: 'Anantnag Aces', short_name: 'ANA', slug: 'anantnag-aces' },
      { sport_id: cricket.id, name: 'Gulmarg Gladiators', short_name: 'GMG', slug: 'gulmarg-gladiators' },
      // Football Teams
      { sport_id: football.id, name: 'Chinar Football Club', short_name: 'CFC', slug: 'chinar-fc' },
      { sport_id: football.id, name: 'Pir Panjal Warriors', short_name: 'PPW', slug: 'pir-panjal-warriors' },
      { sport_id: football.id, name: 'Dal Lake Football Academy', short_name: 'DFA', slug: 'dal-lake-fa' },
      { sport_id: football.id, name: 'Kashmir Falcons', short_name: 'KFK', slug: 'kashmir-falcons' },
    ];

    const { data: createdTeams } = await supabase
      .from('teams')
      .upsert(teamsData, { onConflict: 'slug' })
      .select();

    if (!createdTeams || createdTeams.length === 0) return { success: false, message: 'Failed to seed teams' };

    const teamMap = Object.fromEntries(createdTeams.map((t) => [t.slug, t]));

    // 4. Insert Sponsors
    const sponsorsData = [
      { name: 'Kashmir Willow Crafts', logo_url: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=200' },
      { name: 'Valley Energy Drinks', logo_url: 'https://images.unsplash.com/photo-1527960471264-932f39eb5846?w=200' },
      { name: 'Pine Sports Gear', logo_url: 'https://images.unsplash.com/photo-1517649763962-0c623266010b?w=200' },
    ];

    const { data: createdSponsors } = await supabase.from('sponsors').upsert(sponsorsData).select();
    const sponsorId = createdSponsors && createdSponsors[0] ? createdSponsors[0].id : null;

    // 5. Insert Matches
    const now = new Date();
    const matchesData = [
      {
        tournament_id: superLeague.id,
        sport_id: football.id,
        home_team_id: teamMap['chinar-fc'].id,
        away_team_id: teamMap['pir-panjal-warriors'].id,
        status: 'live',
        scheduled_at: now.toISOString(),
        venue: 'Bakshi Stadium, Srinagar',
        home_score: 2,
        away_score: 1,
        status_detail: "68' 2nd Half",
        sponsor_id: sponsorId,
      },
      {
        tournament_id: t20Cup.id,
        sport_id: cricket.id,
        home_team_id: teamMap['srinagar-strikers'].id,
        away_team_id: teamMap['baramulla-blazers'].id,
        status: 'upcoming',
        scheduled_at: new Date(now.getTime() + 3600 * 1000 * 24).toISOString(),
        venue: 'Sher-i-Kashmir Cricket Stadium',
        home_score: 0,
        away_score: 0,
        status_detail: 'Kickoff at 15:30 IST',
        sponsor_id: sponsorId,
      },
      {
        tournament_id: superLeague.id,
        sport_id: football.id,
        home_team_id: teamMap['dal-lake-fa'].id,
        away_team_id: teamMap['kashmir-falcons'].id,
        status: 'completed',
        scheduled_at: new Date(now.getTime() - 3600 * 1000 * 48).toISOString(),
        venue: 'TRC Turf Ground, Srinagar',
        home_score: 3,
        away_score: 0,
        status_detail: 'Full Time',
        sponsor_id: sponsorId,
      },
    ];

    const { data: createdMatches } = await supabase.from('matches').upsert(matchesData).select();

    // Create Broadcast record for live match
    if (createdMatches && createdMatches[0]) {
      const liveMatch = createdMatches.find((m) => m.status === 'live');
      if (liveMatch) {
        await supabase.from('broadcasts').upsert(
          {
            match_id: liveMatch.id,
            status: 'live',
            simulcast_youtube: true,
            simulcast_facebook: true,
            stream_health: 'Optimal',
            bitrate: 4500,
          },
          { onConflict: 'match_id' }
        );
      }
    }

    return { success: true, message: 'Waadi Sports database seeded successfully!' };
  } catch (error: any) {
    return { success: false, message: error.message };
  }
}
