export const ROTATING_WORDS = [
  'developing skills.',
  'dedicated coaches.',
  'holiday clinics.',
  'building champions.',
  'leading the way.',
]

export const STATS = [
  { value: '250+', label: 'Players coached' },
  { value: '8', label: 'Years running' },
  { value: '4', label: 'Programs' },
  { value: '25yrs', label: 'Coaching experience' },
]

export const COACH_GROUPS = [
  {
    group: 'FOUNDERS',
    coaches: [
      { name: 'Tom Rogers', image: '/images/coaches/tom-rogers.png', role: 'Co-Founder & Senior Coach' },
      { name: 'Hanni Harb', image: '/images/coaches/hanni-harb.png', role: 'Co-Founder & Head Coach' },
    ],
  },
  {
    group: 'LEAD COACHES',
    coaches: [
      { name: 'Alan Chandwick', image: '/images/coaches/alan.png', role: 'Lead Coach' },
      { name: 'Aiman Nadeem', image: '/images/coaches/aiman.png', role: 'Lead Coach' },
      { name: 'Ali Khan', image: '/images/coaches/ali-khan.png', role: 'Lead Coach' },
    ],
  },
  {
    group: 'SPECIALIST COACHES',
    coaches: [
      { name: 'Fawad Ahmed', image: '/images/coaches/fawad-ahmed.png', role: 'Spin Bowling Specialist' },
      { name: 'Simon Feros', image: '/images/coaches/simon-feros.png', role: 'Lead Coach' },
    ],
  },
  {
    group: 'ASSISTANT COACHES',
    coaches: [
      { name: 'Aayan Nadeem', image: '/images/coaches/aayan.png', role: 'Assistant Coach' },
      { name: 'Ritin Raman', image: '/images/coaches/ritin.png', role: 'Assistant Coach' },
      { name: 'Daksh Kumar', image: '/images/coaches/daksh.png', role: 'Assistant Coach' },
      { name: 'Krish Kumar', image: '/images/coaches/krish.png', role: 'Assistant Coach' },
      { name: 'Cyriac Mathew', image: '/images/coaches/cyriac-mathew.png', role: 'Assistant Coach' },
      { name: 'Richard Mathew', image: '/images/coaches/richard-mathew.png', role: 'Assistant Coach' },
    ],
  },
]

export const SPONSOR_GROUPS = [
  {
    group: 'PLATINUM SPONSORS',
    sponsors: [
      { name: 'Kia Werribee', image: '/images/sponsors/kia-werribee.png', description: 'Official Automotive Partner' },
      { name: 'Passionate Fire', image: '/images/sponsors/passionate-fire.png', description: 'Official Partner' },
    ],
  },
  {
    group: 'GOLD SPONSORS',
    sponsors: [
      { name: 'Sponsor 3', image: '/images/sponsors/sponsor-3.png', description: 'Coming Soon' },
      { name: 'Sponsor 4', image: '/images/sponsors/sponsor-4.png', description: 'Coming Soon' },
    ],
  },
  {
    group: 'SILVER SPONSORS',
    sponsors: [
      { name: 'Sponsor 5', image: '/images/sponsors/sponsor-5.png', description: 'Coming Soon' },
      { name: 'Sponsor 6', image: '/images/sponsors/sponsor-6.png', description: 'Coming Soon' },
      { name: 'Sponsor 7', image: '/images/sponsors/sponsor-7.png', description: 'Coming Soon' },
    ],
  },
]

export const AVATAR_HOVER_SX = {
  transition: 'transform 0.2s ease, box-shadow 0.2s ease',
  cursor: 'pointer',
  '&:hover': {
    transform: 'scale(1.08)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
  },
}