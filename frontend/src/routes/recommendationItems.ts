export type RecommendationItem = {
  id: number
  number: string
  text: string
  image: string
  side: 'left' | 'right'
  xOffset: number
  yOffset: number
  imageSize: number
  textWidth: number
  rotation: number
}

export const recommendationItems: RecommendationItem[] = [
  {
    id: 1,
    number: '1',
    text: 'Times New Roman',
    image: '/images/Recommendation/Item1.png',
    side: 'left',
    xOffset: 0,
    yOffset: 0,
    imageSize: 160,
    textWidth: 220,
    rotation: -2,
  },
  {
    id: 2,
    number: '2',
    text: 'Moon river',
    image: '/images/Recommendation/Item2.png',
    side: 'right',
    xOffset: 0,
    yOffset: 80,
    imageSize: 160,
    textWidth: 220,
    rotation: 2,
  },
  {
    id: 3,
    number: '3',
    text: 'Paper shoes',
    image: '/images/Recommendation/Item3.png',
    side: 'left',
    xOffset: 0,
    yOffset: 160,
    imageSize: 160,
    textWidth: 220,
    rotation: -1,
  },
  {
    id: 4,
    number: '4',
    text: 'Blue coffee',
    image: '/images/Recommendation/Item4.png',
    side: 'right',
    xOffset: 0,
    yOffset: 240,
    imageSize: 160,
    textWidth: 220,
    rotation: 1,
  },
  {
    id: 5,
    number: '5',
    text: 'Dancing under number seven',
    image: '/images/Recommendation/Item5.png',
    side: 'left',
    xOffset: 0,
    yOffset: 320,
    imageSize: 160,
    textWidth: 260,
    rotation: -2,
  },
]
