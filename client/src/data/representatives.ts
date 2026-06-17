export interface Representative {
  id: number
  name: string
  image: string | null
  honours: string[]
}

export const REPRESENTATIVES: Representative[] = [
  {
    id: 1,
    name: 'Aayan Nadeem',
    image: '/images/coaches/aayan-nadeem.png',
    honours: [
      'U12 School Sports Victoria (2019/20)',
      'U17 Vic Metro Team (2022/23, 2023/24)',
      'U19 Northern Territory Team (2025/26)',
    ],
  },
  {
    id: 2,
    name: 'Aiman Nadeem',
    image: '/images/coaches/aiman-nadeem.png',
    honours: [
      'U17 Vic Metro Team (2022/23)',
      'U19 Northern Territory Team (2023/24)',
      'U19 Vic Metro Team (2024/25)',
      'U19 Victoria Combined Team (2023/24, 2024/25)',
      'U23 Victoria 2nd XI Team (2025/26)',
      'Melbourne Renegades Junior Academy (2024/25, 2025/26)',
      'Melbourne Renegades T10 Invitational (2024/25)',
      'Melbourne Stars Senior Academy (2025,26)'
    ],
  },
  {
    id: 3,
    name: 'Ali Khan',
    image: '/images/coaches/ali-khan.png',
    honours: ['U19 Vic Metro Team (2023/24)'],
  },
  {
    id: 4,
    name: 'Ritin Raman',
    image: '/images/coaches/ritin-raman.png',
    honours: ['U19 Vic Metro Team (2025/26)', 'U19 Combined Victoria Team (2025/26)', 'Victoria Targeted Rookie Program (2026)'],
  },
  {
    id: 5,
    name: 'Reyaan Farooq',
    image: '/images/coaches/reyaan-farooq.png',
    honours: [
      'U19 Vic Metro Team (2024/25, 2025/26)',
      'U19 Combined Victoria Team (2024/25, 2025/26)',
    ],
  },
  {
    id: 6,
    name: 'Santosh Remireddy',
    image: '/images/coaches/santosh-remireddy.png',
    honours: ['U12 School Sports Victoria  (2019/20)', 'U17 Vic Metro Team (2024/25)'],
  },
  {
    id: 7,
    name: 'Abhik Nomula',
    image: '/images/coaches/abhik-nomula.png',
    honours: ['U12 School Sports Victoria  (2024/25)', 'U15 School Sports Victoria  (2025/26)'],
  },
  {
    id: 8,
    name: 'Sarim Tamoor',
    image: '/images/coaches/sarim-tamoor.png',
    honours: ['U12 School Sports Victoria  (2025/26)'],
  },
  {
    id: 9,
    name: 'Jujhar Singh Tamber',
    image: '/images/coaches/jujhar-singh-tamber.png',
    honours: ['U12 School Sports Victoria  (2021/22)'],
  },
  {
    id: 10,
    name: 'Vishwa Ramkumar',
    image: '/images/coaches/vishwa-ramkumar.png',
    honours: [
      'U17 Vic Metro Team (2022/23)',
      'U19 Vic Metro Team (2023/24, 2024/25)',
      'U19 Victoria Combined Team (2023/24)',
      'U23 Victoria 2nd XI Team (2025/26)',
      'Melbourne Stars Junior Academy (2024/25)',
      'Victoria Targeted Rookie Program (2025)',
      'Melbourne Renegades Junior Academy (2025/26)',
    ],
  },
  {
    id: 11,
    name: "Noura Abdul-Qadeer",
    image: '/images/coaches/noura-abdulqadeer.png',
    honours: [
      'U12 School Sports Victoria (2022)',
      'U15 School Sports Victoria  (2024,2025)',
      'U16 Vic Metro (2023/24, 2024/25, 2025/26)',
      'U19 Vic Metro  (2023/24)',
      'Womens Japan Premier League (WJPL) (2025/26)',
    ]
  },
]

export interface AustralianTour {
  team: string
  year: string
  detail: string
}

export interface AustralianRepresentative {
  id: number
  name: string
  image: string | null
  tours: AustralianTour[]
}

export const AUSTRALIAN_REPRESENTATIVES: AustralianRepresentative[] = [
  {
    id: 1,
    name: 'Vishwa Ramkumar',
    image: '/images/coaches/vishwa-ramkumar1.png',
    tours: [
      { team: 'Australia U19 - Tour of India', year: '2024', detail: '3 ODIs, 2 Youth Tests' },
    ],
  },
]
