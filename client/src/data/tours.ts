export interface Tour {
  id: number
  name: string
  location: string
  year: string
  dates?: string
  status: 'completed' | 'upcoming'
  description: string
  highlights: string[]
}

export const TOURS: Tour[] = [
    {
    id: 4,
    name: 'England Tour',
    location: 'England',
    year: '2025',
    dates: 'End of June - early July 2025',
    status: 'completed',
    description:
      'A standout tour of England, with our players experiencing the home of cricket - playing matches, visiting iconic grounds and training alongside English clubs.',
    highlights: ['Matches against English clubs', 'Visits to iconic cricket grounds', 'Home-of-cricket experience'],
  },

  {
    id: 2,
    name: 'Sale Tour',
    location: 'Sale, Regional Victoria',
    year: 'Annual',
    dates: 'Held every year',
    status: 'completed',
    description:
      'A T&H Cricket tradition - our annual trip to Sale in regional Victoria gives players the chance to compete on country grounds, build team culture and enjoy a weekend away together.',
    highlights: ['Annual fixture', 'Country cricket experience', 'Team culture & camaraderie'],
  },
  {
    id: 3,
    name: 'Mackay Tour',
    location: 'Mackay, Queensland',
    year: '2023',
    status: 'completed',
    description:
      'Our squad headed up to Mackay, Queensland for an action-packed tour featuring matches against local Queensland sides and training in warm-weather conditions.',
    highlights: ['Matches vs Queensland clubs', 'Warm-weather training', 'Squad bonding'],
  },
    {
    id: 1,
    name: 'New Zealand Tour',
    location: 'New Zealand',
    year: '2020',
    status: 'completed',
    description:
      'Our players travelled across New Zealand for a series of matches and training sessions against local junior sides, combining high-level competition with sightseeing and team bonding.',
    highlights: ['Matches against NZ junior clubs', 'Team bonding & sightseeing', 'International match exposure'],
  },

  {
    id: 5,
    name: 'Sri Lanka Tour',
    location: 'Sri Lanka',
    year: 'Upcoming',
    status: 'upcoming',
    description:
      'An exciting upcoming tour to Sri Lanka, giving players the opportunity to experience cricket in subcontinent conditions, take on local junior sides and immerse themselves in Sri Lankan cricket culture.',
    highlights: ['Subcontinent playing conditions', 'Matches vs local junior sides', 'Cultural immersion'],
  },
  {
    id: 6,
    name: 'England Tour',
    location: 'England',
    year: '2026/2027',
    status: 'upcoming',
    description:
      'Following the success of our 2025 trip, T&H Cricket is heading back to England for another tour - more matches, more iconic grounds and another unforgettable cricketing experience.',
    highlights: ['Return trip to England', 'Matches against English clubs', 'Iconic ground visits'],
  },
]
