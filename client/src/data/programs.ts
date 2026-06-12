export interface Program {
  label: string
  day: string
  time: string
  coaches: string
  dates: string
  squads: string[]
}

export const PROGRAMS: Program[] = [
  {
    label: 'Open',
    day: 'Saturday',
    time: 'White: 6:45pm – 9:00pm · Navy: 4:45pm – 7:00pm',
    coaches: 'Hanni, Alan, Tom, Simon & Aiman',
    dates: '2 May – 30 Aug 2026',
    squads: ['Open Team White', 'Open Team Navy'],
  },
  {
    label: '16s & Under',
    day: 'Saturday & Sunday',
    time: 'White: 2:45pm – 5:00pm (Sat) · Navy: 5:45pm – 8:00pm (Sun)',
    coaches: 'Hanni, Alan, Aiman, Hashim, Daksh, Ritin & Krish',
    dates: '2 May – 31 Aug 2026',
    squads: ['Special Group', '16&U White', '16&U Navy'],
  },
  {
    label: '14s & Under',
    day: 'Sunday',
    time: 'Navy: 3:45pm – 6:00pm · 14&U: 1:45pm – 4:00pm',
    coaches: 'Hanni, Aiman & Ritwik',
    dates: '3 May – 31 Aug 2026',
    squads: ['14&U Navy', '14&U'],
  },
  {
    label: '12s & Under',
    day: 'Friday',
    time: '6:15pm – 8:30pm',
    coaches: 'Hanni, Aiman, Ali Khan & Ceriac',
    dates: '1 May – 29 Aug 2026',
    squads: ['12&U'],
  },
  {
    label: '10s & Under',
    day: 'Friday',
    time: '4:45pm – 6:30pm',
    coaches: 'Hanni, Richard, Ritwik, Rehit & Humza',
    dates: '1 May – 29 Aug 2026',
    squads: ['10&U'],
  },
]

export const DAY_COLOR: Record<string, { bg: string; text: string }> = {
  Friday:              { bg: 'rgba(245,200,66,0.15)', text: '#f5c842' },
  Saturday:            { bg: 'rgba(74,144,217,0.15)', text: '#7eb8f5' },
  Sunday:              { bg: 'rgba(77,214,138,0.15)', text: '#4dd68a' },
  'Saturday & Sunday': { bg: 'rgba(74,144,217,0.15)', text: '#7eb8f5' },
}
