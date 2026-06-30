export const ROTATING_WORDS = [
  'Developing Skills.',
  'Dedicated Coaches.',
  'Holiday Clinics.',
  'Building Champions.',
  'Leading The Way.',
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
      {
        name: 'Hanni Harb',
        image: 'hanni-harb.png',
        role: 'Co-Founder & Head Coach',
      },
      {
        name: 'Tom Rogers',
        image: 'tom-rogers1.png',
        role: 'Co-Founder & Senior Coach',
      },
      {
        name: 'Jacob Harb',
        image: 'jacob-harb.png',
        role: 'Co-Founder',
      },
    ],
  },

  {
    group: 'SPECIALIST COACHES',
    coaches: [
      {
        name: 'Alan Chandwick',
        image: 'alan-chandwick.png',
        role: 'Lead Coach',
      },
      {
        name: 'Fawad Ahmed',
        image: 'fawad-ahmed.png',
        role: 'Spin Bowling Specialist',
      },
      {
        name: 'Simon Feros',
        image: 'simon-feros.png',
        role: 'Lead Coach',
      },
    ],
  },

  {
    group: 'LEAD COACHES',
    coaches: [
      {
        name: 'Aiman Nadeem',
        image: 'aiman-nadeem.png',
        role: 'Lead Coach',
      },
      {
        name: 'Aayan Nadeem',
        image: 'aayan-nadeem.png',
        role: 'Assistant Coach',
      },
      {
        name: 'Daksh Kumar',
        image: 'daksh-kumar.png',
        role: 'Assistant Coach',
      },
      {
        name: 'Ali Khan',
        image: 'ali-khan.png',
        role: 'Lead Coach',
      },
    ],
  },

  {
    group: 'ASSISTANT COACHES',
    coaches: [
      {
        name: 'Ritin Raman',
        image: 'ritin-raman.png',
        role: 'Assistant Coach',
      },
      {
        name: 'Krish Kumar',
        image: 'krish-kumar.png',
        role: 'Assistant Coach',
      },
      {
        name: 'Cyriac Mathew',
        image: 'cyriac-mathew.png',
        role: 'Assistant Coach',
      },
      {
        name: 'Richard Mathew',
        image: 'richard-mathew.png',
        role: 'Assistant Coach',
      },
    ],
  },
]

export const SPONSOR_GROUPS = [
  {
    sponsors: [
      {
        name: 'Kia Werribee',
        image: 'kia-werribee.png',
        description: 'Official Automotive Partner',
      },
      {
        name: 'Passionate Fire',
        image: 'passionate-fire.png',
        description: 'Official Partner',
      },
      {
        name: 'H2C',
        image: 'h2c.png',
      },
      {
        name: 'PlayStats',
        image: 'playstats.png',
      },
      {
        name: 'BowlStrong',
        image: 'bowlstrong.png',
      },
      {
        name: 'Xplosive Fielding',
        image: 'xplosive-fielding.png',
      },
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