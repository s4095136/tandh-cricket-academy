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
    image: '/images/coaches/aayan.png',
    honours: [
      'U12 SSV School Team (2019/20)',
      'U17 Vic Metro Team (2022/23, 2023/24)',
      'U19 Northern Territory Team (2025/26)',
    ],
  },
  {
    id: 2,
    name: 'Aiman Nadeem',
    image: '/images/coaches/aiman.png',
    honours: [
      'U17 Vic Metro Team (2022/23)',
      'U19 Northern Territory Team (2023/24)',
      'U19 Vic Metro Team (2024/25)',
      'U19 Victoria Combined Team (2023/24, 2024/25)',
      'U23 Victoria 2nd XI Team (2025/26)',
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
    image: '/images/coaches/ritin.png',
    honours: ['U19 Vic Metro Team (2025/26)', 'U19 Combined Victoria Team (2025/26)'],
  },
  {
    id: 5,
    name: 'Reyaan Farooq',
    image: null,
    honours: [
      'U19 Vic Metro Team (2024/25, 2025/26)',
      'U19 Combined Victoria Team (2024/25, 2025/26)',
    ],
  },
  {
    id: 6,
    name: 'Santosh Remireddy',
    image: null,
    honours: ['U12 SSV School Team (2019/20)', 'U17 Vic Metro Team (2024/25)'],
  },
  {
    id: 7,
    name: 'Abhik Nomula',
    image: null,
    honours: ['U12 SSV School Team (2024/25)', 'U15 SSV School Team (2025/26)'],
  },
  {
    id: 8,
    name: 'Sarim Tamoor',
    image: null,
    honours: ['U12 SSV School Team (2025/26)'],
  },
  {
    id: 9,
    name: 'Jujhar Singh Tamber',
    image: null,
    honours: ['U12 SSV School Team (2021/22)'],
  },
  {
    id: 10,
    name: 'Vishwa Ramkumar',
    image: null,
    honours: [
      'U17 Vic Metro Team (2022/23)',
      'U19 Vic Metro Team (2023/24, 2024/25)',
      'U19 Victoria Combined Team (2023/24)',
      'U23 Victoria 2nd XI Team (2025/26)',
    ],
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
    image: null,
    tours: [
      { team: 'Australia U19 - Tour of India', year: '2024', detail: '3 ODIs, 2 Youth Tests' },
    ],
  },
]
