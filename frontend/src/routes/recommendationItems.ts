export type RecommendationTaxi = {
  company: string
  phone: string
}

export type RecommendationItem = {
  id: number
  number: string
  title: string
  paragraphs?: string[]
  taxis?: RecommendationTaxi[]
  side: 'left' | 'right'
  xOffset: number
  yOffset: number
  textWidth: number
  rotation: number
}

export const recommendationItems: RecommendationItem[] = [
  {
    id: 1,
    number: '1',
    title: 'Where to Stay',
    paragraphs: [
      'Pelham House offers 29 guest bedrooms to retire to when the wedding draws to a close. These will be prioritised for family; however, if you are interested in booking one of these rooms, please let us know and we will try to accommodate you.',
      'Alternatively, there is a variety of hotels in Lewes and/or in Brighton, which is 10 km from the wedding venue. Here are some options for you to look at.',
    ],
    side: 'left',
    xOffset: 0,
    yOffset: 0,
    textWidth: 420,
    rotation: -2,
  },
  {
    id: 2,
    number: '2',
    title: 'Travelling from Abroad',
    paragraphs: [
      'We recommend flying into London Gatwick International Airport.',
      'From Gatwick Airport, you can either take a taxi or a direct train to Lewes, which takes approximately 29 minutes.',
    ],
    side: 'right',
    xOffset: 0,
    yOffset: 160,
    textWidth: 380,
    rotation: 2,
  },
  {
    id: 3,
    number: '3',
    title: 'Travelling from London',
    paragraphs: ['Direct train from London Victoria to Lewes: approximately 1 hour and 2 minutes.'],
    side: 'left',
    xOffset: 0,
    yOffset: 300,
    textWidth: 360,
    rotation: -1,
  },
  {
    id: 4,
    number: '4',
    title: 'Local Taxis',
    taxis: [
      { company: 'GM Taxis', phone: '01273 473737' },
      { company: 'Lewes and District Taxis', phone: '01273 483232' },
      { company: 'Lewes County Cars', phone: '01273 474444' },
      { company: 'Green Taxi', phone: '01273 472323' },
    ],
    side: 'right',
    xOffset: 0,
    yOffset: 420,
    textWidth: 360,
    rotation: 1,
  },
]
