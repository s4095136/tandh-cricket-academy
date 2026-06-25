export interface Program {
  title: string
  label: string
  day: string
  time: string
  coaches: string
  dates: string
  squads: string[]
  description: string
}

export const PROGRAMS: Program[] = [
  {
    title: 'Senior Program',
    label: 'Open',
    day: 'Saturday',
    time: 'White: 6:45pm – 9:00pm · Navy: 4:45pm – 7:00pm',
    coaches: 'Hanni, Alan, Tom, Simon & Aiman',
    dates: '2 May – 30 Aug 2026',
    squads: ['Open Team White', 'Open Team Navy'],
    description: 'Our senior Open program is designed for players ready to compete at a high level. Two squads — White and Navy — train on Saturday evenings with a strong focus on performance cricket, advanced skill refinement, match-day preparation and tactical development. Coached by our most experienced staff.',
  },
  {
    title: 'Senior Program',
    label: '16s & Under',
    day: 'Saturday & Sunday',
    time: 'White: 2:45pm – 5:00pm (Sat) · Navy: 5:45pm – 8:00pm (Sun)',
    coaches: 'Hanni, Alan, Aiman, Hashim, Daksh, Ritin & Krish',
    dates: '2 May – 31 Aug 2026',
    squads: ['Special Group', '16&U White', '16&U Navy'],
    description: 'The 16s & Under program bridges junior and senior cricket. Players train across Saturday and Sunday with three squad levels — including a high-performance Special Group — covering batting, bowling, fielding and game strategy. A large, dedicated coaching team ensures every player gets personalised attention.',
  },
  {
    title: 'Junior Program',
    label: '14s & Under',
    day: 'Sunday',
    time: 'Navy: 3:45pm – 6:00pm · 14&U: 1:45pm – 4:00pm',
    coaches: 'Hanni, Aiman & Ritwik',
    dates: '3 May – 31 Aug 2026',
    squads: ['14&U Navy', '14&U'],
    description: 'The 14s & Under program develops players in a structured Sunday environment. Two squads allow players to be placed at the right level of challenge. Sessions cover core batting and bowling techniques, fielding drills and building the habits needed to move into senior cricket.',
  },
  {
    title: 'Junior Program',
    label: '12s & Under',
    day: 'Friday',
    time: '6:15pm – 8:30pm',
    coaches: 'Hanni, Aiman, Ali Khan & Ceriac',
    dates: '1 May – 29 Aug 2026',
    squads: ['12&U'],
    description: 'Friday evening sessions for players 12 and under. This program builds fundamental cricket skills — batting technique, basic bowling mechanics and sharp fielding — in a fun, energetic environment. Players develop game sense and confidence while training alongside peers at a similar stage.',
  },
  {
    title: 'Junior Program',
    label: '10s & Under',
    day: 'Friday',
    time: '4:45pm – 6:30pm',
    coaches: 'Hanni, Richard, Ritwik, Rehit & Humza',
    dates: '1 May – 29 Aug 2026',
    squads: ['10&U'],
    description: 'Our youngest program is all about sparking a love for the game. Friday afternoon sessions for players 10 and under focus on fun, movement and the core fundamentals of cricket. Small groups, patient coaches and age-appropriate activities make this the perfect starting point for young cricketers.',
  },
]

export const DAY_COLOR: Record<string, { bg: string; text: string }> = {
  Friday:              { bg: 'rgba(245,200,66,0.15)', text: '#f5c842' },
  Saturday:            { bg: 'rgba(74,144,217,0.15)', text: '#7eb8f5' },
  Sunday:              { bg: 'rgba(77,214,138,0.15)', text: '#4dd68a' },
  'Saturday & Sunday': { bg: 'rgba(74,144,217,0.15)', text: '#7eb8f5' },
}
