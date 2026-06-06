export type QuestionItem = {
  id: number
  question: string
  answerLines: readonly string[]
}

export const questions: readonly QuestionItem[] = [
  {
    id: 1,
    question: "When’s the RSVP deadline?",
    answerLines: ['Please RSVP by 1st November so we can get a proper headcount. 🙂'],
  },
  {
    id: 2,
    question: 'Can I bring a guest?',
    answerLines: ['Please check your invite to see if you have a plus one!'],
  },
  {
    id: 3,
    question: 'Are kids welcome?',
    answerLines: [
      'As much as we adore your little ones, we won’t be including them in the ceremony or reception.',
      'Please do get in touch if you have any questions!',
    ],
  },
  {
    id: 4,
    question: 'What’s the weather going to be like?',
    answerLines: [
      'Welcome to Lewes, East Sussex!',
      'As you probably know, the weather can be a bit hit and miss.',
      'At the end of May, we’re hoping for a lovely day, around 18–22°C,',
      'but it can turn a bit chilly in the evening.',
      'Do bring a layer for later on.',
      'We wouldn’t want anyone freezing their socks off… you know how it goes.',
    ],
  },
  {
    id: 5,
    question: 'Where can I park?',
    answerLines: ['Lewes station offers plenty of parking, free of charge on weekends and bank holidays.'],
  },
  {
    id: 6,
    question: 'Who should I contact if I have questions?',
    answerLines: ['If you have any questions, please don’t hesitate to get in touch.'],
  },
]
